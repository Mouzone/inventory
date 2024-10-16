const pool = require("./pool")
require('dotenv').config()

// todo: don't do nothing for erros, but instead return errors
//  or make an error handler to know the problem
module.exports.getAllEmojis = async () => {
    const { rows } = await pool.query(
        `SELECT *
        FROM emoji`
    )
    return rows
}

module.exports.getEmojiBySearch = async (emoji_name, category_id, min_date, max_date) => {
    let query = `SELECT DISTINCT emoji.emoji_id, encoding
                        FROM emoji
                        LEFT JOIN emoji_category ON emoji.emoji_id = emoji_category.emoji_id
                        LEFT JOIN category ON emoji_category.category_id = category.category_id
                        WHERE 1=1`
    const params = []

    if (emoji_name) {
        query += `AND emoji_name LIKE $${params.length + 1}`
        params.push(`%${emoji_name}%`)
    }

    if (category_id) {
        query += `AND category.category_id = $${params.length + 1}`
        params.push(category_id)
    }

    if (min_date) {
        query += `AND date_added >= $${params.length + 1}`
        params.push(min_date)
    }


    if (max_date) {
        query += `AND date_added <= $${params.length + 1}`
        params.push(max_date)
    }

    const { rows } = await pool.query(query, params)
    return rows
}

module.exports.getEmojiByEmojiID = async (emoji_id) => {
    const { rows } = await pool.query(
        `SELECT *
        FROM emoji
        WHERE emoji_id = $1`,
        [emoji_id]
    )

    return rows
}

module.exports.getCategoriesByEmojiID = async (emoji_id) => {
    const { rows } = await pool.query(
        `SELECT category.category_id, category_name
        FROM category
        JOIN emoji_category ON category.category_id = emoji_category.category_id
        JOIN emoji ON emoji_category.emoji_id = emoji.emoji_id
        WHERE emoji.emoji_id = $1`,
        [emoji_id]
    )

    return rows
}

module.exports.getEmojiByCategoryID = async (category_id, other_categories) => {
    let query = `SELECT emoji.emoji_id, encoding
                            FROM emoji
                            JOIN emoji_category ON emoji.emoji_id = emoji_category.emoji_id
                            JOIN category ON emoji_category.category_id = category.category_id
                             WHERE category.category_id = $1`
    const params = [category_id]

    other_categories.forEach(curr_category_id => {
        query += ` OR category.category_id = $${params.length + 1} `
        params.push(curr_category_id)
    })

    query += ` GROUP BY emoji.emoji_id
               HAVING COUNT(*) = $${params.length + 1} `
    params.push(params.length)

    const { rows } = await pool.query(query, params)
    return rows
}

module.exports.getAllCategories = async () => {
    const { rows } = await pool.query(
        `SELECT * 
        FROM category`
    )

    return rows
}

module.exports.getSpecificCategoryEmojis = async (category_name) => {
    const { rows } = await pool.query(
        `SELECT emoji_id, emoji_name, encoding, date_added 
        FROM category 
        JOIN emoji_category ON category.category_id = emoji_category.category_id
        JOIN emoji ON emoji_category.emoji_id = emoji.emoji_id
        WHERE category_name = $1`,
        [category_name]
    )

    return rows
}

module.exports.addEmoji = async (emoji_name, encoding) => {
    await pool.query(
        `INSERT INTO emoji (emoji_name, encoding, date_added) 
            VALUES ($1, $2, $3)`,
        [emoji_name, encoding, new Date()]
    )

    await pool.query("COMMIT")
}

module.exports.addCategoryToEmoji = async (emoji_id, category_name) => {
    await pool.query(
        `INSERT INTO category (category_name)
            VALUES ($1)
        ON CONFLICT (category_name) DO NOTHING`,
        [category_name]
    )

    const { rows } = await pool.query(
        `SELECT category_id
        FROM category 
        WHERE category_name = $1`,
        [category_name]
    )
    const category_id = rows[0].category_id

    await pool.query(
        `INSERT INTO emoji_category (emoji_id, category_id)
            VALUES ($1, $2)
        ON CONFLICT (emoji_id, category_id) DO NOTHING`,
        [emoji_id, category_id]
    )

    await pool.query("COMMIT")
}

module.exports.updateName = async (emoji_id, emoji_name) => {
    const { rows } = await pool.query(
        `SELECT * 
        FROM emoji
        WHERE emoji_name = $1`,
        [emoji_name]
    )

    if (rows.length) {
        return false
    }

    await pool.query(
        `UPDATE emoji
        SET emoji_name = $1
        WHERE emoji_id = $2`,
        [emoji_name, emoji_id]
    )

    return true
}

module.exports.deleteCategoryFromEmoji = async (emoji_id, category_id) => {
    await pool.query(
        `DELETE FROM emoji_category
        WHERE emoji_id = $1
        AND category_id = $2`,
        [emoji_id, category_id]
    )
}

module.exports.getSharedCategories = async (category_id) => {
    const { rows } = await pool.query(
        `SELECT DISTINCT category.category_id, category.category_name 
            FROM emoji_category
            JOIN category ON emoji_category.category_id = category.category_id
            WHERE emoji_id IN (
                SELECT emoji_id FROM emoji_category
                WHERE category_id = $1
            ) 
            AND category.category_id != $1`,
        [category_id]
    )

    return rows
}

module.exports.getCategoryByCategoryID = async (category_id) => {
    const { rows } = await pool.query(
        `SELECT *
        FROM category
        WHERE category_id = $1`,
        [category_id]
    )

    return rows
}
module.exports.deleteCategory = async (category_id) => {
    await pool.query(
        `DELETE FROM emoji_category
         WHERE category_id = $1`,
        [category_id]
    )

    await pool.query(
        `DELETE FROM category
         WHERE category_id = $1`,
        [category_id]
    )


}

module.exports.deleteEmoji = async (emoji_id) => {
    const { rows } = await pool.query(
                        `SELECT category_id, COUNT(*) FROM emoji_category
                        WHERE emoji_id = $1
                        GROUP BY category_id`,
                        [emoji_id]
                    )

    await pool.query(
        `DELETE FROM emoji_category
         WHERE emoji_id = $1`,
        [emoji_id]
    )

    rows.forEach(async row => {
        if (row.count === '1') {
            await pool.query(
                `DELETE FROM category
                WHERE category_id = $1`,
                [row.category_id]
            )
        }
    })

    await pool.query(
        `DELETE FROM emoji
        WHERE emoji_id = $1`,
        [emoji_id]
    )
}