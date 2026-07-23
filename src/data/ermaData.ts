export interface TacticalDispatch {
  id: string; // e.g. DISPATCH-SAPS-9910
  priorityLevel: 'PRIORITY_1_CRITICAL' | 'PRIORITY_2_HIGH' | 'PRIORITY_3_MEDIUM' | 'PRIORITY_4_LOW';
  threatLevel: 'EXTREME_RED' | 'ELEVATED_ORANGE' | 'MODERATE_YELLOW';
  incidentType: 'PANIC_SOS' | 'WEARABLE_TAMPER' | 'GEOFENCE_BREACH' | 'UNAUTHORIZED_PICKUP';
  assignedAgency: 'SAPS_SOWETO_SPECIAL_UNITS' | 'METRO_POLICE_JMPD' | 'PRIVATE_SECURITY_FIDELITY' | 'EMS_PARAMEDICS';
  slaCountdownSeconds: number;
  distanceKm: number;
  etaMinutes: number;
  learnerName: string;
  learnerAge: number;
  gradeClass: string;
  photoUrl: string;
  locationName: string;
  currentLat: number;
  currentLng: number;
  wearableBatteryPct: number;
  wearableSignalDbm: number;
  status: 'DISPATCH_QUEUED' | 'ACCEPTED' | 'EN_ROUTE' | 'ON_SCENE' | 'CHILD_LOCATED' | 'CHILD_SAFE' | 'MISSION_COMPLETE';
  operatorNotes: string;
  decisionEngineSummary: string;
}

export interface ResponderUnitProfile {
  unitCallsign: string; // e.g. ALPHA-31
  officerName: string;
  agencyName: string;
  badgeNumber: string;
  vehicleRegistration: string;
  currentLat: number;
  currentLng: number;
  biometricAuthenticated: boolean;
  activeMissionsCompletedToday: number;
  avgResponseTimeMin: number;
}

export interface MedicalEmergencyInfo {
  bloodGroup: string;
  allergies: string[];
  chronicConditions: string[];
  medications: string[];
  medicalAidName: string;
  medicalAidNumber: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
}

export interface EvidenceRecord {
  id: string;
  timestamp: string;
  photoUrl: string;
  sha256Hash: string;
  gpsCoordinate: string;
  officerId: string;
  note: string;
}

export interface ErmaCodeSpec {
  id: number;
  title: string;
  filename: string;
  category: 'Flutter Clean Architecture' | 'BLoC Tactical Navigation' | 'Evidence Chain of Custody' | 'WebSocket & SQLite Cache';
  description: string;
  code: string;
}

// SAMPLE DISPATCHES
export const SAMPLE_DISPATCHES: TacticalDispatch[] = [
  {
    id: 'DISPATCH-SAPS-9910',
    priorityLevel: 'PRIORITY_1_CRITICAL',
    threatLevel: 'EXTREME_RED',
    incidentType: 'PANIC_SOS',
    assignedAgency: 'SAPS_SOWETO_SPECIAL_UNITS',
    slaCountdownSeconds: 240,
    distanceKm: 1.8,
    etaMinutes: 3,
    learnerName: 'Bongani Ndlovu',
    learnerAge: 14,
    gradeClass: 'Grade 9B',
    photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    locationName: 'Soweto Expressway Intersection (Near North Gate)',
    currentLat: -26.2392,
    currentLng: 27.9168,
    wearableBatteryPct: 88,
    wearableSignalDbm: -72,
    status: 'DISPATCH_QUEUED',
    operatorNotes: 'Panic button held for 3.5 seconds. Rapid acceleration detected away from school geofence corridor.',
    decisionEngineSummary: 'CRITICAL THREAT: Combined Panic SOS + Sudden Geofence Breach. Threat score 98/100. Dispatched SAPS Alpha Unit.',
  },
  {
    id: 'DISPATCH-JMPD-9912',
    priorityLevel: 'PRIORITY_2_HIGH',
    threatLevel: 'ELEVATED_ORANGE',
    incidentType: 'WEARABLE_TAMPER',
    assignedAgency: 'METRO_POLICE_JMPD',
    slaCountdownSeconds: 520,
    distanceKm: 3.4,
    etaMinutes: 6,
    learnerName: 'Lethabo Dlamini',
    learnerAge: 11,
    gradeClass: 'Grade 5B',
    photoUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    locationName: 'Orlando East Bus Stop Bay #3',
    currentLat: -26.2361,
    currentLng: 27.9135,
    wearableBatteryPct: 92,
    wearableSignalDbm: -68,
    status: 'ACCEPTED',
    operatorNotes: 'Strap tamper capacitive loop severed. Vehicle stationary.',
    decisionEngineSummary: 'ELEVATED ALERT: Wearable hardware tamper sensor triggered. JMPD Sector 4 unit responding.',
  },
];

