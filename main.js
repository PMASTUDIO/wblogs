const { app, BrowserWindow, shell } = require('electron')
const path = require("path")
const { ipcMain, dialog } = require('electron')
var exec = require("child_process").exec;

let mainWindow

function createWindow () {

  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    },
    icon: path.join(__dirname, 'assets/icons/png/64x64.png')
  })

  mainWindow.loadFile('index.html')

  // mainWindow.webContents.openDevTools()

  mainWindow.on('closed', function () {

    mainWindow = null
  })
}

app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
})

ipcMain.on('create-blog-request', (event, blogTitle) => {
  blogTitle = blogTitle.replace(/[^A-Z0-9]+/ig, "_")
  blogTitle = blogTitle.toLowerCase()
  
  //Create blog
  let docsPath = app.getPath('documents')

  let command;

  command = "cd " + docsPath + "; jekyll new " + blogTitle + "; cd " + blogTitle

  if(process.platform === "win32"){
    command = "C: && cd " + docsPath + " && jekyll new " + blogTitle + " && cd " + blogTitle
  }

  exec(command, function(err, stdout) {
    if(err){
      throw err;
    }

    event.sender.send("blog-created-response", path.join(docsPath, blogTitle))
    dialog.showMessageBox(mainWindow, { title: "Blog status", message: "Blog sucessfully created!"})
  });

});


ipcMain.on("editBlogRequest", (event, blogTitle, blogPath) => {
  console.log("Blog edit request!")
});