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

module.exports.getEmojiByID = async (id) => {
    const { rows } = await pool.query(
        `SELECT *
        FROM emoji
        JOIN emoji_category ON emoji.emoji_id = emoji_category.emoji_id
        JOIN category ON emoji_category.category_id = category.category_id
        WHERE emoji_id = $1`,
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