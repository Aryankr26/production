Simulation Guide (basic):
1. Start backend locally with a test DB (set DATABASE_URL to a local Postgres).
2. Start frontend pointing VITE_API_URL to http://localhost:10000
3. Use Postman to hit /api/health to verify.
4. To simulate vehicles: POST sample telemetry payloads to /api/telemetry (if such endpoint exists) or use provided mock scripts.

Notes: Detailed simulation depends on backend API contract; inspect routes and telemetry format in backend code.
