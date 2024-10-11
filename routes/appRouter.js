const Router = require("express")
const appController = require("../controllers/appController")
const appRouter = Router()
const infoRouter = require('./infoRouter')
const newRouter = require('./newRouter')
const categoryRouter = require('./categoryRouter')

appRouter.get("/", appController.inventoryIndexGet)
appRouter.get("/search", appController.inventorySearchGet)

appRouter.use("/category", categoryRouter)
appRouter.use("/new", newRouter)
appRouter.use("/emoji", infoRouter)


// todo: figure out how to delete a category for all emojis
// todo: add delete for each emoji page

// todo: add sort functionality by date added
// todo: add autocomplete suggestions when adding new categories b
//  ased on categories that already exist
module.exports = appRouter