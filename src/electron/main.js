import { app, BrowserWindow } from "electron";
import path from "path";

function createWindow() {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        autoHideMenuBar: true,
    });

    if (!app.isPackaged) {
        win.loadURL("http://localhost:5173");
    } else {
        win.loadFile(path.join(app.getAppPath(), "dist", "index.html"));
    }

    console.log("Window created");
}

app.whenReady().then(createWindow);
