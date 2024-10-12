const db = require("../db/queries");

module.exports.emojiGet = async (req, res) => {
    const emojiSearchResult = await db.getEmojiByEmojiID(req.params.emoji_id)
    const emoji = emojiSearchResult[0]
    const categories = await db.getCategoriesByEmojiID(req.params.emoji_id)
    res.render("emoji", {title: "Info", emoji, categories})
}

module.exports.emojiDeletePost = async (req, res) => {
    await db.deleteEmoji(req.params.emoji_id)
    res.redirect("/")
}