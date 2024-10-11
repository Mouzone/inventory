const Router = require('express')
const categoryRouter = Router()

const categoryController = require("../controllers/categoryController")

categoryRouter.get("/:category_id", categoryController.categoryGet)
categoryRouter.post("/:category_id/delete", categoryController.categoryDeletePost)

module.exports = categoryRouter