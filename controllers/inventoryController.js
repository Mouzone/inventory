const db = require("../db/queries.js")

module.exports.inventoryIndexGet = async (req, res) => {
    const nationalities = await db.getAllNationalities()
    const leagues = await db.getAllLeagues()
    const teams = await db.getAllTeams()
    const positions = await db.getAllPositions()
    const players = await db.getAllPlayers()
    console.log(nationalities)
    res.render("index", {title: "Player-dex", nationalities, leagues, teams, positions, players})
}