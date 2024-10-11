const Router = require("express")
const inventoryController = require("../controllers/inventoryController")
const inventoryRouter = Router()

inventoryRouter.get("/", inventoryController.inventoryIndexGet)
inventoryRouter.get("/search", inventoryController.inventorySearchGet)
inventoryRouter.get("/new", inventoryController.inventoryNewGet)
inventoryRouter.post("/new", inventoryController.inventoryNewPost)
inventoryRouter.get("/category/:category_id", inventoryController.inventoryCategoryGet)

// todo: make another router for info
inventoryRouter.get("/info/:emoji_id", inventoryController.inventoryInfoGet)
inventoryRouter.post("/info/:emoji_id", inventoryController.inventoryInfoPost)
inventoryRouter.post("/info/:emoji_id/edit/name", inventoryController.inventoryEditPost)
inventoryRouter.post("/info/:emoji_id/edit/category/", inventoryController.inventoryEditPost)



// todo: figure out how to remove categories for a specific emoji
// todo: add a filter to each category_list page to show more specific intersections
// probably checkboxes on the side to tick off and apply them with a submit button
// todo: figure out how to delete all categories for all emojis
// todo: add sort functionality by date added
// todo: add autocomplete suggestions when adding new categories b
//  ased on categories that already exist
module.exports = inventoryRouter