const Router = require('express')
const newRouter = Router()
const newController = require("../controllers/newController")

newRouter.get("/", newController.inventoryNewGet)
newRouter.post("/", newController.inventoryNewPost)

module.exports = newRouter