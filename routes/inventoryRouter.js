const Router = require("express")
const inventoryController = require("../controllers/inventoryController")
const inventoryRouter = Router()

inventoryRouter.get("/", inventoryController.inventoryIndexGet)
inventoryRouter.get("/search", inventoryController.inventorySearchGet)
inventoryRouter.get("/new", inventoryController.inventoryNewGet)
inventoryRouter.post("/new", inventoryController.inventoryNewPost)
// add route for each player like player/:id
module.exports = inventoryRouter