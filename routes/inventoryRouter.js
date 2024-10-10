const Router = require("express")
const inventoryController = require("../controllers/inventoryController")
const inventoryRouter = Router()

inventoryRouter.get("/", inventoryController.inventoryIndexGet)
inventoryRouter.get("/search", inventoryController.inventorySearchGet)
inventoryRouter.get("/new", inventoryController.inventoryNewGet)
inventoryRouter.post("/new", inventoryController.inventoryNewPost)
inventoryRouter.get("/info/:emoji_id", inventoryController.inventoryInfoGet)
// for updating categories
// inventoryRouter.post("/info/:emoji_id", inventoryController.inventoryInfoPost)
// inventoryRouter.get("/edit/:emoji_id", inventoryController.inventoryEditGet)
// inventoryRouter.post("/edit/:emoji_id", inventoryController.inventoryEditPost)
module.exports = inventoryRouter