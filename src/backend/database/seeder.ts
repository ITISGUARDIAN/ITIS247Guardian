// ITIS Production Demonstration Database Seeder Engine
// South African Live Data Generator for Prompts 017-067 Compliance

export interface SouthAfricanSchool {
  id: string;
  emisCode: string;
  name: string;
  province: string;
  district: string;
  circuit: string;
  latitude: number;
  longitude: number;
  principalName: string;
  contactPhone: string;
  contactEmail: string;
  learnerCount: number;
  status: 'ONLINE' | 'DEGRADED' | 'MAINTENANCE';
}

export interface SouthAfricanLearner {
  id: string;
  schoolId: string;
  schoolName: string;
  parentId: string;
  parentName: string;
  firstName: string;
  lastName: string;
  nationalId: string;
  grade: string;
  classSection: string;
  medicalNotes: string;
  wearableId: string;
  wearableSerial: string;
  transportRoute: string;
  geofenceStatus: 'INSIDE_SCHOOL' | 'SAFE_CORRIDOR' | 'OUTSIDE_BOUNDS' | 'HOME';
  batteryPercent: number;
  lastLat: number;
  lastLng: number;
}

export interface SouthAfricanParent {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  nationalId: string;
  address: string;
  emergencyPhone: string;
  rsaIdVerified: boolean;
  childrenCount: number;
}

export interface SouthAfricanDevice {
  id: string;
  serialNumber: string;
  imei: string;
  simIccid: string;
  bleMac: string;
  learnerName: string;
  learnerId: string;
  schoolName: string;
  batteryPercent: number;
  firmware: string;
  status: 'ONLINE' | 'ACTIVE' | 'LOW_BATTERY' | 'MAINTENANCE';
  signalStrengthDbm: number;
  geofence: string;
}

export interface DemoUserCredential {
  role: string;
  name: string;
  email: string;
  password: string;
  organization: string;
  jurisdiction: string;
}

// 1. SOUTH AFRICAN PROVINCES & DISTRICTS REFERENCE DATA
export const SA_PROVINCES_DISTRICTS = [
  { province: 'Gauteng', districts: ['Johannesburg South', 'Johannesburg North', 'Tshwane North', 'Ekurhuleni South', 'Sedibeng East', 'West Rand'] },
  { province: 'Western Cape', districts: ['City of Cape Town Metro', 'Cape Winelands', 'Garden Route', 'West Coast'] },
  { province: 'KwaZulu-Natal', districts: ['eThekwini Metro', 'uMgungundlovu', 'uThukela', 'King Cetshwayo'] },
  { province: 'Eastern Cape', districts: ['Nelson Mandela Bay Metro', 'Buffalo City Metro', 'OR Tambo', 'Amathole'] },
  { province: 'Free State', districts: ['Mangaung Metro', 'Lejweleputswa', 'Fezile Dabi'] },
  { province: 'Limpopo', districts: ['Capricorn', 'Vhembe', 'Mopani', 'Sekhukhune'] },
  { province: 'Mpumalanga', districts: ['Ehlanzeni', 'Nkangala', 'Gert Sibande'] },
  { province: 'North West', districts: ['Bojanala Platinum', 'Ngaka Modiri Molema', 'Dr Kenneth Kaunda'] },
  { province: 'Northern Cape', districts: ['Frances Baard', 'ZF Mgcawu', 'John Taolo Gaetsewe'] }
];

