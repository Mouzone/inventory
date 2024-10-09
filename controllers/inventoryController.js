const db = require("../db/queries.js")

module.exports.inventoryIndexGet = async (req, res) => {
    const nationalities = await db.getAllNationalities()
    const leagues = await db.getAllLeagues()
    const teams = await db.getAllTeams()
    const positions = await db.getAllPositions()
    const players = await db.getAllPlayers()
    res.render("index", {title: "Player-dex", nationalities, leagues, teams, positions, players})
}

// todo: figure out how to not rerender everything and just the players section of the results
module.exports.inventorySearchGet = async (req, res) => {
    const nationalities = await db.getAllNationalities()
    const leagues = await db.getAllLeagues()
    const teams = await db.getAllTeams()
    const positions = await db.getAllPositions()
    const players = await db.search(req.params.name, req.params.nationality, req.params.team, req.params.league, req.params.position)
    res.render("index", {title: "Player-dex", nationalities, leagues, teams, positions, players})
}

module.exports.inventoryNewGet = (req, res) => {
    res.render("new", {title: "Add Player"})
}

module.exports.inventoryNewPost = async (req, res) => {

}