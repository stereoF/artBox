import { app, shell, BrowserWindow, ipcMain, dialog } from "electron";
import { join } from "path";
import { electronApp, optimizer, is } from "@electron-toolkit/utils";
import icon from "../../resources/icon.png?asset";
import { useFileOperation } from "./fileOperation";
// import * as path from 'path';
import fs from "fs";
import { SerialPort } from "serialport";

let { getCID, readImgContent } = useFileOperation();

async function handleFileOpen() {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: ["openFile"],
    // filters: [{ name: "Images", extensions: ["jpg", "png", "gif", "jpeg"] }],
  });
  if (canceled) {
    return undefined;
  } else {
    let filePath = filePaths[0];
    let srcPath = filePath;
    if (process.platform === "win32") {
      srcPath = filePath.replace(/\\/g, "/");
    }
    // console.log(readImgContent(filePath));
    let fileType = filePath.split('.').pop();
    return {
      path: filePath,
      fileType: fileType,
      // cid: await getCID(filePath),
      srcPath: srcPath,
      content: await readImgContent(filePath),
    };
  }
}

async function handlePortList() {
  const list = await SerialPort.list();
  return list;
}

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === "linux" ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, "../preload/index.js"),
      sandbox: false,
      webSecurity: false,
    },
  });

  mainWindow.on("ready-to-show", () => {
    mainWindow.show();
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: "deny" };
  });

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"]);
  } else {
    mainWindow.loadFile(join(__dirname, "../renderer/index.html"));
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // ipcMain.handle('dialog:openImg', handleImgOpen)
  // Set app user model id for windows
  electronApp.setAppUserModelId("com.electron");

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on("browser-window-created", (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  ipcMain.handle("dialog:openFile", handleFileOpen);
  createWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
ipcMain.on("saveFile", function (event, arg) {
  // arg是从渲染进程返回来的数据
  fs.writeFile(arg.fileName, arg.data, (err) => {
    if (err) {
      console.log("写入失败");
    } else {
      console.log("写入成功");
    }
  });
});

ipcMain.handle("dialog:getCID", async function (event, arg) {
  let cid = await getCID(arg.content);
  return cid;
});

ipcMain.handle("readFile", function (event, arg) {
  let content = readImgContent(arg.fileName);
  return content;
});

ipcMain.handle("dialog:listPort", handlePortList);

let port = new SerialPort({ path: 'COM1', baudRate: 9600, autoOpen: false });

ipcMain.handle("dialog:openPort", function (event, arg) {
  port = new SerialPort({ path: arg.portPath, baudRate: 9600 }, function (
    err
  ) {
    if (err) {
      console.log("Error: ", err.message);
    }

    console.log("open success");
  });

});


ipcMain.handle("dialog:isPortOpen", function (event, arg) {
  return port.isOpen;
});


ipcMain.handle("dialog:serialPortComm", async function (event, arg) {


  // let port = new SerialPort({ path: arg.portPath, baudRate: 9600 }, function (
  //   err
  // ) {
  //   if (err) {
  //     return console.log("Error: ", err.message);
  //   }

  //   console.log("open success");
  // });

  port.write(Buffer.from(arg.paramBytes)); // 发送数据
  port.drain((err) => {
    if (err) {
      console.log("Error: ", err.message);
    }
    console.log("write success");
  });

  // let publicKeyString = "";
  let resultBytes = [];

  port.on("data", function (data) {
    // console.log("Data: " + data.toString("hex"));
    // publicKeyString = data.toString("hex");
    resultBytes = data;
    // console.log(publicKey);
  });

  while(true) {
    // if(publicKeyString != "") {
    //   break;
    // }
    if(resultBytes.length != 0) {
      break;
    }
    await sleep(1000);
  }

  return resultBytes;


  // port.close(function (err) {
  //   if (err) {
  //     return console.log("Error: ", err.message);
  //   }
  //   console.log("close success");
  // });
  
});

function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}