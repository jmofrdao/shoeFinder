const express = require('express')
const { getAllShoes } = require('../db/shoes')
const {getShoesByMessage, createMessage} = require('../db/message')
const {requireUser} = require('./utils')
const router = express.Router()

router.get('/', async (req,res,next) => {
    const shoes = await getAllShoes()
    res.send(shoes)
})

router.post('/:shoeId/:fromUser/messages', requireUser, async (req,res,next)=> {
    const {shoeId, fromUser} = req.params
    const {content} = req.body.message
    
    const shoeData = {content, shoeId, fromUser}
    try {
        const message = await createMessage(shoeData)
        if (message) {
            res.send(message)
        } else {
            next({
                name: 'errorCreating',
                message: 'Error creating message'
            })
        }
    } catch ({name, message}) {
        next({name,message})
    }
})

router.get('/:shoeId/messages', requireUser, async (req,res,next)=> {
    const {shoeId} = req.params
    const shoes = await getShoesByMessage(shoeId)
})

router.get('/messages', requireUser, async (req,res,next)=> {
    const messages = await 
})


module.exports = router