export interface SchoolMetricOverview {
  totalLearnersProtected: number;
  wearablesOnlineCount: number;
  activeIncidentsCount: number;
  todayAttendancePct: number;
  busesRunningCount: number;
  routeDeviationsCount: number;
  emergencyAlertsCount: number;
  schoolName: string;
  principalName: string;
  circuitName: string;
}

export interface SapLearnerRecord {
  id: string; // e.g. LRN-GP-8801
  fullName: string;
  gradeClass: string;
  wearableImei: string;
  wearableBatteryPct: number;
  attendanceToday: 'PRESENT_NFC' | 'PRESENT_QR' | 'LATE' | 'ABSENT' | 'EARLY_DEPARTURE';
  checkInTime: string;
  safetyStatus: 'SAFE_IN_CLASS' | 'IN_TRANSIT' | 'GEODEFENCE_EXIT' | 'SOS_PENDING';
  guardianName: string;
  guardianPhone: string;
  medicalAlerts: string[];
}

export interface SapIncidentRecord {
  id: string; // e.g. INC-SCH-9901
  learnerName: string;
  gradeClass: string;
  incidentType: 'GEOFENCE_BREACH' | 'UNAUTHORIZED_PICKUP' | 'MEDICAL_EMERGENCY' | 'WEARABLE_TAMPER' | 'PANIC_SOS';
  severity: 'CRITICAL_RED' | 'HIGH_ORANGE' | 'MEDIUM_YELLOW';
  timestamp: string;
  location: string;
  status: 'OPEN_INVESTIGATING' | 'DISPATCHED' | 'RESOLVED_SAFE';
  assignedOfficer: string;
  schoolNotes: string;
}

export interface SapBusFleetRecord {
  busId: string; // e.g. BUS-GP-04
  driverName: string;
  routeCode: string;
  capacity: number;
  learnersOnboard: number;
  speedKmH: number;
  speedLimitKmH: number;
  routeCompliancePct: number;
  status: 'ON_ROUTE' | 'AT_SCHOOL' | 'DELAYED' | 'DEVIATION_DETECTED';
}

export interface SapWearableInventory {
  imei: string;
  assignedLearner: string;
  batteryPct: number;
  signalDbm: number;
  firmwareVersion: string;
  hardwareStatus: 'OPTIMAL' | 'BATTERY_LOW' | 'SENSOR_FAULT' | 'OFFLINE';
  lastHeartbeat: string;
}

export interface SapCodeSpec {
  id: number;
  title: string;
  filename: string;
  category: 'Next.js App Router' | 'TanStack Query Data Service' | 'NFC Attendance Service' | 'WebSocket Live Map' | 'NestJS School API';
  description: string;
  code: string;
}

// SAMPLE SCHOOL METRICS
export const SAMPLE_SCHOOL_METRICS: SchoolMetricOverview = {
  totalLearnersProtected: 1850,
  wearablesOnlineCount: 1812,
  activeIncidentsCount: 1,
  todayAttendancePct: 97.4,
  busesRunningCount: 14,
  routeDeviationsCount: 0,
  emergencyAlertsCount: 0,
  schoolName: 'Orlando East Secondary School',
  principalName: 'Dr. Thabo Mkhize',
  circuitName: 'Gauteng Education District 12 (Soweto East)',
};

