
import { useEffect } from "react"
import { getAllTheShoes } from "../api"
const Home = ({shoes, setShoes}) => {

    async function fetchShoes() {
        const getShoes = await getAllTheShoes()
        setShoes(getShoes)
    }

    useEffect(()=> {
        fetchShoes()
    }, [])

    const shoeMap = shoes.map((shoe, index)=> {
        return (
            <div key={`Shoe ${index}`}>
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
export default Home