import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'


const Header = ({isLoggedIn, setIsLoggedIn}) => {
let navigate = useNavigate()
   function handleLogout () {
       localStorage.removeItem('token')
       localStorage.removeItem('username')
       setIsLoggedIn(false)
       navigate('/')
   }

    return (
        <div>
            {isLoggedIn ? 
            <div>
            <NavLink to='/'>Shoes</NavLink>
            
            <NavLink to='/myshoes'>My Shoes</NavLink>
            <button onClick={handleLogout}>Logout</button>
            </div>
            :
            <div>
                <NavLink to='/'>Shoes</NavLink>
            <NavLink to='/login'>Login</NavLink>
            </div>

}
        </div>
    )
}

export default Header