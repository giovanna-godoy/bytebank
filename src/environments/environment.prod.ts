export const environment = {
  production: true,
  apiUrl: 'https://bytebank-api-gio.vercel.app',
  sentryDsn: process.env['SENTRY_DSN'] || '',
  enableAnalytics: true
};
