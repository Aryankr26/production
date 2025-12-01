# Vercel Deployment (Frontend)

1. Push frontend to GitHub.
2. On Vercel, import project and set Environment Variable `VITE_API_URL` to your backend URL.
3. Build command: `npm run build`, Output directory: `dist` (Vite default).
4. Ensure production base is reading from `import.meta.env.VITE_API_URL`.