// SAMPLE LEARNERS
export const SAMPLE_SAP_LEARNERS: SapLearnerRecord[] = [
  {
    id: 'LRN-GP-8801',
    fullName: 'Lethabo Dlamini',
    gradeClass: 'Grade 5B',
    wearableImei: '864209051820491',
    wearableBatteryPct: 92,
    attendanceToday: 'PRESENT_NFC',
    checkInTime: '07:25 AM',
    safetyStatus: 'SAFE_IN_CLASS',
    guardianName: 'Thandi Dlamini',
    guardianPhone: '+27 82 555 0192',
    medicalAlerts: ['Asthma (Ventolin)', 'Penicillin Allergy'],
  },
  {
    id: 'LRN-GP-8802',
    fullName: 'Sipho Dlamini',
    gradeClass: 'Grade 8A',
    wearableImei: '864209051820492',
    wearableBatteryPct: 84,
    attendanceToday: 'PRESENT_NFC',
    checkInTime: '07:30 AM',
    safetyStatus: 'SAFE_IN_CLASS',
    guardianName: 'Thandi Dlamini',
    guardianPhone: '+27 82 555 0192',
    medicalAlerts: ['None'],
  },
  {
    id: 'LRN-GP-8803',
    fullName: 'Kamogelo Sithole',
    gradeClass: 'Grade 6A',
    wearableImei: '864209051820493',
    wearableBatteryPct: 78,
    attendanceToday: 'LATE',
    checkInTime: '08:05 AM',
    safetyStatus: 'SAFE_IN_CLASS',
    guardianName: 'Grace Sithole',
    guardianPhone: '+27 83 444 9102',
    medicalAlerts: ['Diabetes Type 1'],
  },
  {
    id: 'LRN-GP-8804',
    fullName: 'Keletso Naidoo',
    gradeClass: 'Grade 7C',
    wearableImei: '864209051820494',
    wearableBatteryPct: 95,
    attendanceToday: 'PRESENT_QR',
    checkInTime: '07:18 AM',
    safetyStatus: 'SAFE_IN_CLASS',
    guardianName: 'Pravin Naidoo',
    guardianPhone: '+27 71 888 2231',
    medicalAlerts: ['Peanut Allergy'],
  },
  {
    id: 'LRN-GP-8805',
    fullName: 'Bongani Ndlovu',
    gradeClass: 'Grade 9B',
    wearableImei: '864209051820495',
    wearableBatteryPct: 18,
    attendanceToday: 'ABSENT',
    checkInTime: 'N/A',
    safetyStatus: 'SOS_PENDING',
    guardianName: 'Sbusiso Ndlovu',
    guardianPhone: '+27 82 333 7711',
    medicalAlerts: ['Epilepsy'],
  },
];

// SAMPLE INCIDENTS
export const SAMPLE_SAP_INCIDENTS: SapIncidentRecord[] = [
  {
    id: 'INC-SCH-9901',
    learnerName: 'Bongani Ndlovu',
    gradeClass: 'Grade 9B',
    incidentType: 'WEARABLE_TAMPER',
    severity: 'HIGH_ORANGE',
    timestamp: '07:42 AM',
    location: 'Outside Perimeter Wall (North Gate)',
    status: 'OPEN_INVESTIGATING',
    assignedOfficer: 'Officer Ndaba (School Safety)',
    schoolNotes: 'Wearable strap tamper sensor activated near North Gate. Safety officer dispatched to verify.',
  },
  {
    id: 'INC-SCH-9902',
    learnerName: 'Kamogelo Sithole',
    gradeClass: 'Grade 6A',
    incidentType: 'GEOFENCE_BREACH',
    severity: 'MEDIUM_YELLOW',
    timestamp: 'Yesterday 14:15 PM',
    location: 'Soweto Expressway Intersection',
    status: 'RESOLVED_SAFE',
    assignedOfficer: 'Deputy Principal Zondi',
    schoolNotes: 'Bus was delayed by road maintenance. Guardian notified and learner confirmed safe home arrival.',
  },
];

// SAMPLE BUS FLEET
export const SAMPLE_SAP_BUSES: SapBusFleetRecord[] = [
  {
    busId: 'BUS-GP-04',
    driverName: 'Mr. Bongani Khumalo',
    routeCode: 'ROUTE-GP-04 (Diepkloof - Orlando)',
    capacity: 24,
    learnersOnboard: 22,
    speedKmH: 42,
    speedLimitKmH: 60,
    routeCompliancePct: 98.6,
    status: 'ON_ROUTE',
  },
  {
    busId: 'BUS-GP-09',
    driverName: 'Mr. Jacobus van der Merwe',
    routeCode: 'ROUTE-GP-09 (Meadowlands - Orlando)',
    capacity: 35,
    learnersOnboard: 32,
    speedKmH: 0,
    speedLimitKmH: 60,
    routeCompliancePct: 100.0,
    status: 'AT_SCHOOL',
  },
];

