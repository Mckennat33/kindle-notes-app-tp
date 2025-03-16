document.addEventListener('DOMContentLoaded', () => {
        const homeFetch = "http://localhost:80/home"
        const fetchUserData = "http://localhost:80/home/data"
        
        async function fetchHome() {
            try {
                const response = await fetch(homeFetch, {
                method: 'GET'
                // credentials: 'include',
                // headers: {
                //     "Content-Type": 'application/json'
                // }
            })

            const resp = await response.text()
            if (response.ok) {
                console.log("Home Page Loaded")
            } else {
                console.log("there was an error", response.status, 'This did not work')
            }
        } catch(err) {
            console.log("Fetch Error", err.message)
        }
    }
        fetchHome()

        async function fetchData() {
            try {   
                const response = await fetch(fetchUserData, {
                    method: 'GET', 
                    credentials: 'include', 
                    headers: {
                        "Content-Type": "application/json"
                    }

                })
                const jsonData = await response.json()
                if (response.ok) {
                    console.log(jsonData, "Retreived data from mongodb")
                } else {
                    console.log("Error from fetching User Data", response.status)
                }
            } catch(err) {
                console.log("there was an error", err.message)
            }
        }
        fetchData()
})

 
