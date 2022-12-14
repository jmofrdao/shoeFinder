import React, {useState} from 'react'
import { LoginUser } from '../api'
import { NavLink, useNavigate } from 'react-router-dom'
const Login = ({setIsLoggedIn}) => {
    let navigate = useNavigate()
const [username, setUsername] = useState('')
const [password, setPassword] = useState('')
const [error, setError] = useState(null)
const handleSubmit = async (event) => {
    
event.preventDefault()
const result = await LoginUser(username, password)
const token = result.token
if (result.error) {
    setError(result)
    setIsLoggedIn(false)
} else if (token){
    setError(null)
    const username = result.user.username
    localStorage.setItem("username", username)
    localStorage.setItem("token", token)
    setIsLoggedIn(true)
    navigate('../myshoes')
}

}
console.log(password, 'pass')
    return (
<div>
    <form onSubmit={handleSubmit}>
        <h1>Log In!</h1>
        <label>
            Username: 
            <input value={username} type='text' name='username' onChange={(event)=> {setUsername(event.target.value)}}/>
        </label>
        <label>
            Password: 
            <input type='password' value={password} name='password' onChange={(event)=> {setPassword(event.target.value)}}/>
        </label>
        <button type='submit'>Log In</button>
    </form>
    <NavLink to='/register'>Click here to Register</NavLink>
</div>
    )
}

export default Login