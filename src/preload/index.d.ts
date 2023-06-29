import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: unknown
    electronAPI: {
      openFile: () => Promise<any>,
      saveFile: (fileName: string, data: any) => void,
      readFile: (fileName: string) => Promise<any>,
      getCID: (content: string) => Promise<any>,
      listPort: () => Promise<any>,
      openPort: (portPath: string) => void,
      isPortOpen: () => Promise<any>,
      serialPortComm: (portPath: string, paramBytes: any) => Promise<any>
    }
  }
}