// RESPONDER PROFILE
export const SAMPLE_RESPONDER: ResponderUnitProfile = {
  unitCallsign: 'TACTICAL-SAPS-ALPHA-01',
  officerName: 'Captain Thabo Khumalo',
  agencyName: 'South African Police Service (SAPS Soweto Cluster)',
  badgeNumber: 'SAPS-882910',
  vehicleRegistration: 'GP 442 SP - SAPS Highway Patrol',
  currentLat: -26.2384,
  currentLng: 27.9152,
  biometricAuthenticated: true,
  activeMissionsCompletedToday: 4,
  avgResponseTimeMin: 4.2,
};

// MEDICAL INFO
export const SAMPLE_MEDICAL_INFO: MedicalEmergencyInfo = {
  bloodGroup: 'O-Negative (Universal Donor)',
  allergies: ['Penicillin', 'Peanuts'],
  chronicConditions: ['Asthma (Requires Ventolin Inhaler)'],
  medications: ['Salbutamol 100mcg'],
  medicalAidName: 'Discovery Health Comprehensive',
  medicalAidNumber: '90218840192',
  emergencyContactName: 'Thandi Dlamini (Mother)',
  emergencyContactPhone: '+27 82 555 0192',
};

// INITIAL EVIDENCE
export const SAMPLE_EVIDENCE: EvidenceRecord[] = [
  {
    id: 'EVID-9901',
    timestamp: '10:14:22 AM',
    photoUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=300&auto=format&fit=crop&q=80',
    sha256Hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    gpsCoordinate: '-26.2392, 27.9168',
    officerId: 'SAPS-882910',
    note: 'Recovered wearable device strap fragment at North Gate perimeter wall.',
  },
];

