const Router = require("express")
const inventoryController = require("../controllers/inventoryController")
const inventoryRouter = Router()

inventoryRouter.get("/", inventoryController.inventoryIndexGet)
inventoryRouter.get("/search", inventoryController.inventorySearchGet)
inventoryRouter.get("/new", inventoryController.inventoryNewGet)
inventoryRouter.post("/new", inventoryController.inventoryNewPost)
inventoryRouter.get("/info/:emoji_id", inventoryController.inventoryInfoGet)
inventoryRouter.post("/info/:emoji_id", inventoryController.inventoryInfoPost)
inventoryRouter.get("/category/:category_id", inventoryController.inventoryCategoryGet)
inventoryRouter.post("/edit/:emoji_id", inventoryController.inventoryEditPost)

// todo: add a filter to each category_list page to show more specific intersections
// todo: figure out how to remove categories for a specific emoji
// todo: figure out how to delete all categories for all emojis
// todo: add sort functionality by date added
module.exports = inventoryRouter