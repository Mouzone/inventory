const pool = require("./pool")
require('dotenv').config()

module.exports.getAllEmojis = () => {
    const { rows } = pool.query(
        `SELECT *
        FROM emoji`
    )

    return rows
}

// category will be a list
module.exports.getEmojiBySearch = (name, min_date, max_date, category) => {

}

module.exports.getEmojiByID = (id) => {
    const { rows } = pool.query(`
    `)
}

module.exports.getAllCategories = () => {
    const { rows } = pool.query(
        `SELECT * 
        FROM category`
    )

    return rows
}

module.exports.getSpecificCategoryEmojis = (categoryToSelect) => {
    const { rows } = pool.query(
        `SELECT emoji_id, emoji_name, encoding, date_added 
        FROM category 
        JOIN emoji_category ON category.category_id = emoji_category.category_id
        JOIN emoji ON emoji_category.emoji_id = emoji.emoji_id
        WHERE category_name = $1`,
        [categoryToSelect]
    )

    return rows
}