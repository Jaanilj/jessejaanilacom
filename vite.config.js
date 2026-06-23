export default {
  build: {
    target: 'esnext', // Target modern browsers
    modulePreload: {
      polyfill: false,
    },
  },
}
