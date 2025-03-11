export default {
  build: {
    target: 'esnext', // Target modern browsers
    minify: 'terser',
    cssMinify: 'lightningcss',
    modulePreload: {
      polyfill: false,
    },
  },
}
