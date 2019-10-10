const { ipcRenderer } = require('electron');

if (!navigator.onLine) {
    ipcRenderer.send('intconchange', navigator.onLine);
}

window.addEventListener('offline', () => {
    ipcRenderer.send('intconchange', navigator.onLine);
});

window.addEventListener('online', () => {
    ipcRenderer.send('intconchange', navigator.onLine);
});