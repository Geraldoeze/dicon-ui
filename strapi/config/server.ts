export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS', ['2cc102bab96debdd52a5b27d0bdffa1d84d06950a68a8f2567ea176f835d44af','fa14478f7e08adcff780c7d32b72c0876c722d47e72f657de4780f8747b0aed7']),
  },
});
