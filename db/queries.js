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

module.exports.getEmojiBySearch = async (name, category, min_date, max_date) => {
    let query = `SELECT emoji.emoji_id, encoding
                        FROM emoji
                        LEFT JOIN emoji_category ON emoji.emoji_id = emoji_category.emoji_id
                        LEFT JOIN category ON emoji_category.category_id = category.category_id
                        WHERE 1=1`

    const params = []

    if (name) {
        query += `AND emoji_name LIKE $${params.length + 1}`
        params.push(`%${name}%`)
    }

    if (category) {
        query += `AND category_name = $${params.length + 1}`
        params.push(category)
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

module.exports.getEmojiByEmojiID = async (id) => {
    const { rows } = await pool.query(
        `SELECT *
        FROM emoji
        WHERE emoji_id = $1`,
        [id]
    )

    return rows
}

module.exports.getCategoriesByEmojiID = async (id) => {
    const { rows } = await pool.query(
        `SELECT category.category_id, category_name
        FROM emoji
        LEFT JOIN emoji_category ON emoji.emoji_id = emoji_category.emoji_id
        LEFT JOIN category ON emoji_category.category_id = category.category_id
        WHERE emoji.emoji_id = $1`,
        [id]
    )

    return rows
}

module.exports.getEmojiByCategoryID = async (id) => {
    const { rows } = await pool.query(
        `SELECT emoji.emoji_id, encoding
        FROM emoji
        JOIN emoji_category ON emoji.emoji_id = emoji_category.emoji_id
        JOIN category ON emoji_category.category_id = category.category_id
        WHERE category.category_id = $1`,
        [id]
    )
    return rows
}

module.exports.getAllCategories = async () => {
    const { rows } = await pool.query(
        `SELECT * 
        FROM category`
    )

    return rows
}

module.exports.getSpecificCategoryEmojis = async (categoryToSelect) => {
    const { rows } = await pool.query(
        `SELECT emoji_id, emoji_name, encoding, date_added 
        FROM category 
        JOIN emoji_category ON category.category_id = emoji_category.category_id
        JOIN emoji ON emoji_category.emoji_id = emoji.emoji_id
        WHERE category_name = $1`,
        [categoryToSelect]
    )

    return rows
}

module.exports.insertEmoji = async (name, emoji) => {
    await pool.query(
        `INSERT INTO emoji (emoji_name, encoding, date_added) 
            VALUES ($1, $2, $3)`,
        [name, emoji, new Date()]
    )
}

module.exports.addCategoryToEmoji = async (emoji_id, category) => {
    await pool.query(
        `INSERT INTO category (category_name)
            VALUES ($1)
        ON CONFLICT (category_name) DO NOTHING`,
        [category]
    )

    const { rows } = await pool.query(
        `SELECT category_id
        FROM category 
        WHERE category_name = $1`,
        [category]
    )

    const category_id = rows[0].category_id

    await pool.query(
        `INSERT INTO emoji_category (emoji_id, category_id)
            VALUES ($1, $2)
        ON CONFLICT (emoji_id, category_id) DO NOTHING`,
        [emoji_id, category_id]
    )
}

module.exports.updateName = async (emoji_id, name) => {
    const { rows } = await pool.query(
        `SELECT * 
        FROM emoji
        WHERE emoji_name = $1`,
        [name]
    )

    if (rows.length) {
        return false
    }

    await pool.query(
        `UPDATE emoji
        SET emoji_name = $1
        WHERE emoji_id = $2`,
        [name, emoji_id]
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