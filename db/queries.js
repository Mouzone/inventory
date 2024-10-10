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

    return rows
}

async function insert(name, birthdate, team, league, nationality, position, start_yr, end_yr) {
    await pool.query(
        `INSERT INTO player (name, birthdate) 
        VALUES ($1, $2) 
        ON CONFLICT (name, birthdate) DO NOTHING`,
        [name, birthdate]
    )

    await pool.query(
        `INSERT INTO team (team) 
        VALUES ($1) 
        ON CONFLICT (team) DO NOTHING`,
        [team]
    )

    await pool.query(
        `INSERT INTO league (league) 
        VALUES ($1) 
        ON CONFLICT (league) DO NOTHING`,
        [league]
    )

    await pool.query(
        `INSERT INTO nationality (nationality) 
        VALUES ($1) 
        ON CONFLICT (nationality) DO NOTHING`,
        [nationality]
    )

    await pool.query(
        `INSERT INTO position (position) 
        VALUES ($1) 
        ON CONFLICT (position) DO NOTHING`,
        [position]
    )

    const player_result = await pool.query(
        `SELECT player_id 
        FROM player 
        WHERE name = $1 AND birthdate = $2`,
        [name, birthdate]
    )
    const player_id = result.rows.length > 0 ? result.rows[0].player_id : null

    // todo: finish writing this
    const team_id = await pool.query(``)
    const league_id = await pool.query(``)
    const nationality_id = await pool.query(``)
    const position_id = await pool.query(``)
}

module.exports = {
    getAllLeagues,
    getAllPlayers,
    getAllTeams,
    getAllNationalities,
    getAllPositions,
    search,
    insert,
}