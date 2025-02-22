const chokidar = require('chokidar')

// when something is downloaded or sent to the download file
// if it is a csv file 
    // read that data
    // parse data and take the informaiton that we need
    // put that info in our database
// if not csv file 
    // ignore

const testFunction = () => {
    try {    
        const watcher = chokidar.watch('C:/Users/thoma/Downloads', 
            {
                persistent: true, 
                ignoreInitial: true
            }
        )
        watcher.on('add', (path) => {
            console.log(path, "File downloaded")
        })
        
    } catch(err) {
        console.log(err)
    }
    
}

testFunction()


module.exports = {
    testFunction
}

