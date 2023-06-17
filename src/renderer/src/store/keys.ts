import { defineStore } from 'pinia'

export const useKeysStore = defineStore({
    id: 'keys',
    state: () => ({
        serialNum: 0,
        publicKey: '',
        publicKeyBytes: []
    }),
    actions: {
        setSerialNum(serialNum: number) {
            this.serialNum = serialNum;
        },
        setPublicKey(publicKey: string) {
            this.publicKey = publicKey;
        },
        setPublicKeyBytes(publicKeyBytes: number[]) {
            this.publicKeyBytes = publicKeyBytes;
        }
    },
    getters: {

    }
})