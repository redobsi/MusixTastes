const { ipcMain } = require('electron');

class UtilsIPC{
    constructor() {
        this.addTellListener();
    }

    // Add the tell main listener
    addTellListener() {
        ipcMain.on("tell_main", (event, args) => {
            console.log(args)
        })
    }
}

module.exports = UtilsIPC