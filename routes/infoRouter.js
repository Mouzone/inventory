const Router = require('express')
const infoRouter = Router()
const infoController = require('../controllers/emojiController')
const editController = require("../controllers/editController");

infoRouter.get("/:emoji_id", infoController.infoGet)

infoRouter.post("/:emoji_id/edit/name", editController.editNamePost)
infoRouter.post("/:emoji_id/edit/category/add", editController.editCategoryAddPost)
infoRouter.post("/:emoji_id/edit/category/delete/:category_id", editController.editCategoryDeletePost)

module.exports = infoRouter