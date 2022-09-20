const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = process.env
const {getUser, getUserByUsername, createUser} = require('../db/users')
const {getShoesByUsername} = require('../db/shoes')
const { requireUser } = require('./utils')

router.post('/register', async(req,res,next)=> {
    const {username, password, secondPass, email} = req.body
    if (!username || !password) {
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
        } else if (password !== secondPass) {
            next({
                name:'PasswordVerificationError',
                message: 'Passwords do not match'
            })
        }
        
        else {
            const user = await createUser({
                username, 
                password,
                email
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
const {username, password} = req.body.user

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

router.get('/:username/shoes', async (req,res,next)=> {
    const {username} = req.params
    try {
        const shoes = await getShoesByUsername(username)
        if (shoes) {
            res.send(shoes)
        } else {
            next({
                name: 'noshoeserror',
                message: 'You have no shoes at this time'
            })
        }
    } catch({name, message}) {
        next({name, message})
    }
})

router.get("/me", requireUser, async (req, res, next) => {
    try {
        console.log(req.user, 'user')
      res.send(req.user);
    } catch (error) {
      next(error);
    }
  });


module.exports = router