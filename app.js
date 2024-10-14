const path = require("node:path")
const appRouter = require("./routes/appRouter")
const express = require("express")
const app = express()

// todo: error handling, both pages and error components in insertion etc for each apge
app.set("view", path.join(__dirname, "views"))
app.set("view engine", "ejs")
// to render css for html, by using this express.static,
// the html link only needs the name of the css file since, it already knows what directory
app.use(express.static(path.join(__dirname,'css')))

app.use(express.urlencoded({ extended: true }))
app.use("/", appRouter)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Listening on Port ${PORT}`))