const path = require("node:path")
const express = require("express")
const {urlencoded} = require("express");
const app = express()

app.set("view", path.join(__dirname, "views"))
app.set("view_engine", "ejs")
app.use(urlencoded({ extended: true }))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Listening on Port ${PORT}`))