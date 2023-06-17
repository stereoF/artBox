import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    // contextBridge.exposeInMainWorld('sysApi', {
    //   openImg: () => {
    //     ipcRenderer.invoke('dialog:openImg')
    //   }
    // })
    contextBridge.exposeInMainWorld('electronAPI', {
      openFile: () => ipcRenderer.invoke('dialog:openFile'),
      saveFile: (fileName, data) => ipcRenderer.send('saveFile', {fileName, data}),
      readFile: (fileName) => ipcRenderer.invoke('readFile', {fileName}),
      getCID: (content) => ipcRenderer.invoke('dialog:getCID', {content}),
      listPort: () => ipcRenderer.invoke('dialog:listPort'),
      openPort: (portPath) => ipcRenderer.invoke('dialog:openPort', {portPath}),
      serialPortComm: (paramBytes) => ipcRenderer.invoke('dialog:serialPortComm', {paramBytes})
    })
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
