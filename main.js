const path = require('path');
const dotenv = require('dotenv');
const { app, BrowserWindow } = require('electron');

dotenv.config({path: path.join(__dirname, 'config.env')});

if (process.env.NODE_ENV === 'dev') {
    require('electron-reload')(__dirname, {
        electron: process.env.HARD_RESET ? require(`${__dirname}/node_modules/electron`) : '',
        hardResetMethod: 'exit'
    });
}

function createWindow() {
    let win = new BrowserWindow({
        width: 800,
        height: 600,
        icon: path.join(__dirname, 'icons/icon2_298x298.png'),
        movable: false,
        resizable: false,
        fullscreenable: false,
        // opacity: 0.2,
        titleBarStyle: 'hidden',
        webPreferences: {
            nodeIntegration: true
        }
    });

    win.loadFile('index.html');

    if (process.env.NODE_ENV === 'dev') win.webContents.openDevTools();

    if (process.env.NODE_ENV === 'dev') require('devtron').install();

    // var client = require('electron-connect').client;
    client.create(win);

    win.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null
    });

}

app.on('ready', createWindow);

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

