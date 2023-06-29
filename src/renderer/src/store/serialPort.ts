import { defineStore } from 'pinia'

export const useSerialPortStore = defineStore({
    id: 'serialPort',
    state: () => ({
        selectedPort: '',
    }),
    actions: {
        setPort(selectedPort: string) {
            this.selectedPort = selectedPort;
        },
    },
    getters: {

    }
})