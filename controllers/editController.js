const db = require("../db/queries");

module.exports.editNamePost = async (req, res) => {
    await db.updateName(req.params.emoji_id, req.body.name)
    res.redirect(`/emoji/${req.params.emoji_id}`)
}

module.exports.editCategoryAddPost = async(req, res) => {
    await db.addCategoryToEmoji(req.params.emoji_id, req.body.category)
    res.redirect(`/emoji/${req.params.emoji_id}`)
}

module.exports.editCategoryDeletePost = async(req, res) => {
    await db.deleteCategoryFromEmoji(req.params.emoji_id, req.params.category_id)
    res.redirect(`/emoji/${req.params.emoji_id}`)
}

