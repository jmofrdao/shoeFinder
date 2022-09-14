import React, {useState} from 'react'

const Search = ({shoes, filteredShoes, setFilteredShoes}) => {
    const [searchTerm, setSearchTerm] = useState('')

    function shoeMatches (element, text) {
        if (element.name.toLowerCase().includes(text.toLowerCase()) || element.brand.toLowerCase().includes(text.toLowerCase()) || element.state.toLowerCase().includes(text.toLowerCase()) || element.city.toLowerCase().includes(text.toLowerCase()) || element.description.toLowerCase().includes(text.toLowerCase()))
        return true
    }

    function handleSubmit(event) {
        event.preventDefault()
        const filteredShoes = shoes.filter((element) => shoeMatches(element, searchTerm))
        {
            filteredShoes.length ? 
            setFilteredShoes(filteredShoes) && setSearchTerm(event.target.value) :
            setFilteredShoes([])
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input 
            id='search'
            type='text'
            placeholder='Seach shoes...'
            value={searchTerm}
            onChange={(event)=> setSearchTerm(event.target.value)}
            />
            
            <button type='submit'>Search</button>
        </form>
    )
}

export default Search