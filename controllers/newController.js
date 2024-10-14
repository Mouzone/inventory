const db = require("../db/queries")

module.exports.newPost = async (req, res) => {
    await db.addEmoji(
        req.body.name,
        req.body.emoji
    )
    res.redirect("/")
}