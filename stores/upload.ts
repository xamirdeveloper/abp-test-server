import { defineStore } from 'pinia';

interface UploadState {
  frontCard?: string;
  backCard?: string;
  birthCertificate?: string;
  cardReceipt?: string;
  userSignature?: string;
  [key: string]: string | undefined;
}

export const useUploadStore = defineStore('upload', {
  state: (): UploadState => ({
    frontCard: undefined,
    backCard: undefined,
    birthCertificate: undefined,
    cardReceipt: undefined,
    userSignature: undefined,
  }),
  actions: {
    setFile(key: string, file: string) {
      this[key] = file;
    },
    clearFile(key: string) {
      this[key] = undefined;
    },
    clearAll() {
      Object.keys(this.$state).forEach((key) => {
        this[key] = undefined;
      });
    },
  },
});
