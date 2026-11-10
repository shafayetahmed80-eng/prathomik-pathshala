// Custom server for cPanel / Phusion Passenger Node.js deployment
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const hostname = process.env.HOSTNAME || 'localhost';
// Phusion Passenger may pass a port number or a Unix domain socket path
const port = process.env.PORT ? (isNaN(process.env.PORT) ? process.env.PORT : Number(process.env.PORT)) : 3000;

const app = next({ dev, hostname: typeof port === 'number' ? hostname : undefined, port: typeof port === 'number' ? port : undefined });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('Internal Server Error');
    }
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on ${typeof port === 'number' ? `http://${hostname}:${port}` : `socket ${port}`}`);
  });
}).catch((err) => {
  console.error('Fatal error preparing Next.js application:', err);
  process.exit(1);
});
