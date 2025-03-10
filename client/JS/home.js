document.addEventListener('DOMContentLoaded', () => {
    window.addEventListener('load', () => {
        // what am i fetching? 
            // 
        // Make a fetch request for users information 
        const homeFetchData = "http://localhost:80/home"
        async function fetchUserData() {
            const promis = await fetch(homeFetchData, {
                method: GET, 
                headers: {
                    // token is stored in the authentication header"
                        // how do i get this token from the backend
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({ })
            })
        }
        
            // token authorization in the header of the fetch request. 
        // sent token to backend to verify that we have access to this information

        console.log("Home page Loaded")
    })
})

 