// SAMPLE WEARABLE INVENTORY
export const SAMPLE_SAP_WEARABLES: SapWearableInventory[] = [
  {
    imei: '864209051820491',
    assignedLearner: 'Lethabo Dlamini (Grade 5B)',
    batteryPct: 92,
    signalDbm: -68,
    firmwareVersion: 'v4.2.1-PROD-GP',
    hardwareStatus: 'OPTIMAL',
    lastHeartbeat: '10s ago',
  },
  {
    imei: '864209051820495',
    assignedLearner: 'Bongani Ndlovu (Grade 9B)',
    batteryPct: 18,
    signalDbm: -88,
    firmwareVersion: 'v4.2.1-PROD-GP',
    hardwareStatus: 'BATTERY_LOW',
    lastHeartbeat: '2m ago',
  },
];

// CODE SPECS
export const SAP_CODE_SPECS: SapCodeSpec[] = [
  {
    id: 1,
    title: 'Next.js 15 App Router School Admin Shell',
    filename: 'src/app/(portal)/dashboard/page.tsx',
    category: 'Next.js App Router',
    description: 'Server Component rendering live school metrics, real-time WebSocket attendance counters, and incident escalation controls.',
    code: `import { Suspense } from 'react';
import { SchoolMetricOverviewCard } from '@/components/dashboard/SchoolMetricCard';
import { LearnerLiveAttendanceGrid } from '@/components/attendance/LearnerAttendanceGrid';
import { IncidentResponsePanel } from '@/components/incidents/IncidentResponsePanel';

export default async function SchoolDashboardPage() {
  return (
    <main className="p-6 space-y-6 bg-slate-950 text-white min-h-screen">
      <header className="flex justify-between items-center border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-bold">Orlando East Secondary School Portal</h1>
          <p className="text-xs text-slate-400">Gauteng Education District 12 • Principal Dr. Thabo Mkhize</p>
        </div>
        <div className="flex gap-2">
          <span className="px-3 py-1 bg-emerald-950 border border-emerald-800 text-emerald-400 text-xs font-mono font-bold rounded-lg">
            SLA: 99.95% ONLINE
          </span>
        </div>
      </header>

      <Suspense fallback={<div className="text-slate-400">Loading Real-time Telemetry...</div>}>
        <SchoolMetricOverviewCard />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <LearnerLiveAttendanceGrid />
          </div>
          <div>
            <IncidentResponsePanel />
          </div>
        </div>
      </Suspense>
    </main>
  );
}`
  },
  {
    id: 2,
    title: 'NFC Gate Attendance Scanner & Sync Service',
    filename: 'src/services/nfc-attendance.service.ts',
    category: 'NFC Attendance Service',
    description: 'Handles high-speed NFC wearable tag taps at school entrance gates, generating instant attendance records and SMS parent check-in notifications.',
    code: `import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class NfcAttendanceService {
  private readonly logger = new Logger(NfcAttendanceService.name);

  constructor(private readonly eventEmitter: EventEmitter2) {}

  async processGateTap(imei: string, gateId: string) {
    this.logger.log(\`NFC GATE TAP: IMEI=\${imei}, Gate=\${gateId}\`);

    const record = {
      imei,
      gateId,
      timestamp: new Date().toISOString(),
      status: 'PRESENT_NFC',
    };

    // Emit event to Kafka / EventBus for immediate Parent App SMS / Push Relay
    this.eventEmitter.emit('learner.attendance.recorded', record);

    return record;
  }
}`
  },
  {
    id: 3,
    title: 'TanStack Query Learner Registry Hook',
    filename: 'src/hooks/useLearnersQuery.ts',
    category: 'TanStack Query Data Service',
    description: 'Optimized query hook with automatic background refetching and optimistic state updates for class rosters and medical alerts.',
    code: `import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchSchoolLearners, updateLearnerStatus } from '@/services/sap-api';

export function useLearnersQuery(schoolId: string) {
  return useQuery({
    queryKey: ['school-learners', schoolId],
    queryFn: () => fetchSchoolLearners(schoolId),
    staleTime: 1000 * 30, // 30 seconds
    refetchInterval: 1000 * 10, // Live poll every 10s
  });
}

export function useUpdateLearnerMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateLearnerStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['school-learners'] });
    },
  });
}`
  },
  {
    id: 4,
    title: 'Google Maps School Geofence & Bus Telemetry Layer',
    filename: 'src/components/tracking/SchoolGeofenceMap.tsx',
    category: 'WebSocket Live Map',
    description: 'Renders the official school polygon geofence, safe corridors, active bus markers, and learner wearable coordinates using Google Maps JS API.',
    code: `import React, { useEffect, useRef } from 'react';

export const SchoolGeofenceMap = ({ schoolPolygon, busLocations }: any) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const map = new google.maps.Map(mapRef.current, {
      center: { lat: -26.2384, lng: 27.9152 },
      zoom: 16,
      mapTypeId: 'hybrid',
    });

    // Draw School Geofence Polygon
    const geofence = new google.maps.Polygon({
      paths: schoolPolygon,
      strokeColor: '#06b6d4',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#06b6d4',
      fillOpacity: 0.15,
    });
    geofence.setMap(map);
  }, [schoolPolygon]);

  return <div ref={mapRef} className="w-full h-96 rounded-2xl overflow-hidden border border-slate-800" />;
};`
  }
];

