require('electron-reload')(__dirname);
const { app, BrowserWindow, ipcMain, Menu, Tray, shell } = require('electron')
const path = require('path')

app.on('ready', main)
//Funcion principal que se ejecuta nada mas lanzar la app
function main() {
  let win = new BrowserWindow({
    backgroundColor: '#F6F8F8',
    show: true,
    frame: false,
    width: 1024,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      preload: path.join(__dirname, '/engine/preload.js')
    }
  })
  win.loadFile(__dirname + '/index.html')

  let invokeMap = new Map([
    ["invokeCloseWindow", () => win.close()],
    ["invokeMinimizeWindow", () => win.minimize()],
    ["invokeMaximizeWindow", () => win.isMaximized() ? win.unmaximize() : win.maximize()],
    ["invokeDevTools", () => win.webContents.openDevTools()],
    ["invokePruebas", () => {
      console.log('Has pulsado' + 'invokePruebas')
      console.log(shell.showItemInFolder(__dirname))
      // shell.beep()
    }],
    ["invokeLogin", (event, data) => {
      console.log('Has pulsado el boton Login: ' + data)
      //Calls to Service
      // let userService = new UserService()
      // if (userService.existsByEmailAndPassword()) {
      //   //Sends signal to components
      // }
    }],
  ]);

  invokeMap.forEach((v, k) => {
    ipcMain.on(k, v)
  });
}


////////////////////////////////////////////////

let SQLiteDatabase = require('./db/manager.js').SQLiteDatabase
try {
  let db = new SQLiteDatabase()
  db.create()
  db.init()
} catch (error) {
  console.log(error)
}


  //ESTO CREA EL ICONO AL LADO DEL CALENDARIO DE WINDOWS
  // let tray = null
  // const iconPath = path.join(__dirname, 'resources/images/electron-security_200x200.png')
  // tray = new Tray(iconPath)
  // const contextMenu = Menu.buildFromTemplate([
  //   { label: 'Item1' },
  //   { label: 'Item2', type: 'separator' },
  //   { label: 'Item3', type: 'radio', checked: true },
  //   { label: 'Item4', type: 'radio' }
  // ])
  // tray.setToolTip('This is my application.')
  // tray.setContextMenu(contextMenu)
  ////////////////////////////////////////////////////////