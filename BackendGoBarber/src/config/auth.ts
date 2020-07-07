export default {
  jwt: {
    secret: process.env.APP_SECRET || 'dafault',
    expiresIn: '1d',
  },
};
