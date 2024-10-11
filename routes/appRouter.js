const Router = require("express")
const appController = require("../controllers/appController")
const appRouter = Router()

const infoRouter = require('./infoRouter')

appRouter.get("/", appController.inventoryIndexGet)
appRouter.get("/search", appController.inventorySearchGet)

// todo create newRouter
appRouter.get("/new", appController.inventoryNewGet)
appRouter.post("/new", appController.inventoryNewPost)
appRouter.get("/category/:category_id", appController.inventoryCategoryGet)

appRouter.use("/emoji", infoRouter)



// todo: add a filter to each category_list page to show more specific intersections
// probably checkboxes on the side to tick off and apply them with a submit button

// todo: figure out how to delete a category for all emojis
// todo: add sort functionality by date added
// todo: add autocomplete suggestions when adding new categories b
//  ased on categories that already exist
module.exports = appRouter