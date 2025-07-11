// // main.js
// const { app, BrowserWindow } = require('electron')
// const path = require('path')
// const isDev = require('electron-is-dev')
// // const path = require('node:path')

// function createWindow() {
//   const win = new BrowserWindow({
//     width: 1000,
//     height: 700,
//     webPreferences: {
//       nodeIntegration: true,
//       contextIsolation: false,
//       preload: path.join(__dirname, 'home.js')
      
//     }
//   })

// // ...

    
//     win.loadFile('client/html/home.html')
// }

// app.whenReady().then(createWindow)

// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') app.quit()
// })