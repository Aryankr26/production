# Render Deployment (Backend)

1. Push this repo to GitHub.
2. On Render, create a new Web Service and connect your repo.
3. Set environment variable `DATABASE_URL` to your Render Postgres connection string.
4. Set `NODE_VERSION` to 18.x if needed.
5. Build command: `npm install && npm run build`
6. Start command: `npm start` (server will run `node src/server.js`)
7. Add other env vars: JWT_SECRET, ENABLE_VENDOR_POLLER, etc.
