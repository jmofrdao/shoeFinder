const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = process.env
const {getUser, getUserByUsername, createUser} = require('../db/users')

router.post('/register', async(req,res,next)=> {
    const {username, password} = req.body
    if (!username || password) {
        next({
            name: 'MissingCredentialsError',
            message: 'Please supply both username and pasword'
        })
    }
    try {
        const _user = await getUserByUsername(username)
        if (_user) {
            next({
                name: 'UserTakenError', 
                message: `User ${_user.username} is already taken`
            })
        } else if (password.length < 8) {
            next({
                name: 'PasswordLengthError',
                message: 'Password must be longer than 8 characters'
            })
        } else {
            const user = await createUser({
                username, 
                password
            })
            if (user) {
                const token = jwt.sign({
                    id: user.id,
                    username
                }, JWT_SECRET)

                res.send({message: 'Thank you for signing up!', token})
            } else {
                next({
                    name: 'UserCreationError',
                    message: 'Error creating user'
                })
            }
        }
    } catch (error) {
        next(error)
    }
})


router.post('/login', async (req,res,next)=> {
const {username, password} = req.body

if (!username || !password) {
    next({
        name: 'MissingCredentialError',
        message: 'Please supply both username and password'
    })
}

try {
    const user = await getUser({username, password})
    if (user) {
        const token = jwt.sign({
            id: user.id,
            username
        }, JWT_SECRET)
        res.send({message: 'You are logged in!', token, user})
    } else {
        next({
            name: 'IncorrectCredentialsError',
            message: 'Incorrect Username or Password'
        })
    }
} catch ({name, message}) {
    next({
        name,
        message
    })
}
})


module.exports = router