const db = require("../db/queries.js")

module.exports.inventoryIndexGet = async (req, res) => {

}

module.exports.inventorySearchGet = async (req, res) => {

}

module.exports.inventoryNewGet = (req, res) => {
    res.render("new", {title: "Add Player"})
}

module.exports.inventoryNewPost = async (req, res) => {
    res.redirect("/")
}