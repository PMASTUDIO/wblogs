const { BrowserWindow, Menu } = require('electron')
const path = require("path")

let win = new BrowserWindow({ width: 800, height: 600, show: false, webPreferences: { nodeIntegration: true }, icon: path.join(__dirname, 'assets/icons/png/64x64.png') }) 

// Ou carregar arquivo HTML local
win.loadFile('editBlog.html')

module.exports = win
