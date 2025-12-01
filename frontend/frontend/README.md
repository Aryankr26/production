```markdown
Frontend
--------

1. Install dependencies:
   pnpm install

2. Start dev server:
   pnpm dev

3. Configure VITE_API_BASE in frontend/.env to point to backend (e.g., http://localhost:4000)
```
----
## Vercel deployment notes (added)
- Set `VITE_API_URL` in Vercel environment variables to your backend URL (https://your-backend.example.com)
- Build command: `pnpm install && pnpm run build` (or `npm ci && npm run build`)
- Output directory (dist) is configured in vercel.json
- This project now sets axios.defaults.baseURL at startup using VITE_API_URL.
