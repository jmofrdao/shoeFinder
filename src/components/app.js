import React, {useState, useEffect} from 'react'
import { Routes,Route } from 'react-router-dom'
import {Login, Header, Home, Register, Myshoes, Create} from './index'


const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [shoes, setShoes] = useState([])

    useEffect(()=> {
        const token = localStorage.getItem("token")
        if (token) {
            setIsLoggedIn(true)
        }
    }, [])

    return (
        <div>
            <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
            
                {isLoggedIn ? 
                <Routes>
                <Route 
                path='/myshoes'
                element={<Myshoes/>}/>
            <Route 
            path='/'
            element={
                <Home shoes={shoes} setShoes={setShoes} isLoggedIn={isLoggedIn}/>
            }/>
            </Routes>
            :
            <Routes>
                  <Route 
            path='/'
            element={
                <Home shoes={shoes} setShoes={setShoes} isLoggedIn={isLoggedIn}/>
            }/>
            <Route 
            path='/login'
            element={
            <Login setIsLoggedIn={setIsLoggedIn}/>}/>
            <Route 
            path='/register' 
            element={<Register/>}/>
            <Route 
            path='/create' 
            element={<Create/>}/>
            </Routes>
            }
            
        </div>
    )
}

export default App