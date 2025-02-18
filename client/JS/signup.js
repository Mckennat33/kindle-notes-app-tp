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
                const token = data.token
                localStorage.setItem('authToken', token)
                checkTokenAndNavigate()
            } else {
                console.log("Http Error", response.status, 'This did not work')
            }
        } catch(err) {
            console.log(err)
        }
    }
    postRequest()   
}

function checkTokenAndNavigate() {
    const token = localStorage.getItem('authToken');
    console.log("Checking stored token:", token);

    if (!token) {
        console.error("No token found, login failed.");
        return;
    }

    // Instead of expecting JSON, just redirect to the home page
    window.location.href = "/home"; 
}





















// function checkTokenAndNavigate() {
//     const token = localStorage.getItem('authToken');
//     console.log("Checking stored token:", token);

//     if (!token) {
//         console.error("No token found, login failed.");
//         return;
//     }

//     fetch("http://localhost:80/home", {
//         method: "GET",
//         headers: {
//             "Authorization": `Bearer ${token}`, 
//             "Content-Type": "application/json"
//         }
//     })
//     .then(response => {
//         if (!response.ok) {
//             throw new Error("Unauthorized, token invalid.");
//         }
//         return response.json();
//     })
//     .then(data => {
//         console.log("Server Response:", data);
//         window.location.href = "/home"; // Only redirect after successful authentication
//     })
//     .catch(error => {
//         console.error("Error:", error);
//     });
// }