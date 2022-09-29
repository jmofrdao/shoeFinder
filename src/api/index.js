const BASE_URL = "http://localhost:3001/api"

export const LoginUser = async (username, password) => {
try {
    const response = await fetch(`${BASE_URL}/users/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            user: {
                username,
                password
            }
        })
    })
    const result = await response.json()
    console.log(result)
    return result
} catch (error) {
    console.log(error)
}
}

export const getAllTheShoes = async () => {
    try {
        const response = await fetch(`${BASE_URL}/shoes`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const result = await response.json()
        return result
    } catch (error) {
        console.log(error)
    }
}

export const registerUser = async (username, password, email, secondPass) => {
    const response = await fetch(`${BASE_URL}/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
          email: email,
          secondPass: secondPass
        }),
      });
      const result = await response.json();
    console.log(result, 'result')
      return result;
}

export async function getUsersMe(token) {
    const response = await fetch(`${BASE_URL}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    console.log(result)
    return result;
  }

export const getShoesbyUsername = async (username) => {
        const response = await fetch(`${BASE_URL}/users/${username}/shoes`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
const result = await response.json()
console.log(result, 'get shoes by user')
return result
}

export const createMessage = async (token, shoeId, fromUser, typedMessage) => {
const response = await fetch(`${BASE_URL}/shoes/${shoeId}/${fromUser}/messages`, {
    method:"POST",
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
        message:{
            content: `${typedMessage}`
        }          
    })   
})
const result = await response.json()
console.log(result, 'message')
return result
}

export const getUserMessage = async (fromUser) => {
    try {
        const response = await fetch(`${BASE_URL}/users/${fromUser}/messages`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
        const result = await response.json()
        console.log(result, 'messageUser')
        return result
    } catch (error) {
        console.log(error)
    }
}