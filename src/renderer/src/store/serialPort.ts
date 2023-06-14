import { defineStore } from 'pinia'

export const useSerialPortStore = defineStore({
    id: 'serialPort',
    state: () => ({
        portPath: '',
    }),
    actions: {
        setPort(portPath: string) {
            this.portPath = portPath;
        }
    },
    getters: {

    }
})