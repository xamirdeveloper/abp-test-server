import '@mdi/font/css/materialdesignicons.css';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import { createVuetify, type ThemeDefinition } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import 'vuetify/styles';

const ApLightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    background: 'var(--ap-bg-default)',
    surface: 'var(--ap-bg-surface)',
    primary: 'var(--ap-btn-primary)',
    'primary-darken-1': 'var(--ap-primary-300)',

    secondary: 'var(--ap-text-secondary)',
    'secondary-darken-1': 'var(--ap-grey-600)',

    error: 'var(--ap-btn-error)',
    info: 'var(--ap-sky-100)',
    success: 'var(--ap-success-300)',
    warning: 'var(--ap-warning-100)',

    onBackground: 'var(--ap-grey-900)',
    onSurface: 'var(--ap-grey-800)',
    onPrimary: 'var(--ap-grey-0)',
    onSecondary: 'var(--ap-grey-0)',
    onError: 'var(--ap-grey-0)',
    onSuccess: 'var(--ap-grey-0)',
    onWarning: 'var(--ap-grey-900)',
  },
};

const ApDarkTheme: ThemeDefinition = {
  dark: true,
  colors: {
    background: 'var(--ap-bg-default)',
    surface: 'var(--ap-bg-surface)',
    primary: 'var(--ap-btn-primary)',
    'primary-darken-1': 'var(--ap-primary-300)',

    secondary: 'var(--ap-text-secondary)',
    'secondary-darken-1': 'var(--ap-grey-600)',

    error: 'var(--ap-btn-error)',
    info: 'var(--ap-sky-100)',
    success: 'var(--ap-success-300)',
    warning: 'var(--ap-warning-100)',

    onBackground: 'var(--ap-grey-900)',
    onSurface: 'var(--ap-grey-800)',
    onPrimary: 'var(--ap-grey-0)',
    onSecondary: 'var(--ap-grey-0)',
    onError: 'var(--ap-grey-0)',
    onSuccess: 'var(--ap-grey-0)',
    onWarning: 'var(--ap-grey-900)',
  },
};

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components,
    directives,
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
