const path = require('path');
const pug = require('pug');
const fs = require('fs');
const uniqid = require('uniqid');
const { BrowserWindow } = require('electron');

exports.createWindow = (template, templateVars, settings) => {
    const filePath = path.join(__dirname, 'views', `${template}-${uniqid()}.html`);
    const pugFilePath = path.join(__dirname, 'views', `${template}.pug`);

    fs.writeFileSync(filePath, pug.renderFile(pugFilePath, templateVars));

    return () => {
        const winSets = settings
            ? settings
            : {
                  icon: path.join(__dirname, 'icons/icon2_298x298.png'),
                  fullscreen: true,
                  fullscreenable: false,
                  autoHideMenuBar: true,
                  webPreferences: {
                      nodeIntegration: true
                  }
              };

        let win = new BrowserWindow(winSets);

        win.loadFile(filePath);
        fs.unlinkSync(filePath);

        if (process.env.NODE_ENV === 'dev') win.webContents.openDevTools();

        if (process.env.NODE_ENV === 'dev') require('devtron').install();

        win.on('closed', () => {
            // Dereference the window object, usually you would store windows
            // in an array if your app supports multi windows, this is the time
            // when you should delete the corresponding element.
            win = null;
        });
    };
};
