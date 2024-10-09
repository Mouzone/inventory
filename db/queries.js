const pool = require("./pool")
require('dotenv').config()

async function getAllTeams() {
    const { rows } = await pool.query("SELECT team FROM team")
    return rows
}

async function getAllLeagues() {
    const { rows } = await pool.query("SELECT league FROM league")
    return rows
}

async function getAllNationalities() {
    const { rows } = await pool.query("SELECT nationality FROM nationality")
    return rows
}

async function getAllPositions() {
    const { rows } = await pool.query("SELECT position FROM position")
    return rows
}

async function getAllPlayers() {
    const { rows } = await pool.query("SELECT name FROM player")
    return rows
}

async function search(name, team, league, nationality, position) {
    const { rows } = await pool.query(
        `SELECT name 
       FROM position 
       JOIN player_position ON position.position_id = player_position.position_id
       JOIN player ON player_position.player_id = player.player_id
       JOIN nationality_player ON player.player_id = nationality_player.player_id
       JOIN nationality ON nationality_player.nationality_id = nationality.nationality_id
       JOIN league_nationality ON nationality.nationality_id = league_nationality.nationality_id
       JOIN league ON league_nationality.league_id = league.league_id
       JOIN league_team ON league.league_id = league_team.league_id
       JOIN team ON league_team.team_id = team.team_id
       JOIN player_team ON team.team_id = player_team.team_id
       WHERE name LIKE $1 
       AND team LIKE $2 
       AND league LIKE $3 
       AND nationality LIKE $4 
       AND position LIKE $5`,
        [`%${name}%`, `%${team}%`, `%${league}%`, `%${nationality}%`, `%${position}%`]
    );

    console.log(rows)
    return rows
}

module.exports = {
    getAllLeagues,
    getAllPlayers,
    getAllTeams,
    getAllNationalities,
    getAllPositions,
    search,
}