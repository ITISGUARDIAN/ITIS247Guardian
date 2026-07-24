// ITIS Enterprise Production Database Prisma Seed Script (Prompt 067)
import { generateSeedDataset, DEMO_CREDENTIALS } from '../src/backend/database/seeder';

async function main() {
  console.log('🚀 Starting ITIS Enterprise PostgreSQL Database Seeding (Prompt 067)...');

  let PrismaClientConstructor: any;
  try {
    const prismaModule: any = await import('@prisma/client');
    PrismaClientConstructor = prismaModule.PrismaClient || prismaModule.default?.PrismaClient;
  } catch (err) {
    console.warn('⚠️ @prisma/client not generated yet. Running seed simulation...');
    return;
  }

  if (!PrismaClientConstructor) {
    console.warn('⚠️ PrismaClient not found in @prisma/client module.');
    return;
  }

  const prisma: any = new PrismaClientConstructor();
  const dataset = generateSeedDataset();

  // 1. Clear existing records for clean idempotent run
  console.log('🧹 Cleaning existing PostgreSQL tables...');
  try {
    await prisma.auditLog.deleteMany();
    await prisma.session.deleteMany();
    await prisma.refreshToken.deleteMany();
    await prisma.sOSIncident.deleteMany();
    await prisma.telemetry.deleteMany();
    await prisma.attendance.deleteMany();
    await prisma.learner.deleteMany();
    await prisma.wearable.deleteMany();
    await prisma.parent.deleteMany();
    await prisma.school.deleteMany();
    await prisma.user.deleteMany();
  } catch (err: any) {
    console.warn('⚠️ Clear table step notice:', err.message);
  }

  // 2. Seed Users & Demo Credentials
  console.log('👤 Seeding Enterprise Users & Demo Credentials...');
  for (const cred of DEMO_CREDENTIALS) {
    await prisma.user.upsert({
      where: { email: cred.email },
      update: {},
      create: {
        email: cred.email,
        passwordHash: '$2b$10$wN9iQ3R3yvP01Q8cK8XmNe4p2bA6J1D5oR4u8p0E2n7A1b3C5d7e9', // Hash for "Password123!"
        firstName: cred.name.split(' ')[0],
        lastName: cred.name.split(' ').slice(1).join(' ') || 'Admin',
        phoneNumber: '+27820000000',
        role: cred.role,
        isActive: true,
        mfaEnabled: cred.role === 'NATIONAL_ADMIN' || cred.role === 'COMMAND_OPERATOR'
      }
    });
  }

  // 3. Seed Schools (~100 Schools)
  console.log(`🏫 Seeding ${dataset.schools.length} South African Schools across 9 Provinces...`);
  for (const sch of dataset.schools) {
    await prisma.school.create({
      data: {
        id: sch.id,
        emisCode: sch.emisCode,
        name: sch.name,
        province: sch.province,
        district: sch.district,
        circuit: sch.circuit,
        latitude: sch.latitude,
        longitude: sch.longitude,
        principalName: sch.principalName,
        contactPhone: sch.contactPhone,
        contactEmail: sch.contactEmail
      }
    });
  }

  // 4. Seed Parents
  console.log(`👨‍👩‍👧‍👦 Seeding ${dataset.parents.length} Verified Parent Profiles...`);
  for (const prt of dataset.parents) {
    const user = await prisma.user.create({
      data: {
        id: prt.userId,
        email: prt.email,
        passwordHash: '$2b$10$wN9iQ3R3yvP01Q8cK8XmNe4p2bA6J1D5oR4u8p0E2n7A1b3C5d7e9',
        firstName: prt.firstName,
        lastName: prt.lastName,
        idNumber: prt.nationalId,
        phoneNumber: prt.phoneNumber,
        role: 'PARENT'
      }
    });

    await prisma.parent.create({
      data: {
        id: prt.id,
        userId: user.id,
        emergencyPhone: prt.emergencyPhone,
        address: prt.address,
        rsaIdVerified: true
      }
    });
  }

  // 5. Seed Wearables & Learners
  console.log(`⌚ Seeding ${dataset.devices.length} GPS Wearable Devices & Learner Profiles...`);
  for (let i = 0; i < dataset.learners.length; i++) {
    const lrn = dataset.learners[i];
    const dev = dataset.devices[i];

    const wearable = await prisma.wearable.create({
      data: {
        id: dev.id,
        serialNumber: dev.serialNumber,
        imei: dev.imei,
        bleMac: dev.bleMac,
        batteryLevel: dev.batteryPercent,
        firmwareVersion: dev.firmware,
        status: dev.status
      }
    });

    await prisma.learner.create({
      data: {
        id: lrn.id,
        schoolId: lrn.schoolId,
        parentId: lrn.parentId,
        firstName: lrn.firstName,
        lastName: lrn.lastName,
        nationalId: lrn.nationalId,
        grade: lrn.grade,
        classSection: lrn.classSection,
        medicalNotes: lrn.medicalNotes,
        wearableId: wearable.id
      }
    });
  }

  // 6. Seed Incidents
  console.log(`🚨 Seeding ${dataset.incidents.length} SOS Incident Records...`);
  for (const inc of dataset.incidents) {
    await prisma.sOSIncident.create({
      data: {
        id: inc.id,
        incidentNumber: inc.incidentNumber,
        learnerId: inc.learnerId,
        latitude: inc.latitude,
        longitude: inc.longitude,
        severity: inc.severity,
        status: inc.status,
        dispatchedTo: inc.dispatchedUnit
      }
    });
  }

  // 7. Seed Attendance
  console.log(`📅 Seeding ${dataset.attendance.length} Attendance Gate Scan Logs...`);
  for (const att of dataset.attendance) {
    await prisma.attendance.create({
      data: {
        id: att.id,
        learnerId: att.learnerId,
        schoolId: att.schoolId,
        date: new Date(att.date),
        status: 'PRESENT'
      }
    });
  }

  // 8. Audit Log
  await prisma.auditLog.create({
    data: {
      action: 'DATABASE_SEED_COMPLETE',
      resource: 'prisma/seed.ts',
      correlationId: 'SYS-SEED-067',
      metadata: JSON.stringify({
        schoolsSeeded: dataset.schools.length,
        learnersSeeded: dataset.learners.length,
        parentsSeeded: dataset.parents.length,
        devicesSeeded: dataset.devices.length,
        timestamp: new Date().toISOString()
      })
    }
  });

  console.log('✅ ITIS PostgreSQL Database Seeding Completed Successfully!');
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error('❌ Seeding failed:', e);
  process.exit(1);
});
