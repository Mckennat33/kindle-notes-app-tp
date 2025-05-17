document.addEventListener('DOMContentLoaded', () => {
    const logInButton = document.querySelector('.login-bttn')
    logInButton.addEventListener('click', loginUser)
})

function loginUser(event) {
    event.preventDefault()
    const username = document.querySelector('#username').value
    const password = document.querySelector('#password').value
    const loginServer = "http://localhost:80/login"
    async function postRequest() {
        try {
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
            if (response.ok) {
                window.location.href = "/home";
            } else {
                // alert('Invalid user name or password')
                
                const invalidUser = document.createElement('p')
                invalidUser.className = 'invalid-user'
                invalidUser.innerText = 'Username or password invalid'

                const forgotPass = document.querySelector('.invalid-user')
                forgotPass.append(invalidUser)


            }
        }
        catch(err) {
            console.log(err, "Error with front end")
        }
    } 
    postRequest()
}