// CODE SPECS
export const ERMA_CODE_SPECS: ErmaCodeSpec[] = [
  {
    id: 1,
    title: 'Flutter BLoC Mission Dispatch State Machine',
    filename: 'lib/features/dispatch/bloc/dispatch_bloc.dart',
    category: 'Flutter Clean Architecture',
    description: 'Enforces strict mission lifecycle transitions (Queued -> Accepted -> En Route -> On Scene -> Child Safe -> Complete) with WebSocket sync.',
    code: `import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:equatable/equatable.dart';

abstract class DispatchEvent extends Equatable {
  @override
  List<Object?> get props => [];
}

class AcceptMissionEvent extends DispatchEvent {
  final String dispatchId;
  AcceptMissionEvent(this.dispatchId);
}

class UpdateMissionStatusEvent extends DispatchEvent {
  final String dispatchId;
  final String newStatus;
  UpdateMissionStatusEvent(this.dispatchId, this.newStatus);
}

abstract class DispatchState extends Equatable {}

class DispatchInitialState extends DispatchState {
  @override
  List<Object?> get props => [];
}

class DispatchActiveState extends DispatchState {
  final String dispatchId;
  final String currentStatus;
  final double currentLat;
  final double currentLng;

  DispatchActiveState({
    required this.dispatchId,
    required this.currentStatus,
    required this.currentLat,
    required this.currentLng,
  });

  @override
  List<Object?> get props => [dispatchId, currentStatus, currentLat, currentLng];
}`
  },
  {
    id: 2,
    title: 'Google Maps Tactical Rerouting Service',
    filename: 'lib/features/navigation/services/tactical_navigation_service.dart',
    category: 'BLoC Tactical Navigation',
    description: 'Computes real-time dynamic traffic rerouting, safe corridor highlights, and tactical responder ETA calculation.',
    code: `import 'package:google_maps_flutter/google_maps_flutter.dart';

class TacticalNavigationService {
  Future<Polyline> calculateSafeCorridorRoute({
    required LatLng responderLocation,
    required LatLng learnerTarget,
  }) async {
    // Queries ITIS Telemetry Engine for traffic-optimized emergency routing
    final points = await _fetchTacticalWaypoints(responderLocation, learnerTarget);

    return Polyline(
      polylineId: PolylineId('safe_corridor_route'),
      color: const Color(0xFF06B6D4), // Cyan 500
      width: 5,
      points: points,
    );
  }

  Future<List<LatLng>> _fetchTacticalWaypoints(LatLng start, LatLng end) async {
    return [start, LatLng((start.latitude + end.latitude)/2, (start.longitude + end.longitude)/2), end];
  }
}`
  },
  {
    id: 3,
    title: 'Digital Forensics SHA-256 Photo & Evidence Signer',
    filename: 'lib/features/evidence/data/evidence_repository.dart',
    category: 'Evidence Chain of Custody',
    description: 'Generates SHA-256 cryptographic hashes for photos taken on-scene, embedding GPS metadata and officer biometric signatures.',
    code: `import 'dart:convert';
import 'package:crypto/crypto.dart';

class EvidenceSigner {
  static Future<Map<String, dynamic>> signEvidence({
    required List<int> imageBytes,
    required String gpsCoordinates,
    required String officerBadgeId,
  }) async {
    final digest = sha256.convert(imageBytes);
    final timestamp = DateTime.now().toUtc().toIso8601String();

    return {
      'sha256Hash': digest.toString(),
      'timestamp': timestamp,
      'gps': gpsCoordinates,
      'officerId': officerBadgeId,
      'chainOfCustodyVerified': true,
    };
  }
}`
  }
];

// CRITICAL ERMA RULES
export const CRITICAL_ERMA_RULES = [
  { id: 1, title: 'Sub-2.0s Dispatch Notification Display', ruleText: 'Priority 1 SOS alerts arrive on responder handset and ring loudly in <2.0s via FCM high-priority channel.', badge: '<2.0s DISPATCH' },
  { id: 2, title: 'Sub-250ms Live GPS Marker Refresh', ruleText: 'Learner wearable movement and tactical responder location refresh on map in <250ms.', badge: '<250ms GPS' },
  { id: 3, title: 'POPIA Compliant Role-Scoped Medical Access', ruleText: 'Medical info (allergies, blood group) is strictly decrypted only during an active accepted mission.', badge: 'POPIA DECRYPT' },
  { id: 4, title: 'Strict Lifecycle State Machine Enforcement', ruleText: 'Missions cannot be marked complete without explicit transitions through On Scene and Child Safe states.', badge: 'STRICT LFC' },
  { id: 5, title: 'SHA-256 Cryptographic Chain of Custody', ruleText: 'All on-scene evidence photos are hashed immediately with SHA-256, timestamp, and officer GPS coordinates.', badge: 'SHA-256 FORENSIC' },
  { id: 6, title: 'Biometric Unlock & Anti-Tamper Protection', ruleText: 'Application requires fingerprint/FaceID unlock. Screenshotting and screen recording are disabled at OS level.', badge: 'BIOMETRIC SEC' },
  { id: 7, title: 'Offline SQLite Map & Medical Caching', ruleText: 'If cellular coverage drops in rural sectors, offline vector maps and learner profile cache allow continuous operation.', badge: 'OFFLINE SQLITE' },
  { id: 8, title: 'Multi-Agency Team Encrypted Interop Chat', ruleText: 'SAPS, JMPD, and Private Security responders communicate via encrypted voice notes and real-time chat.', badge: 'INTEROP CHAT' },
  { id: 9, title: '11 South African Languages Voice Guidance', ruleText: 'Navigation and mission status updates support turn-by-turn audio alerts in 11 official SA languages.', badge: '11 SA LANG' },
  { id: 10, title: 'Core Mission: Save Learner Lives', ruleText: 'ERMA provides tactical responders with high-precision intelligence to locate and secure learners swiftly.', badge: 'LIFE SAFETY' },
];
