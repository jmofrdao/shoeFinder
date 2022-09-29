
import React, {useState, useEffect} from 'react'
import { getShoesbyUsername, getUsersMe, getUserMessage } from '../api'

const Myshoes = () => {
const [myShoes, setMyShoes] = useState([])
const [myMessages, setMyMessages] = useState([])

async function fetchMyShoes () {
    const token = localStorage.getItem('token')
    const username = localStorage.getItem('username')
    console.log(token, 'token')
    const user = await getUsersMe(token)
    console.log(username, 'user')
    console.log(user, 'user2')
    if (user.username === username) {
        const theShoes = await getShoesbyUsername(username)
        console.log(theShoes)
        setMyShoes(theShoes)
    }
}

async function fetchMyMessage () {
    const token = localStorage.getItem('token')
    const user = getUsersMe(token)
    const fromUser = user.id
const theMessage = await getUserMessage(fromUser)
console.log(theMessage,'the')
setMyMessages(theMessage)
}

useEffect(()=> {
    fetchMyShoes()
    fetchMyMessage()
}, [])

const username = localStorage.getItem('username')

console.log(myMessages, 'myt') 
const shoeMap = myShoes.map((shoe, index )=> {
    return (
        <div key={`Sho ${index}`}>
            <h3>Name: {shoe.name}</h3>
            <h4>Brand: {shoe.brand}</h4>
            <h4>State: {shoe.state}</h4>
            <h4>City: {shoe.city}</h4>
            <h4>Description: {shoe.description}</h4>
            <h4>Size: {shoe.size}</h4>
        </div>
    )
})

    return (
        <div>
            <h1>{username}'s Profile</h1>
            <h2>My Shoes</h2>
            {shoeMap}
            <h2>My Messages</h2>
        </div>
    )
}

export default Myshoes