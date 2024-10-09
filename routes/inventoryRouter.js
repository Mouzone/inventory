const Router = require("express")
const inventoryController = require("../controllers/inventoryController")
const inventoryRouter = Router()

inventoryRouter.get("/", inventoryController.inventoryIndexGet)

module.exports = inventoryRouter