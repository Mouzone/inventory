const db = require("../db/queries");
const {deleteCategory} = require("../db/queries");

module.exports.categoryGet = async (req, res) => {
    const other_categories = Array.isArray(req.query.category_id)
        ? req.query.category_id
        : req.query.category_id
            ? [req.query.category_id]
            : []

    const result = await db.getCategoryByCategoryID(req.params.category_id)
    const title = result[0].category_name
    const emojis = await db.getEmojiByCategoryID(req.params.category_id, other_categories)
    const categories = await db.getSharedCategories(req.params.category_id)

    res.render(
        "category",
        {
            title,
            category_id: req.params.category_id,
            emojis,
            categories,
            to_check: other_categories,
        })
}

module.exports.categoryDeletePost = async (req, res) => {
    await deleteCategory(req.params.category_id)
    res.redirect("/")
}