// MANDATORY SAP RULES
export const CRITICAL_SAP_RULES = [
  { id: 1, title: 'Dashboard Load < 1.0 Second', ruleText: 'School Admin Portal loads cached learner rosters and safety metric cards in <1.0s.', badge: '<1.0s BOOT' },
  { id: 2, title: 'Sub-250ms Telemetry Sync Latency', ruleText: 'NFC gate taps and wearable GPS updates reflect on the principal dashboard in <250ms.', badge: '<250ms SYNC' },
  { id: 3, title: 'Instant Parent Notification Dispatch', ruleText: 'Late arrival or unannounced absence triggers instant automated SMS and Parent App push within 3.0s.', badge: 'INSTANT SMS' },
  { id: 4, title: '100% POPIA Compliant Medical Access', ruleText: 'Learner medical conditions and blood groups are restricted to authorized school health officers.', badge: 'POPIA SEC' },
  { id: 5, title: 'Exportable Reports (PDF / Excel / CSV)', ruleText: 'Daily attendance registers and monthly incident logs generate exportable signed PDFs in <5 seconds.', badge: 'PDF EXPORT' },
  { id: 6, title: 'Role-Based Access Control (RBAC)', ruleText: 'Principal, Deputy Principal, Admin Staff, and Teachers operate under strictly scoped privilege levels.', badge: 'STRICT RBAC' },
  { id: 7, title: 'Scholar Transport Bus Compliance Guard', ruleText: 'Bus speed violations or unauthorized route deviations trigger red flashing alerts on the Transport Coordinator view.', badge: 'BUS GUARD' },
  { id: 8, title: 'NFC & QR Gate Attendance Failover', ruleText: 'If cellular data drops, entrance gate NFC scanners cache attendance offline and auto-sync upon reconnect.', badge: 'NFC OFFLINE' },
  { id: 9, title: 'Authorized Pickup Verification System', ruleText: 'Learner early release requires photo ID verification against the digital guardian authorization list.', badge: 'PICKUP VERIFY' },
  { id: 10, title: 'Core Goal: Safe Learning Environment', ruleText: 'The SAP provides school leadership with total operational clarity to guarantee learner safety every day.', badge: 'SAFE SCHOOL' },
];
