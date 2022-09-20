import React, {useState, useEffect} from 'react'
import { getShoesbyUsername, getUsersMe } from '../api'

const Myshoes = () => {
const [myShoes, setMyShoes] = useState([])

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

useEffect(()=> {
    fetchMyShoes()
}, [])

console.log(myShoes, 'myt') 
const shoeMap = myShoes.map((shoe, index )=> {
    return (
        <div key={`Sho ${index}`}>
            <h1>Name: {shoe.name}</h1>
            <h3>Brand: {shoe.brand}</h3>
            <h5>State: {shoe.state}</h5>
            <p>City: {shoe.city}</p>
            <p>Description: {shoe.description}</p>
            <p>Size: {shoe.size}</p>
        </div>
    )
})

    return (
        <div>
            {shoeMap}
        </div>
    )
}

export default Myshoes