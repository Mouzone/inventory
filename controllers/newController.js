const db = require("../db/queries")

module.exports.inventoryNewGet = (req, res) => {
    res.render("addEmoji", {title: "Add Player"})
}

module.exports.inventoryNewPost = async (req, res) => {
    await db.insertEmoji(
        req.body.name,
        req.body.emoji
    )
    res.redirect("/")
}