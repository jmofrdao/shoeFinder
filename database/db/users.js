const client = require('./client')
const bcrypt = require('bcrypt')

async function createUser({username,password, email}) {
    const SALT_COUNT = 10;
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
    try {
        const {rows: [user],} = await client.query(
            `
            INSERT INTO users (username,password, email)
            values ($1, $2, $3)
            ON CONFLICT (username) DO NOTHING
            RETURNING *;
            `, [username, hashedPassword, email]
        )

        return user
    } catch (error) {
        throw error
    }
}

async function getUser({username, password}) {
    try {
        const user = await getUserByUsername(username)
        const hashedPassword = user.password
        const isValid = await bcrypt.compare(password, hashedPassword)
        if (isValid) {
            delete user.password;
            return user
        }
    } catch (error) {
        throw error
    }
}

async function getUserByUsername (username) {
    try {
    const {rows: [user]} = await client.query(`
    SELECT * 
    FROM users
    WHERE username=$1

    `, [username])
return user
    } catch (error) {
        throw error
    }
}

async function getUserById (id) {
    try {
        const {rows: [user]} = await client.query(`
        SELECT id, username
        FROM users
        WHERE id=${id}
        `)
        if (!user) {
            return null
        }
        return user
    } catch (error) {
        throw error
    }
}
module.exports = {
    createUser,
    getUser,
    getUserByUsername,
    getUserById
}