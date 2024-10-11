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

module.exports.inventoryCategoryGet = async (req, res) => {
    // todo: modify getEmojiByCategory to take list of req.query to add onto the equalities
    const emojis = await db.getEmojiByCategoryID(req.params.category_id)
    const categories = await db.getSharedCategories(req.params.category_id)
    // todo: to_check here o category doens't work when not more than one box is checked
    res.render(
        "category",
        {
            title: `Category`,
            category_id: req.params.category_id,
            emojis,
            categories,
            to_check: req.query.category_id,
        })
}