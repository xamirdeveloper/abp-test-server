export default defineAppConfig({
  head: {
    link: [
      { rel: 'manifest', href: '/manifest.webmanifest' },
      { rel: 'apple-touch-icon', href: '/icons/icon-192x192.png' },
    ],
    meta: [
      { name: 'theme-color', content: '#f8f5ff' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
    ],
  },
});
