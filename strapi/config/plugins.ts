export default ({ env }) => ({
    'users-permissions': {
      config: {
        jwtSecret: env('JWT_SECRET', 'a71702f6350926585ddd9b43ec74e78365b9f6bfbf1bbe273abd795d717270e9'),
      },
    },
  });