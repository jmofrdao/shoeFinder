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