import { defineStore } from 'pinia'

export const useKeysStore = defineStore({
    id: 'keys',
    state: () => ({
        serialNum: 0,
        publicKey: '',
    }),
    actions: {
        setSerialNum(serialNum: number) {
            this.serialNum = serialNum;
        },
        setPublicKey(publicKey: string) {
            this.publicKey = publicKey;
        }
    },
    getters: {

    }
})