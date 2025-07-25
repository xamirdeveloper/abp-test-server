import { useSplashStore } from '@/stores/splash';

export default defineNuxtRouteMiddleware((to, from) => {
  const splashStore = useSplashStore();
  if (!splashStore.splashShown) {
    return navigateTo('/splash');
  }
});
