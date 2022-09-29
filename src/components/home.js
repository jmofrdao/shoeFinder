
import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import { getAllTheShoes } from "../api"
import {Search, Message} from './index'
const Home = ({shoes, setShoes, isLoggedIn}) => {
    const [filteredShoes, setFilteredShoes] = useState([])

    async function fetchShoes() {
        const getShoes = await getAllTheShoes()
        setShoes(getShoes)
    }

    useEffect(()=> {
        fetchShoes()
    }, [])

    let shoeMap = []
    console.log(filteredShoes, 'filt')

    if (filteredShoes.length) {
        shoeMap = filteredShoes.map((shoe, index)=> {
            return (
                <div key={`Shoe ${index}`}>
                    <h1>Name: {shoe.name}</h1>
                    <h3>Brand: {shoe.brand}</h3>
                    <h5>State: {shoe.state}</h5>
                    <p>City: {shoe.city}</p>
                    <p>Description: {shoe.description}</p>
                    <p>Size: {shoe.size}</p>
                    { isLoggedIn ?
                    <Message shoeId={shoe.id}/>
                    : <NavLink to='/create'>Click to Message</NavLink>
        }
                </div>
            )
        })

    } else {
console.log(shoes, 'ha')
    shoeMap = shoes.map((shoe, index)=> {
        return (
            <div key={`Sho ${index}`}>
                <h1>Name: {shoe.name}</h1>
                <h3>Brand: {shoe.brand}</h3>
                <h5>State: {shoe.state}</h5>
                <p>City: {shoe.city}</p>
                <p>Description: {shoe.description}</p>
                <p>Size: {shoe.size}</p>
                
                {isLoggedIn ?
                <Message shoeId={shoe.id}/>
                : <NavLink to='/create'>Click to Message</NavLink>

    }
            </div>
        )
    })
}
console.log(shoes, 'shoes')
    return (
        <div>
            <Search shoes={shoes} filteredShoes={filteredShoes} setFilteredShoes={setFilteredShoes}/>
            {shoeMap}
        </div>

    )
}
export default Home