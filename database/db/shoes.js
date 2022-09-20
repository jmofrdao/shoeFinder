const client = require('./client')

async function createShoes ({creatorId, brand, name, city, state, description, size}) {
    try {
const {rows: [shoes]} = await client.query(`
INSERT INTO shoes ("creatorId", brand, name, city, state, description, size)
VALUES ($1, $2, $3, $4, $5, $6, $7)
RETURNING *;
`, [creatorId, brand, name, city, state, description, size])

return shoes
    } catch (error) {
        throw error
    }
}

async function getShoeById(id) {
    try {
        const {rows: [shoe]} = await client.query(`
        SELECT *
        FROM shoes
        WHERE id=${id}
        `)
        if (!shoe) {
            return null
        }
        return shoe
    } catch (error) {
        throw error
    }
}

async function getAllShoes() {
    try {
    const {rows: id} = await client.query(`
    SELECT id
    FROM shoes
    `)

    const shoe = await Promise.all(id.map((sho)=> getShoeById(sho.id)))
    return shoe

    } catch (error) {
        throw error
    }
}

async function getShoesByUsername (username) {
try {
    const {rows: shoes} = await client.query(`
    SELECT shoes.*, users.username AS "creatorName"
    FROM shoes
    JOIN users ON shoes."creatorId" = users.id
    WHERE username = $1
    `, [username])
    if (!shoes) {
        return null
    } else {
        return shoes
    }
} catch (error) {
    throw error
}
}

module.exports = {
    createShoes,
    getAllShoes,
    getShoesByUsername
}