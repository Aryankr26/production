const express = require('express');
const cors = require('cors');
const { apiLimiter, authLimiter } = require('./middlewares/rateLimiter');
const authRoutes = require('./routes/auth');
const vehicleRoutes = require('./routes/vehicles');
const telemetryRoutes = require('./routes/telemetry');
const fuelRoutes = require('./routes/fuel');
const geofenceRoutes = require('./routes/geofence');
const tyresRoutes = require('./routes/tyres');
const documentsRoutes = require('./routes/documents');
const complaintsRoutes = require('./routes/complaints');

const app = express();
app.use(cors());
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));

// Apply rate limiting to all API routes
app.use('/api/', apiLimiter);

app.get('/health', (req, res) => res.json({ ok: true, ts: new Date() }));

// Apply stricter rate limiting to auth routes
app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/telemetry', telemetryRoutes);
app.use('/api/fuel', fuelRoutes);
app.use('/api/geofence', geofenceRoutes);
app.use('/api/tyres', tyresRoutes);
app.use('/api/documents', documentsRoutes);
app.use('/api/complaints', complaintsRoutes);
const healthRoutes = require('./routes/health');
app.use('/api', healthRoutes);

// error
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'server error' });
});

module.exports = app;