
let signIn = document.querySelector('.sign-up-bttn')
signIn.addEventListener('click', signUp)

document.addEventListener('DOMContentLoaded', () => {
    let signUpButton = document.querySelector('sign-up-bttn')
    signIn(addEventListener('click', signUp))
})


async function signUp(event) {
    event.preventDefault()
    let userName = document.getElementById('username')
    let userEmail = document.getElementById('email')
    let userPassword = document.getElementById('password')

    // button clicked
    // fromvalidation
    // if success move on to store the data
        // store the data in a schema 
        // send to the server side code 
        // store the data in mongoose 
    // if not success, error, send an arror meessage

    try {
        const response =  await fetch()


    }


}

