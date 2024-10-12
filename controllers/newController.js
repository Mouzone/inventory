const db = require("../db/queries")

module.exports.newGet = (req, res) => {
    res.render("addEmoji", {title: "Add Player"})
}

module.exports.newPost = async (req, res) => {
    await db.addEmoji(
        req.body.name,
        req.body.emoji
    )
    res.redirect("/")
}