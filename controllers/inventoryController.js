const db = require("../db/queries.js")

module.exports.inventoryIndexGet = async (req, res) => {
    const emojis = await db.getAllEmojis()
    res.render("index", {title: "Emojis", emojis})
}

module.exports.inventorySearchGet = async (req, res) => {

}

module.exports.inventoryNewGet = (req, res) => {
    res.render("new", {title: "Add Player"})
}

module.exports.inventoryNewPost = async (req, res) => {
    res.redirect("/")
}