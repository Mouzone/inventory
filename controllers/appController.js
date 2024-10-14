const db = require("../db/queries.js")

module.exports.inventoryIndexGet = async (req, res) => {
    const categories = await db.getAllCategories()
    const emojis = await db.getAllEmojis()
    res.render("index", {title: "Emojis", emojis, categories})
}

// add validation for when dates are not properly ordered
module.exports.inventorySearchGet = async (req, res) => {
    const categories = await db.getAllCategories()
    const emojis = await db.getEmojiBySearch(
        req.query.name,
        req.query.category,
        req.query.min_date ? new Date(req.query.min_date).toISOString() : null,
        req.query.max_date ? new Date(req.query.max_date).toISOString() : null
    )
    res.render("index", {title: "Emojis", emojis, categories})
}

module.exports.inventoryNewPost = async (req, res) => {
    await db.addEmoji(
        req.body.name,
        req.body.emoji
    )
    res.redirect("/")
}