const Router = require("express")
const appController = require("../controllers/appController")
const appRouter = Router()
const emojiRouter = require('./emojiRouter')
const categoryRouter = require('./categoryRouter')

appRouter.get("/", appController.inventoryIndexGet)
appRouter.get("/search", appController.inventorySearchGet)
appRouter.post("/new", appController.inventoryNewPost)

appRouter.use("/category", categoryRouter)
appRouter.use("/emoji", emojiRouter)

module.exports = appRouter