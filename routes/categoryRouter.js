const Router = require('express')
const categoryRouter = Router()

const categoryController = require("../controllers/categoryController")

categoryRouter.get("/:category_id", categoryController.categoryGet)

module.exports = categoryRouter