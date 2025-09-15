import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'node:path'
import url from 'node:url'
import { initDb, listItems, addItem, deleteItem } from './db.js'

let win

const createWindow = async () => {
  await initDb()

  win = new BrowserWindow({
    width: 1100,
    height: 800,
    webPreferences: {
      preload: path.join(process.cwd(), 'apps', 'desktop', 'preload.js')
    }
  })

  if (process.env.VITE_DEV) {
    // dev: load Vite server
    await win.loadURL('http://localhost:5173')
    win.webContents.openDevTools()
  } else {
    // prod: load built files
    const indexPath = url.pathToFileURL(
      path.join(process.cwd(), 'apps', 'web', 'dist', 'index.html')
    ).toString()
    await win.loadURL(indexPath)
  }
}

app.whenReady().then(createWindow)
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit() })
app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow() })

// IPC handlers
ipcMain.handle('items:list', async () => listItems())
ipcMain.handle('items:add', async (_evt, payload) => addItem(payload))
ipcMain.handle('items:delete', async (_evt, id) => deleteItem(id))
