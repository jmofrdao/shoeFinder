import React from 'react'
import { NavLink } from 'react-router-dom'


const Header = () => {

    return (
        <div>
            <NavLink to='/'>Shoes</NavLink>
            <NavLink to='/login'>Login</NavLink>

        </div>
    )
}

export default Header