// 2. DEMO USER ACCOUNTS & CREDENTIALS
export const DEMO_CREDENTIALS: DemoUserCredential[] = [
  { role: 'NATIONAL_ADMIN', name: 'Dr. Thabo Mthembu', email: 'admin@itis.gov.za', password: 'Password123!', organization: 'Department of Basic Education (DBE)', jurisdiction: 'Republic of South Africa (National)' },
  { role: 'PROVINCIAL_ADMIN', name: 'Nomsa Cele', email: 'gp.admin@gauteng.gov.za', password: 'Password123!', organization: 'Gauteng Department of Education', jurisdiction: 'Gauteng Province' },
  { role: 'PROVINCIAL_ADMIN', name: 'Pieter van Zyl', email: 'wc.admin@westerncape.gov.za', password: 'Password123!', organization: 'Western Cape Education Dept', jurisdiction: 'Western Cape Province' },
  { role: 'PROVINCIAL_ADMIN', name: 'Sibusiso Dlamini', email: 'kzn.admin@kzn.gov.za', password: 'Password123!', organization: 'KZN Department of Education', jurisdiction: 'KwaZulu-Natal Province' },
  { role: 'SCHOOL_ADMIN', name: 'Principal S. Khumalo', email: 'principal@soweto.edu.za', password: 'Password123!', organization: 'Diepkloof Primary School', jurisdiction: 'EMIS-700142 (Johannesburg South)' },
  { role: 'TEACHER', name: 'Mrs. Z. Sithole', email: 'teacher.sithole@soweto.edu.za', password: 'Password123!', organization: 'Diepkloof Primary School', jurisdiction: 'Grade 6B Classroom' },
  { role: 'PARENT', name: 'Thabo Mokoena', email: 'parent1@email.com', password: 'Password123!', organization: 'Verified SA Guardian', jurisdiction: 'Sipho & Nomvula Mokoena' },
  { role: 'PARENT', name: 'Keabetswe Ndlovu', email: 'parent2@email.com', password: 'Password123!', organization: 'Verified SA Guardian', jurisdiction: 'Lethabo Ndlovu' },
  { role: 'COMMAND_OPERATOR', name: 'C3 Controller #14', email: 'c3@itis.gov.za', password: 'Password123!', organization: 'National C3 Command Centre', jurisdiction: '24/7 Dispatch Desk' },
  { role: 'RESPONDER', name: 'Capt. R. Naidoo', email: 'saps.dispatch@saps.gov.za', password: 'Password123!', organization: 'SAPS Highway Patrol & Rapid Response', jurisdiction: 'Gauteng Central Response Sector' },
  { role: 'RESPONDER', name: 'Metro Police Dispatch', email: 'jmpd.c3@jhb.gov.za', password: 'Password123!', organization: 'Johannesburg Metro Police Dept', jurisdiction: 'Soweto & JHB South' },
  { role: 'DEVICE_TECHNICIAN', name: 'Johnson Mbeki', email: 'tech.johnson@itis.co.za', password: 'Password123!', organization: 'ITIS Field Maintenance Team', jurisdiction: 'Gauteng Warehouse & Field' },
  { role: 'AUDITOR', name: 'Auditor-General SA', email: 'auditor@treasury.gov.za', password: 'Password123!', organization: 'National Treasury & AGSA', jurisdiction: 'Compliance & Audit Inspectorate' }
];

// Helper name generators
const FIRST_NAMES = ['Sipho', 'Nomvula', 'Thabo', 'Keabetswe', 'Buhle', 'Lungelo', 'Karabo', 'Bandile', 'Zinhle', 'Kgosi', 'Lerato', 'Nandi', 'Anathi', 'Caleb', 'Liam', 'Ethan', 'Chloe', 'Jessica', 'Johan', 'Pieter', 'Siyabonga', 'Melokuhle', 'Ayanda', 'Kagiso', 'Mpho', 'Tshepo', 'Nthabiseng', 'Duduzile'];
const LAST_NAMES = ['Mokoena', 'Ndlovu', 'Dlamini', 'Khumalo', 'Zulu', 'Naidoo', 'Van der Merwe', 'Botha', 'Pillay', 'Smith', 'Sithole', 'Nkosi', 'Molefe', 'Chauke', 'Marais', 'Bhengu', 'Mthembu', 'Govender', 'Moagi', 'Smit', 'Venter', 'Mahlangu', 'Nkabinde'];
const SCHOOL_NAMES = [
  'Diepkloof Primary School', 'Orlando West High School', 'Alexandra Secondary School', 'Tembisa Comprehensive',
  'Soweto Primary School', 'Mamelodi High School', 'Khayelitsha Primary', 'Mitchells Plain High',
  'Umlazi Technical High', 'Inanda Comprehensive', 'Bloemfontein Central High', 'Polokwane Academy',
  'Nelson Mandela Bay High', 'Kimberley Primary School', 'Nelspruit Combined School', 'Rustenburg High School'
];

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateNationalId(birthYear: number): string {
  const yearStr = String(birthYear).slice(-2);
  const monthStr = String(randomInt(1, 12)).padStart(2, '0');
  const dayStr = String(randomInt(1, 28)).padStart(2, '0');
  const seqStr = String(randomInt(1000, 9999));
  return `${yearStr}${monthStr}${dayStr}${seqStr}08${randomInt(0, 9)}`;
}

/**
 * GENERATE SEED DATA DATASETS
 */
