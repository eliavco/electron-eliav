const path = require('path');
const dotenv = require('dotenv');
const { createWindow } = require('./renderer');
const { app, ipcMain, BrowserWindow } = require('electron');
// require('electron-middle-sass');

dotenv.config({ path: path.join(__dirname, 'config.env') });

// require('./utils/reload');

app.on('ready', createWindow('base/_base', {
    title: 'Eliav',
    photo: 'user-1.jpg',
    alt: 'Eliav'
}, {
    full: true
}));

// EVENTS
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow();
    }
});

ipcMain.on('intconchange', function(event, status) {
    const parent = BrowserWindow.fromId(event.frameId);
    if (!status) {
        createWindow('offline', {
            title: 'Offline'
        },{
            modal: true,
            parent
        })();
    } else {
        console.log(parent);
        // close when online
    }
});
