
// when something is downloaded or sent to the download file
// if it is a csv file 
    // filtering out files that are not csv 
// read that data
// parse data and take the informaiton that we need
// put that info in our database
// if not csv file 
// ignore

// link to possible ignore certain files bug. 
// https://stackoverflow.com/questions/40468608/use-chokidar-to-watch-for-specific-file-extension

const chokidar = require('chokidar')

const catchDownloadedNote = () => {
    try {    
        const watcher = chokidar.watch('C:/Users/thoma/Downloads', 
            {
                persistent: true, 
                ignoreInitial: true
            }
        )
        watcher.on('add', (path) => {
            if (path.endsWith(".tmp") && path.endsWith(".crdownload")) {
                return; 
            }
            const newFile = path.split('.').pop()
            if (newFile === 'csv') {
                console.log("This is a csv")
            }  else {
                return 
            }
        
        })
        
    } catch(err) {
        console.log(err)
    }
    
}

catchDownloadedNote()


module.exports = {
    catchDownloadedNote
}

