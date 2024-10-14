const Router = require("express")
const appController = require("../controllers/appController")
const appRouter = Router()
const emojiRouter = require('./emojiRouter')
const newRouter = require('./newRouter')
const categoryRouter = require('./categoryRouter')

appRouter.get("/", appController.inventoryIndexGet)
appRouter.get("/search", appController.inventorySearchGet)

appRouter.use("/category", categoryRouter)
appRouter.use("/new", newRouter)
appRouter.use("/emoji", emojiRouter)

module.exports = appRouter