


document.addEventListener('DOMContentLoaded', () => {
    let signUpButton = document.querySelector('.sign-up-bttn')
    signUpButton.addEventListener('click', signUp)
})

function signUp(event) {
    event.preventDefault()
    let userName = document.getElementById('username').value
    let userEmail = document.getElementById('email').value
    let userPassword = document.getElementById('password').value
    console.log(userName, userEmail, userPassword)
    

    // i have the value for username, email and password. 
    // need to storm them in a schema

    const userAPI = "http://localhost:3000/signup"
    async function postRequest() {
        try {
            const response = await fetch(userAPI, {
                method: "POST",
                headers: {
                    "Content-Type": 'application/json'
                }, 
                body: JSON.stringify({
                    username: userName, 
                    email: userEmail, 
                    password: userPassword
                })
            })
            const data = await response.json()
            if (response.ok) {
                console.log(response.status)
            } else {
                console.log("Httpe Error", response.status)
            }
        } catch(err) {
            console.log(err)
        }
    }

    postRequest()

}