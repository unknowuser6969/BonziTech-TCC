const { app, BrowserWindow } = require('electron'); 

let mainWindow;

app.on('ready', () =>{

    mainWindow = new BrowserWindow({
        height: 715,
        width: 1200,
        minWidth: 600,
        minHeight: 200,
        center: true,
        titleBarStyle: 'hidden',
        titleBarOverlay: {
        color: '#fff',
        symbolColor: '#131313',
        height: 40
        }
    });

    mainWindow.loadURL(`file://${__dirname}/index.html`)

});