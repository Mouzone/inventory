const db = require("../db/queries.js")

module.exports.inventoryIndexGet = async (req, res) => {
    const nationalities = await db.getAllNationalities()
    const leagues = await db.getAllLeagues()
    const teams = await db.getAllTeams()
    const positions = await db.getAllPositions()
    const players = await db.getAllPlayers()
    res.render("index",
        {
            title: "Player-dex",
            nationalities: nationalities.map((row) => row.nationality),
            leagues: leagues.map(row => row.league),
            teams: teams.map(row => row.team),
            positions: positions.map(row => row.position),
            players: players.map(row=> row.name),
        })
}

module.exports.inventorySearchGet = async (req, res) => {
    const nationalities = await db.getAllNationalities()
    const leagues = await db.getAllLeagues()
    const teams = await db.getAllTeams()
    const positions = await db.getAllPositions()
    const players = await db.search(req.params.name, req.params.nationality, req.params.team, req.params.league, req.params.position)
    res.render("index",
        {
            title: "Player-dex",
            nationalities: nationalities.map((row) => row.nationality),
            leagues: leagues.map(row => row.league),
            teams: teams.map(row => row.team),
            positions: positions.map(row => row.position),
            players: players.map(row=> row.name),
        })
}

module.exports.inventoryNewGet = (req, res) => {
    res.render("new", {title: "Add Player"})
}

module.exports.inventoryNewPost = async (req, res) => {
    await db.insert(req.body.nationality, req.body.birthdate, req.body.team, req.body.league, req.body.nationality,
        req.body.position, req.body.start_yr, req.body.end_yr)
    res.redirect("/")
}