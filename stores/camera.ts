import { defineStore } from 'pinia';

interface CameraState {
  title: string;
  subtitle: string;
  key?: string;
}

export const useCameraStore = defineStore('camera', {
  state: (): CameraState => ({
    title: '',
    subtitle: '',
    key: '',
  }),
  actions: {
    setTitleSubtitle(title: string, subtitle: string) {
      this.title = title;
      this.subtitle = subtitle;
    },
    setKey(key: string) {
      this.key = key;
    },
    clear() {
      this.title = '';
      this.subtitle = '';
      this.key = '';
    },
  },
});
