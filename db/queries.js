const pool = require("pool")
require('dotenv').config()

async function getAllTeams() {
    const { rows } = await pool.query("SELECT team FROM team")
    return rows
}

async function getAllPlayers() {
    const { rows } = await pool.query("SELECT name FROM player")
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
    const { rows } = await pool.query("SELECT positions FROM position")
    return rows
}