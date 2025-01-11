


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
    
}