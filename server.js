// Custom server for cPanel / Phusion Passenger / LiteSpeed Node.js deployment
const fs = require('fs');
const path = require('path');
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const hostname = process.env.HOSTNAME || 'localhost';
// Phusion Passenger / LiteSpeed may pass a port number or a Unix domain socket path
const port = process.env.PORT ? (isNaN(process.env.PORT) ? process.env.PORT : Number(process.env.PORT)) : 3000;

/**
 * Removes untracked Next.js runtime caches whenever a new pre-built `.next/BUILD_ID`
 * is deployed via git reset, preventing stale prerendered HTML from serving deleted asset hashes.
 */
function purgeStaleRouteCache() {
  if (dev) return;

  try {
    const nextDir = path.join(__dirname, '.next');
    const buildIdPath = path.join(nextDir, 'BUILD_ID');
    if (!fs.existsSync(buildIdPath)) return;

    const currentBuildId = fs.readFileSync(buildIdPath, 'utf8').trim();
    const markerPath = path.join(nextDir, '.deployed_build_id');
    const previousBuildId = fs.existsSync(markerPath)
      ? fs.readFileSync(markerPath, 'utf8').trim()
      : '';

    if (currentBuildId && currentBuildId !== previousBuildId) {
      fs.rmSync(path.join(nextDir, 'server', 'route-cache'), { recursive: true, force: true });
      fs.rmSync(path.join(nextDir, 'cache'), { recursive: true, force: true });
      fs.writeFileSync(markerPath, currentBuildId, 'utf8');
      console.log(`> Cleared stale Next.js route cache for build ${currentBuildId}`);
    }
  } catch (err) {
    console.error('Warning: unable to clear stale route cache:', err);
  }
}

purgeStaleRouteCache();

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
