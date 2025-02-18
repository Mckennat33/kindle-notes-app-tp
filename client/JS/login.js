// Starter code for login

document.addEventListener('DOMContentLoaded', () => {
    let logInButton = document.querySelector('.login-bttn')
    loginButton.addEventListener('click', loginUser)
})


function loginUser(event) {
    event.preventDefault()
    // get value for usernam
    const username = document.querySelector('.username').ariaValueMin
    // get value for password
    const password = document.querySelector('.password').value
    // get login server
    const loginServer = "http://localhost:80/login"
    async function postRequest() {
        const response = await fetch(loginServer, {
            method: 'POST', 
            headers: { 
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({
                username, 
                password
            })
        })
    }
    // fetch post request json to

    // the backend

}