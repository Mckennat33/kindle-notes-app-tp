


document.addEventListener('DOMContentLoaded', () => {
    let signUpButton = document.querySelector('.sign-up-bttn')
    signUpButton.addEventListener('click', signUp)
})

function signUp(event) {
    event.preventDefault()
    let userName = document.getElementById('username').value
    let userEmail = document.getElementById('email').value
    let userPassword = document.getElementById('password').value
    const signupServer = "http://localhost:80/signup"
    async function postRequest() {
        try {
            const response = await fetch(signupServer, {
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
                console.log("Http Error", response.status)
            }
        } catch(err) {
            console.log(err)
        }
    }
    postRequest()
}