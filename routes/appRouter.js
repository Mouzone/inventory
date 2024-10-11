const Router = require("express")
const appController = require("../controllers/appController")
const appRouter = Router()

const infoRouter = require('./infoRouter')
const newRouter = require('./newRouter')

appRouter.get("/", appController.inventoryIndexGet)
appRouter.get("/search", appController.inventorySearchGet)
appRouter.get("/category/:category_id", appController.inventoryCategoryGet)

appRouter.use("/new", newRouter)
appRouter.use("/emoji", infoRouter)


// todo: figure out how to delete a category for all emojis
// todo: add sort functionality by date added
// todo: add autocomplete suggestions when adding new categories b
//  ased on categories that already exist
module.exports = appRouter