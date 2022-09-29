const client = require('./client')

async function createMessage({content, shoeId, fromUser }) {
    try {
        const {rows: message} = await client.query(`
        INSERT INTO message (content, "shoeId", "fromUser")
        VALUES ($1, $2, $3)
        RETURNING *;
        `, [content, shoeId, fromUser])

        return message
    } catch (error) {
        throw error
    }
}

async function getUserByFromUser(fromUser) {
    try {
        const {rows: [user]} = await client.query(`
        SELECT user.*, message.* 
        FROM message
        JOIN user ON message."fromUser" = user.id
        WHERE id=${fromUser}
        `)
console.log(user, 'the user')
        return user
    } catch (error) {
        console.error(error)
    }
}

async function getShoesByMessage (shoeId) {
    try {
        const {rows: [shoes]} = await client.query(`
        SELECT shoes.*, message.*
        FROM message
        JOIN shoes ON message."shoeId" = shoes.id
        WHERE id=${shoeId}
        `)

        return shoes
    } catch (error) {
        console.error(error)
    }
}

// async function getAllMessages() {
//     try {
//     const {rows: id} = await client.query(`
//     SELECT id
//     FROM shoes
//     `)

//     const shoe = await Promise.all(id.map((sho)=> getShoeById(sho.id)))
//     return shoe

//     } catch (error) {
//         throw error
//     }
// }

module.exports = {
    createMessage,
    getUserByFromUser,
    getShoesByMessage
}