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
    console.log(emojis)
    res.render("index", {title: "Emojis", emojis, categories})
}

module.exports.inventoryNewGet = (req, res) => {
    res.render("new", {title: "Add Player"})
}

module.exports.inventoryNewPost = async (req, res) => {
    await db.insertEmoji(
        req.body.name,
        req.body.emoji
    )
    res.redirect("/")
}

module.exports.inventoryInfoGet = async (req, res) => {
    const emojiSearchResult = await db.getEmojiByEmojiID(req.params.emoji_id)
    const emoji = emojiSearchResult[0]
    const categories = await db.getCategoriesByEmojiID(req.params.emoji_id)
    res.render("info", {title: "Info", emoji, categories})

}

module.exports.inventoryInfoPost = async(req, res) => {
    await db.insertCategory(req.params.emoji_id, req.body.category)
    res.redirect(`/info/${req.params.emoji_id}`)
}