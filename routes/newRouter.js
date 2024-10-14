const Router = require('express')
const newRouter = Router()
const newController = require("../controllers/newController")

// todo: refactor this back into appRouter
newRouter.post("/", newController.newPost)

module.exports = newRouter