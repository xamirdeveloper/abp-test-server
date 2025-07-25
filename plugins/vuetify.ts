import '@mdi/font/css/materialdesignicons.css';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import { createVuetify, type ThemeDefinition } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import 'vuetify/styles';
import { fa } from 'vuetify/locale';

const ApLightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    background: '#f8fafb',
    surface: '#ffffff',
    primary: '#2d31fa',
    'primary-darken-1': '#6b39f4',

    secondary: '#666d80',
    'secondary-darken-1': '#353849',

    error: '#f10b0f',
    info: '#33cfff',
    success: '#67e296',
    warning: '#ffbd4c',

    onBackground: '#0d0d12',
    onSurface: '#1a1a25',
    onPrimary: '#f9f9fb',
    onSecondary: '#f9f9fb',
    onError: '#f9f9fb',
    onSuccess: '#f9f9fb',
    onWarning: '#0d0d12',
  },
};

const ApDarkTheme: ThemeDefinition = {
  dark: true,
  colors: {
    background: '#1a1b25',
    surface: '#000000',
    primary: '#0171ff',
    'primary-darken-1': '#6b39f4',

    secondary: '#666d80',
    'secondary-darken-1': '#353849',

    error: '#d5070a',
    info: '#33cfff',
    success: '#67e296',
    warning: '#ffbd4c',

    onBackground: '#f9f9fb',
    onSurface: '#eceff3',
    onPrimary: '#f9f9fb',
    onSecondary: '#f9f9fb',
    onError: '#f9f9fb',
    onSuccess: '#f9f9fb',
    onWarning: '#0d0d12',
  },
};

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components,
    directives,
    locale: {
      rtl: {
        fa: true,
      },
      locale: 'fa',
    },
    theme: {
      defaultTheme: 'light',
      themes: {
        light: ApLightTheme,
        dark: ApDarkTheme,
      },
    },
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: {
        mdi,
      },
    },
    defaults: {
      global: {
        style: 'font-family: Vazirmatn, Vazirmatn FD, sans-serif;',
      },
    },
  });

  nuxtApp.vueApp.use(vuetify);
});
