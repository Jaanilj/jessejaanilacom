export default {
  build: {
    target: 'esnext', // Target modern browsers
    // Keep vendor prefixes older Safari/iOS need (e.g. -webkit-background-clip:
    // text for the heading gradient) instead of letting esnext strip them.
    cssTarget: ['safari13', 'ios13'],
    modulePreload: {
      polyfill: false,
    },
  },
}
