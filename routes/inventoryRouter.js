const Router = require("express")
const inventoryController = require("../controllers/inventoryController")
const inventoryRouter = Router()

inventoryRouter.get("/", inventoryController.inventoryIndexGet)
inventoryRouter.get("/new", inventoryController.inventoryNewGet)
inventoryRouter.post("/new", inventoryController.inventoryNewPost)
inventoryRouter.get("/search", inventoryController.inventorySearchGet)

module.exports = inventoryRouter