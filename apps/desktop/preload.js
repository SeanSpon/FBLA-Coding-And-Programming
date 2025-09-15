import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('api', {
  listItems: () => ipcRenderer.invoke('items:list'),
  addItem: (item) => ipcRenderer.invoke('items:add', item),
  deleteItem: (id) => ipcRenderer.invoke('items:delete', id)
})
