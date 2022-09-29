
import React, {useState} from 'react'
import { createMessage, getUsersMe } from '../api'


const Message = ({shoeId}) => {
const [typedMessage, setTypedMessage] = useState('')

const handleSubmit = async (event) => {
    event.preventDefault()
    const token = localStorage.getItem("token")
    const getUser = await getUsersMe(token)
    const fromUser = getUser.id
    const myMessage = await createMessage(token, shoeId, fromUser, typedMessage)
    setTypedMessage('')
    if (myMessage) {
       return alert ("Message delivered!")
       
    }
}
    return (
        <aside>
        <form onSubmit={handleSubmit}>
        <input id="messageUserBox" onChange={(event)=>{setTypedMessage(event.target.value)}}type='text' value = {typedMessage} required/>
        <button id="messageButton" type='submit'>SEND MESSAGE</button>
        </form>
    </aside>
    )
}

export default Message