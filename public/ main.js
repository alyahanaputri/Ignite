const mysql = require("mysql");
const { app, BrowserWindow } = require("electron");
const ejse = require("ejs-electron");
const path = require("node:path");
var Name = "Ignite";

function createWindow() {
  app.setName(Name); // So you can do app.setName(Name + );
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true, // electron-packager . --platform=<platform> --arch=<architecture> --out=<output_directory>
    },
  });

  win.loadURL(`file://${__dirname}/../views/index.html`);
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
