const db = require("../db/queries");

module.exports.categoryGet = async (req, res) => {
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