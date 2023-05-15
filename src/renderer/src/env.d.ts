/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

// electron-env.d.ts
export interface IElectronAPI {
  // getFilePath 方法时preload.ts中使用的方法，后面添加方法，此处也要同步申明
  getFilePath: () => Promise<void>;
}

declare global {
  interface window {
    electronAPI: IElectronAPI;
  }
}

