const { app, BrowserWindow } = require('electron'); 

let mainWindow;

app.on('ready', () =>{

    mainWindow = new BrowserWindow({
        /* autoHideMenuBar: true, */
        width: 1200,
        height: 800,
    });

    mainWindow.loadURL(`file://${__dirname}/index.html`)

});