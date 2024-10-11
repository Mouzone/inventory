const db = require("../db/queries");

module.exports.infoGet = async (req, res) => {
    const emojiSearchResult = await db.getEmojiByEmojiID(req.params.emoji_id)
    const emoji = emojiSearchResult[0]
    const categories = await db.getCategoriesByEmojiID(req.params.emoji_id)
    res.render("emoji", {title: "Info", emoji, categories})
}