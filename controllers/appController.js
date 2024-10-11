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

module.exports.inventoryCategoryGet = async (req, res) => {
    const other_categories = Array.isArray(req.query.category_id)
                                        ? req.query.category_id
                                        : req.query.category_id
                                            ? [req.query.category_id]
                                            : []

    const emojis = await db.getEmojiByCategoryID(req.params.category_id, other_categories)
    const categories = await db.getSharedCategories(req.params.category_id)

    res.render(
        "category",
        {
            title: `Category`,
            category_id: req.params.category_id,
            emojis,
            categories,
            to_check: other_categories,
        })
}