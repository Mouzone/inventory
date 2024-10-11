const Router = require('express')
const infoRouter = Router()
const infoController = require('../controllers/emoji_controller')
const editController = require("../controllers/editController");

infoRouter.get("/:emoji_id", infoController.infoGet)

infoRouter.post("/:emoji_id/edit/name", editController.editNamePost)
infoRouter.post("/:emoji_id/edit/category/add", editController.editCategoryAddPost)
// infoRouter.post("/info/:emoji_id/edit/category/delete", editController.editCategoryDeletePost)

module.exports = infoRouter