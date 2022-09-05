const client = require('./client')
const bcrypt = require('bcrypt')

async function createUser({username,password}) {
    const SALT_COUNT = 10;
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
    try {
        const {rows: [user],} = await client.query(
            `
            INSERT INTO users (username,password)
            values ($1, $2)
            ON CONFLICT (username) DO NOTHING
            RETURNING *;
            `, [username, hashedPassword]
        )

        return user
    } catch (error) {
        throw error
    }
}

module.exports = {
    createUser
}