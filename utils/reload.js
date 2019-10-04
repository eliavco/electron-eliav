if (process.env.NODE_ENV === 'dev') {
    require('electron-reload')(__dirname, {
        electron: process.env.HARD_RESET
            ? require(`${__dirname}/node_modules/electron`)
            : '',
        hardResetMethod: 'exit'
    });
}