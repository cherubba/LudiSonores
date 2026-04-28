module.exports = {
  globDirectory: 'build/',
  globPatterns: [
    '**/*.{html,js,css,png,jpg,jpeg,svg,ico,woff,woff2,ttf,eot,json}'
  ],
  globIgnores: [
    '**/*.map',
    '**/*.pdf'
  ],
  swDest: 'build/service-worker.js',
  clientsClaim: true,
  skipWaiting: true,
  cleanupOutdatedCaches: true,
  maximumFileSizeToCacheInBytes: 5 * 1024 * 1024
};
