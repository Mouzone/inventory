const path = require("node:path")
const inventoryRouter = require("./routes/inventoryRouter")
const express = require("express")
const app = express()

// todo: error handling
app.set("view", path.join(__dirname, "views"))
app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: true }))
app.use("/", inventoryRouter)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Listening on Port ${PORT}`))