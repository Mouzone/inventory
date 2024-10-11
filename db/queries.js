const pool = require("./pool")
require('dotenv').config()

module.exports.getAllEmojis = async () => {
    const { rows } = await pool.query(
        `SELECT *
        FROM emoji`
    )
    return rows
}

module.exports.getEmojiBySearch = async (name, category, min_date, max_date) => {
    let query = `SELECT *
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

// todo: given category_id get emojis


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

module.exports.insertCategory = async (emoji_id, category) => {
//     emoji_id 100% exists so just link it emoji_Category
    await pool.query(
        `INSERT INTO category (category_name)
            VALUES ($1)
        ON CONFLICT (category_name) DO NOTHING`,
        [category]
    )

    const result = await pool.query(
        `SELECT category_id
        FROM category 
        WHERE category_name = $1`,
        [category]
    )

    const category_id = result.rows[0].category_id

    await pool.query(
        `INSERT INTO emoji_category (emoji_id, category_id)
            VALUES ($1, $2)
        ON CONFLICT (emoji_id, category_id) DO NOTHING`,
        [emoji_id, category_id]
    )
}