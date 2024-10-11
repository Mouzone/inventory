const db = require("../db/queries");

module.exports.editNamePost = async (req, res) => {
    await db.updateName(req.params.emoji_id, req.body.name)
    res.redirect(`/info/${req.params.emoji_id}`)
}

module.exports.editCategoryAddPost = async(req, res) => {
    await db.insertCategory(req.params.emoji_id, req.body.category)
    res.redirect(`/info/${req.params.emoji_id}`)
}

