const path = require('path');
const pug = require('pug');
const fs = require('fs');
const uniqid = require('uniqid');
const { BrowserWindow } = require('electron');

exports.createWindow = (template, templateVars, settings) => {
    templateVars.dir = __dirname;
    const filePath = path.join(__dirname, 'views', `${template}-${uniqid()}.html`);
    const pugFilePath = path.join(__dirname, 'views', `${template}.pug`);

    fs.writeFileSync(filePath, pug.renderFile(pugFilePath, templateVars));

    return () => {
        let win = new BrowserWindow({
            icon: path.join(__dirname, 'icons/icon2_298x298.png'),
            width: 300,
            height: 150,
            title: 'NATOURS',
            fullscreenable: !settings.modal,
            resizable: !settings.modal,
            movable: !settings.modal,
            closable: !settings.modal,
            autoHideMenuBar: true,
            modal: settings.modal,
            parent: settings.parent,
            webPreferences: {
                nodeIntegration: true
            }
        });

        if (settings.full) win.maximize();

        win.loadFile(filePath);
        
        if (process.env.NODE_ENV === 'dev' && !settings.modal) win.webContents.openDevTools();
        
        if (process.env.NODE_ENV === 'dev' && !settings.modal) require('devtron').install();
        
        win.on('closed', () => {
            // Dereference the window object, usually you would store windows
            // in an array if your app supports multi windows, this is the time
            // when you should delete the corresponding element.
            win = null;
        });

        setTimeout(function() {
            fs.unlinkSync(filePath);
        }, 5000);
    };
};