export function generateSeedDataset() {
  // 1. Generate Schools (~100 items)
  const schools: SouthAfricanSchool[] = [];
  let emisCounter = 700142;

  const provinces = SA_PROVINCES_DISTRICTS;

  for (let i = 0; i < 100; i++) {
    const pObj = provinces[i % provinces.length];
    const province = pObj.province;
    const district = pObj.districts[i % pObj.districts.length];
    const baseName = SCHOOL_NAMES[i % SCHOOL_NAMES.length];
    const name = i < SCHOOL_NAMES.length ? baseName : `${province} Community School #${i + 1}`;
    
    // Lat/Lng centered around SA major metros
    let lat = -26.2 + (Math.random() - 0.5) * 0.4;
    let lng = 27.9 + (Math.random() - 0.5) * 0.4;
    if (province === 'Western Cape') { lat = -33.9 + (Math.random() - 0.5) * 0.3; lng = 18.5 + (Math.random() - 0.5) * 0.3; }
    if (province === 'KwaZulu-Natal') { lat = -29.8 + (Math.random() - 0.5) * 0.3; lng = 31.0 + (Math.random() - 0.5) * 0.3; }

    schools.push({
      id: `sch-${emisCounter}`,
      emisCode: `EMIS-${emisCounter}`,
      name,
      province,
      district,
      circuit: `Circuit-${randomInt(1, 12)}`,
      latitude: parseFloat(lat.toFixed(4)),
      longitude: parseFloat(lng.toFixed(4)),
      principalName: `Dr. ${randomChoice(FIRST_NAMES)} ${randomChoice(LAST_NAMES)}`,
      contactPhone: `+27 ${randomInt(11, 84)} ${randomInt(100, 999)} ${randomInt(1000, 9999)}`,
      contactEmail: `admin@${name.toLowerCase().replace(/[^a-z0-9]/g, '')}.edu.za`,
      learnerCount: randomInt(850, 1850),
      status: 'ONLINE'
    });
    emisCounter++;
  }

  // 2. Generate Parents (~50 items)
  const parents: SouthAfricanParent[] = [];
  for (let i = 1; i <= 50; i++) {
    const fName = randomChoice(FIRST_NAMES);
    const lName = randomChoice(LAST_NAMES);
    parents.push({
      id: `prt-${String(i).padStart(3, '0')}`,
      userId: `usr-parent-${i}`,
      firstName: fName,
      lastName: lName,
      email: i === 1 ? 'parent1@email.com' : i === 2 ? 'parent2@email.com' : `${fName.toLowerCase()}.${lName.toLowerCase()}${i}@email.com`,
      phoneNumber: `+27 ${randomInt(60, 84)} ${randomInt(100, 999)} ${randomInt(1000, 9999)}`,
      nationalId: generateNationalId(randomInt(1975, 1995)),
      address: `${randomInt(10, 999)} Vilakazi Street, Soweto, Gauteng, 1804`,
      emergencyPhone: `+27 ${randomInt(60, 84)} ${randomInt(100, 999)} ${randomInt(1000, 9999)}`,
      rsaIdVerified: true,
      childrenCount: randomInt(1, 3)
    });
  }

  // 3. Generate Learners (~120 rich sample items for live state)
  const learners: SouthAfricanLearner[] = [];
  const devices: SouthAfricanDevice[] = [];

  for (let i = 1; i <= 120; i++) {
    const sch = schools[i % schools.length];
    const prt = parents[i % parents.length];
    const fName = randomChoice(FIRST_NAMES);
    const lName = prt.lastName;
    const gradeNum = randomInt(1, 12);
    const grade = `Grade ${gradeNum}`;
    const section = randomChoice(['A', 'B', 'C', 'D']);
    const wearableSerial = `ITIS-WB-2026-${String(9000 + i)}`;
    const wearableId = `dev-${String(i).padStart(3, '0')}`;
    const battery = randomInt(75, 100);

    const learnerLat = parseFloat((sch.latitude + (Math.random() - 0.5) * 0.02).toFixed(4));
    const learnerLng = parseFloat((sch.longitude + (Math.random() - 0.5) * 0.02).toFixed(4));

    learners.push({
      id: `lrn-${String(900 + i)}`,
      schoolId: sch.id,
      schoolName: sch.name,
      parentId: prt.id,
      parentName: `${prt.firstName} ${prt.lastName}`,
      firstName: fName,
      lastName: lName,
      nationalId: generateNationalId(2026 - gradeNum - 6),
      grade,
      classSection: `${gradeNum}${section}`,
      medicalNotes: randomChoice(['No known allergies', 'Asthma (Inhaler Assigned)', 'Bee Sting Allergy (EpiPen)', 'Penicillin Allergy', 'Type 1 Diabetes']),
      wearableId,
      wearableSerial,
      transportRoute: `Route ${randomInt(1, 15)} (Soweto Safe Bus)`,
      geofenceStatus: randomChoice(['INSIDE_SCHOOL', 'INSIDE_SCHOOL', 'SAFE_CORRIDOR', 'HOME']),
      batteryPercent: battery,
      lastLat: learnerLat,
      lastLng: learnerLng
    });

    devices.push({
      id: wearableId,
      serialNumber: wearableSerial,
      imei: `8642090412${String(84900 + i)}`,
      simIccid: `89270100202600${String(1000 + i)}`,
      bleMac: `C4:B3:01:${String(10 + (i % 80)).padStart(2, '0')}:${String(20 + (i % 70)).padStart(2, '0')}:${String(30 + (i % 60)).padStart(2, '0')}`,
      learnerName: `${fName} ${lName}`,
      learnerId: `lrn-${String(900 + i)}`,
      schoolName: sch.name,
      batteryPercent: battery,
      firmware: 'v2.4.1',
      status: battery < 20 ? 'LOW_BATTERY' : 'ONLINE',
      signalStrengthDbm: randomInt(-85, -55),
      geofence: 'INSIDE_SCHOOL'
    });
  }

  // 4. Generate Incidents (~12 items)
  const incidents = [
    {
      id: 'inc-9001',
      incidentNumber: 'SOS-20260723-009',
      learnerId: learners[0].id,
      learnerName: `${learners[0].firstName} ${learners[0].lastName}`,
      schoolId: learners[0].schoolId,
      schoolName: learners[0].schoolName,
      latitude: learners[0].lastLat,
      longitude: learners[0].lastLng,
      severity: 'CRITICAL',
      status: 'DISPATCHED',
      dispatchedUnit: 'SAPS Soweto Highway Patrol #42',
      responderEtaMinutes: 3,
      createdAt: new Date().toISOString()
    },
    {
      id: 'inc-9002',
      incidentNumber: 'MED-20260723-010',
      learnerId: learners[1].id,
      learnerName: `${learners[1].firstName} ${learners[1].lastName}`,
      schoolId: learners[1].schoolId,
      schoolName: learners[1].schoolName,
      latitude: learners[1].lastLat,
      longitude: learners[1].lastLng,
      severity: 'HIGH',
      status: 'IN_PROGRESS',
      dispatchedUnit: 'Gauteng EMS Ambulance #12',
      responderEtaMinutes: 5,
      createdAt: new Date(Date.now() - 300000).toISOString()
    },
    {
      id: 'inc-9003',
      incidentNumber: 'GEO-20260723-011',
      learnerId: learners[2].id,
      learnerName: `${learners[2].firstName} ${learners[2].lastName}`,
      schoolId: learners[2].schoolId,
      schoolName: learners[2].schoolName,
      latitude: learners[2].lastLat,
      longitude: learners[2].lastLng,
      severity: 'MEDIUM',
      status: 'OPEN',
      dispatchedUnit: 'Unassigned',
      responderEtaMinutes: 0,
      createdAt: new Date(Date.now() - 600000).toISOString()
    }
  ];

  // 5. Generate Attendance records
  const todayStr = new Date().toISOString().split('T')[0];
  const attendance = learners.slice(0, 40).map((lrn, idx) => ({
    id: `att-${100 + idx}`,
    learnerId: lrn.id,
    learnerName: `${lrn.firstName} ${lrn.lastName}`,
    schoolId: lrn.schoolId,
    schoolName: lrn.schoolName,
    date: todayStr,
    status: 'PRESENT',
    nfcTime: `07:${String(15 + (idx % 30)).padStart(2, '0')}:${String(10 + (idx % 45)).padStart(2, '0')}`
  }));

  // 6. Generate Notifications
  const notifications = [
    { id: 'notif-101', title: 'NFC Safe Gate Check-In', body: `${learners[0].firstName} ${learners[0].lastName} checked in safely at ${learners[0].schoolName} at 07:28.`, read: false, createdAt: new Date().toISOString() },
    { id: 'notif-102', title: 'Geofence Exit Alert', body: `Learner ${learners[2].firstName} ${learners[2].lastName} exited Soweto Safe Corridor Route #4. C3 dispatched.`, read: false, createdAt: new Date(Date.now() - 120000).toISOString() },
    { id: 'notif-103', title: 'Device Battery Normal', body: 'Wearable ITIS-WB-2026-9042 successfully charged to 98%.', read: true, createdAt: new Date(Date.now() - 3600000).toISOString() }
  ];

  return {
    schools,
    parents,
    learners,
    devices,
    incidents,
    attendance,
    notifications,
    demoCredentials: DEMO_CREDENTIALS
  };
}
