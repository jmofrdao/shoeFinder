import { useState } from "react"
import {registerUser} from '../api/index'


const Register = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [secondPass, setSecondPass] = useState('')
    const [error, setError] = useState(null)
    const [myResult, setMyresult] = useState(null)

    async function handleSubmit (event) {
        event.preventDefault()
        const result = await registerUser(username,password,email, secondPass)
        const token = result.token
        if(result.error) {
            setError(result)
            setMyresult(null)
        } else if (token) {
            setError(null)
            setMyresult(result)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
            <h1>Register Account!</h1>
            <label>Username
                <input type='text' name='username' value={username} onChange={(event) => {setUsername(event.target.value)}} required/>
            </label>
            <label>
                Email 
                <input type='text' name='email' value={email} onChange={(event) => {setEmail(event.target.value)}} required/>
            </label>
            <label>
                Password
                <input type='password' value={password} name='password' onChange={(event) => {setPassword(event.target.value)}} required/>
            </label>
            <label>
               Retype Password 
               <input value={secondPass} type='password' name='secondpass' onChange={(event) => {setSecondPass(event.target.value)}} required/>
            </label>
            <button type='submit'>Register!</button>
            {error && error.message ? <h3>{error.message}</h3> : null}
        {myResult && myResult.message ? <h3>{myResult.message}</h3> : null}
            </form>
        </div>
        
    )
}

export default Register