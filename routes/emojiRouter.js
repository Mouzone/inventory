const Router = require('express')
const emojiRouter = Router()
const emojiController = require('../controllers/emojiController')
const editController = require("../controllers/editController");

emojiRouter.get("/:emoji_id", emojiController.emojiGet)
emojiRouter.post("/:emoji_id/delete", emojiController.emojiDeletePost)

emojiRouter.post("/:emoji_id/edit/name", editController.editNamePost)
emojiRouter.post("/:emoji_id/edit/category/add", editController.editCategoryAddPost)
emojiRouter.post("/:emoji_id/edit/category/delete/:category_id", editController.editCategoryDeletePost)

module.exports = emojiRouter