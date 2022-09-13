const express = require('express')
const { getAllShoes } = require('../db/shoes')
const router = express.Router()

router.get('/', async (req,res,next) => {
    const shoes = await getAllShoes()
    res.send(shoes)
})


module.exports = router