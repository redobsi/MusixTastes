const { ipcMain } = require('electron');

// These IPCs will be used only for info handling purpose.
ipcMain.on("tell_main", (event, args) => {
    console.log(args)
})