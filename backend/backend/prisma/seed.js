const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  const pw = await bcrypt.hash('adminpass', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: { password: pw },
    create: { email: 'admin@example.com', password: pw, name: 'Admin' }
  });
  console.log('Admin ready', admin.email);

  const v1 = await prisma.vehicle.upsert({
    where: { imei: '864512345678901' },
    update: {},
    create: {
      imei: '864512345678901',
      registrationNo: 'KA01AB1234',
      make: 'Scania',
      model: 'P-series',
      year: 2020,
      fuelCapacity: 400,
      ownerId: admin.id
    }
  });
  console.log('Vehicle added', v1.imei);

  const gf = await prisma.geofence.upsert({
    where: { name: 'Main Depot' },
    update: {},
    create: { name: 'Main Depot', type: 'circle', centerLat: 12.9716, centerLng: 77.5946, radius: 1000 }
  });
  console.log('Geofence', gf.name);

  // create a sample document expiring in 25 days
  const expiry = new Date(Date.now() + 25 * 24 * 3600 * 1000);
  await prisma.vehicleDocument.create({ data: { vehicleId: v1.id, type: 'Insurance', expiryDate: expiry } });
  console.log('Seed complete');
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(async () => { await prisma.$disconnect(); });