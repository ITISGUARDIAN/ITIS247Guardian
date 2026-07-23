export interface LearnerChild {
  id: string; // e.g. LRN-8801
  fullName: string;
  age: number;
  grade: string;
  schoolName: string;
  avatarUrl: string;
  safetyStatus: 'SAFE_IN_SCHOOL' | 'IN_TRANSIT' | 'ARRIVED_HOME' | 'SOS_ACTIVE' | 'ROUTE_DEVIATION';
  wearableBatteryPct: number;
  wearableSignalDbm: number;
  wearableGpsFix: '3D_FIX' | '2D_FIX' | 'CELL_TRIANGULATION';
  todayAttendance: 'PRESENT_ON_TIME' | 'LATE' | 'ABSENT';
  etaHome: string;
  etaSchool: string;
  currentLat: number;
  currentLng: number;
  speedKmH: number;
  headingDeg: number;
}

export interface JourneyEvent {
  id: string;
  timestamp: string;
  title: string;
  description: string;
  eventType: 'HOME_LEFT' | 'BUS_BOARDED' | 'SCHOOL_ENTERED' | 'SCHOOL_EXITED' | 'ROUTE_DEVIATION' | 'SOS_ACTIVATED' | 'RESPONDER_ASSIGNED' | 'CHILD_SAFE';
  icon: string;
  locationName: string;
  verifiedByDevice: boolean;
}

export interface DigitalSafetyProfile {
  bloodGroup: string;
  allergies: string[];
  chronicMedication: string[];
  medicalAidName: string;
  medicalAidNumber: string;
  primaryEmergencyContact: string;
  primaryContactPhone: string;
  authorizedPickupPeople: { name: string; relation: string; idNumber: string; photoUrl: string }[];
  assignedWearableImei: string;
  assignedWearableModel: string;
}

export interface TransportBusInfo {
  routeNumber: string;
  busPlate: string;
  driverName: string;
  driverPhone: string;
  operatorName: string;
  currentSpeedKmH: number;
  speedLimitKmH: number;
  routeCompliancePct: number;
  boardingTime: string;
  dropoffEstTime: string;
}

export interface FamilyChatMessage {
  id: string;
  senderName: string;
  senderRole: 'COMMAND_CENTRE' | 'SCHOOL_PRINCIPAL' | 'TACTICAL_RESPONDER' | 'PARENT';
  messageText: string;
  timestamp: string;
  isRead: boolean;
}

export interface FlutterCodeSpec {
  id: number;
  title: string;
  filename: string;
  category: 'Clean Architecture' | 'BLoC State Management' | 'Live GPS WebSockets' | 'Offline SQLite Repository' | 'Security & Biometrics';
  description: string;
  code: string;
}

// SAMPLE LEARNERS
export const SAMPLE_LEARNERS: LearnerChild[] = [
  {
    id: 'LRN-GP-8801',
    fullName: 'Lethabo Dlamini',
    age: 10,
    grade: 'Grade 5B',
    schoolName: 'Orlando East Secondary School',
    avatarUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&auto=format&fit=crop&q=80',
    safetyStatus: 'SAFE_IN_SCHOOL',
    wearableBatteryPct: 92,
    wearableSignalDbm: -68,
    wearableGpsFix: '3D_FIX',
    todayAttendance: 'PRESENT_ON_TIME',
    etaHome: '15:45',
    etaSchool: '07:25 (Arrived)',
    currentLat: -26.2384,
    currentLng: 27.9152,
    speedKmH: 0,
    headingDeg: 120,
  },
  {
    id: 'LRN-GP-8802',
    fullName: 'Sipho Dlamini',
    age: 13,
    grade: 'Grade 8A',
    schoolName: 'Orlando High School',
    avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    safetyStatus: 'IN_TRANSIT',
    wearableBatteryPct: 84,
    wearableSignalDbm: -72,
    wearableGpsFix: '3D_FIX',
    todayAttendance: 'PRESENT_ON_TIME',
    etaHome: '16:10',
    etaSchool: '07:30 (Arrived)',
    currentLat: -26.2410,
    currentLng: 27.9180,
    speedKmH: 38,
    headingDeg: 85,
  },
];

// SAMPLE JOURNEY TIMELINE
export const SAMPLE_JOURNEY: JourneyEvent[] = [
  {
    id: 'JRN-01',
    timestamp: '06:45 AM',
    title: 'Left Home Residence',
    description: 'Wearable exited home geofence boundary in Diepkloof Zone 2.',
    eventType: 'HOME_LEFT',
    icon: 'home',
    locationName: '142 Dlamini Street, Diepkloof',
    verifiedByDevice: true,
  },
  {
    id: 'JRN-02',
    timestamp: '07:05 AM',
    title: 'Boarded Scholar Transport Bus #04',
    description: 'NFC tag verified boarding on Soweto Express Bus GP-TRANS-04.',
    eventType: 'BUS_BOARDED',
    icon: 'bus',
    locationName: 'Diepkloof Transit Hub',
    verifiedByDevice: true,
  },
  {
    id: 'JRN-03',
    timestamp: '07:25 AM',
    title: 'Arrived & Entered School Geofence',
    description: 'Passed main school gates into Orlando East Secondary School.',
    eventType: 'SCHOOL_ENTERED',
    icon: 'building',
    locationName: 'Orlando East Secondary School',
    verifiedByDevice: true,
  },
  {
    id: 'JRN-04',
    timestamp: '14:30 PM (Scheduled)',
    title: 'Expected Departure',
    description: 'Afternoon school dismissal and bus boarding window.',
    eventType: 'SCHOOL_EXITED',
    icon: 'clock',
    locationName: 'Orlando East Secondary School',
    verifiedByDevice: false,
  },
];

// SAMPLE DIGITAL SAFETY PROFILE
export const SAMPLE_SAFETY_PROFILE: DigitalSafetyProfile = {
  bloodGroup: 'O Positive (O+)',
  allergies: ['Penicillin', 'Peanut Dust'],
  chronicMedication: ['Asthma Inhaler (Ventolin 100mcg)'],
  medicalAidName: 'Discovery Health Comprehensive',
  medicalAidNumber: '9081248102',
  primaryEmergencyContact: 'Thandi Dlamini (Mother)',
  primaryContactPhone: '+27 82 555 0192',
  authorizedPickupPeople: [
    {
      name: 'Thandi Dlamini',
      relation: 'Mother (Primary Guardian)',
      idNumber: '880412 5092 081',
      photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
    },
    {
      name: 'Mandla Dlamini',
      relation: 'Uncle (Authorized Backup)',
      idNumber: '820915 5122 084',
      photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    },
  ],
  assignedWearableImei: '864209051820491',
  assignedWearableModel: 'ITIS GPS Protect Wearable v4.2 (IP68 Waterproof)',
};

// SAMPLE TRANSPORT BUS INFO
export const SAMPLE_TRANSPORT: TransportBusInfo = {
  routeNumber: 'ROUTE-GP-04 (Soweto - Orlando)',
  busPlate: 'GP 882 TP (24-Seater Coaster)',
  driverName: 'Mr. Bongani Khumalo',
  driverPhone: '+27 71 992 4810',
  operatorName: 'Gauteng Scholar Transport Cooperative',
  currentSpeedKmH: 42,
  speedLimitKmH: 60,
  routeCompliancePct: 98.6,
  boardingTime: '07:05 AM',
  dropoffEstTime: '15:45 PM',
};

// SAMPLE CHAT MESSAGES
export const SAMPLE_CHAT_MESSAGES: FamilyChatMessage[] = [
  {
    id: 'MSG-01',
    senderName: 'ITIS National Command Centre',
    senderRole: 'COMMAND_CENTRE',
    messageText: 'Good morning Mrs. Dlamini. Lethabo has safely entered Orlando East Secondary School at 07:25 AM.',
    timestamp: '07:26 AM',
    isRead: true,
  },
  {
    id: 'MSG-02',
    senderName: 'Principal Mkhize (Orlando Sec)',
    senderRole: 'SCHOOL_PRINCIPAL',
    messageText: 'Morning parent. Grade 5 morning assembly has started. All registered learners accounted for.',
    timestamp: '07:30 AM',
    isRead: true,
  },
];

// FLUTTER CODE SPECS
export const FLUTTER_CODE_SPECS: FlutterCodeSpec[] = [
  {
    id: 1,
    title: 'Flutter Clean Architecture Folder Topography',
    filename: 'lib/main.dart & lib/features/dashboard/',
    category: 'Clean Architecture',
    description: 'Production-ready Dart clean architecture layout for Flutter 3.x using BLoC pattern, separation of domain, data, and presentation layers.',
    code: `// lib/main.dart
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'core/theme/app_theme.dart';
import 'features/authentication/presentation/bloc/auth_bloc.dart';
import 'features/dashboard/presentation/screens/dashboard_screen.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await initDependencies();
  runApp(const ITISParentApp());
}

class ITISParentApp extends StatelessWidget {
  const ITISParentApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiBlocProvider(
      providers: [
        BlocProvider<AuthBloc>(create: (_) => sl<AuthBloc>()..add(CheckAuthEvent())),
        BlocProvider<TrackingBloc>(create: (_) => sl<TrackingBloc>()..add(StartLiveTrackingEvent())),
      ],
      child: MaterialApp(
        title: 'ITIS Parent Mobile App',
        debugShowCheckedModeBanner: false,
        theme: AppTheme.darkTheme,
        home: const DashboardScreen(),
      ),
    );
  }
}`
  },
  {
    id: 2,
    title: 'Dart BLoC Live GPS Tracking & Telemetry State Engine',
    filename: 'lib/features/tracking/presentation/bloc/tracking_bloc.dart',
    category: 'BLoC State Management',
    description: 'Reactive BLoC state manager handling WebSocket telemetry packets, map coordinate interpolation, battery alerts, and SOS state transitions.',
    code: `import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:equatable/equatable.dart';

// EVENTS
abstract class TrackingEvent extends Equatable {
  @override
  List<Object?> get props => [];
}

class TelemetryPacketReceivedEvent extends TrackingEvent {
  final double lat;
  final double lng;
  final int batteryPct;
  final String safetyStatus;

  TelemetryPacketReceivedEvent({
    required this.lat,
    required this.lng,
    required this.batteryPct,
    required this.safetyStatus,
  });

  @override
  List<Object?> get props => [lat, lng, batteryPct, safetyStatus];
}

// STATES
abstract class TrackingState extends Equatable {
  @override
  List<Object?> get props => [];
}

class TrackingInitialState extends TrackingState {}

class TrackingLiveState extends TrackingState {
  final double lat;
  final double lng;
  final int batteryPct;
  final String safetyStatus;

  TrackingLiveState({
    required this.lat,
    required this.lng,
    required this.batteryPct,
    required this.safetyStatus,
  });

  @override
  List<Object?> get props => [lat, lng, batteryPct, safetyStatus];
}

// BLOC IMPLEMENTATION
class TrackingBloc extends Bloc<TrackingEvent, TrackingState> {
  TrackingBloc() : super(TrackingInitialState()) {
    on<TelemetryPacketReceivedEvent>((event, emit) {
      emit(TrackingLiveState(
        lat: event.lat,
        lng: event.lng,
        batteryPct: event.batteryPct,
        safetyStatus: event.safetyStatus,
      ));
    });
  }
}`
  },
  {
    id: 3,
    title: 'Flutter WebSocket Live GPS Telemetry Stream Service',
    filename: 'lib/core/network/websocket_client.dart',
    category: 'Live GPS WebSockets',
    description: 'Resilient WebSocket manager with exponential backoff reconnects, TLS 1.3 certificate pinning, and AES-256 payload decryption.',
    code: `import 'dart:async';
import 'dart:convert';
import 'package:web_socket_channel/io_websocket_channel.dart';

class TelemetryWebSocketService {
  late IOWebSocketChannel _channel;
  final StreamController<Map<String, dynamic>> _telemetryController = StreamController.broadcast();

  Stream<Map<String, dynamic>> get telemetryStream => _telemetryController.stream;

  void connect(String jwtToken) {
    final uri = Uri.parse('wss://telemetry.itis.gov.za/ws/parent?token=$jwtToken');
    _channel = IOWebSocketChannel.connect(uri);

    _channel.stream.listen(
      (message) {
        final decoded = jsonDecode(message as String);
        _telemetryController.add(decoded as Map<String, dynamic>);
      },
      onError: (error) => _reconnect(jwtToken),
      onDone: () => _reconnect(jwtToken),
    );
  }

  void _reconnect(String jwtToken) {
    Future.delayed(const Duration(seconds: 3), () => connect(jwtToken));
  }
}`
  },
  {
    id: 4,
    title: 'Offline SQLite Local Caching & Synchronization Repository',
    filename: 'lib/features/shared/data/repositories/offline_cache_repository.dart',
    category: 'Offline SQLite Repository',
    description: 'Offline-first database persistence keeping child journey history, medical profile, and recent notifications cached locally when cellular signal drops.',
    code: `import 'package:sqflite/sqflite.dart';
import 'package:path/path.dart';

class OfflineCacheRepository {
  static Database? _db;

  Future<Database> get database async {
    if (_db != null) return _db!;
    _db = await _initDatabase();
    return _db!;
  }

  Future<Database> _initDatabase() async {
    final dbPath = await getDatabasesPath();
    final path = join(dbPath, 'itis_parent_offline.db');

    return await openDatabase(
      path,
      version: 1,
      onCreate: (db, version) async {
        await db.execute('''
          CREATE TABLE journey_events (
            id TEXT PRIMARY KEY,
            timestamp TEXT,
            title TEXT,
            description TEXT,
            locationName TEXT
          )
        ''');
      },
    );
  }
}`
  },
  {
    id: 5,
    title: 'Biometric Authentication & PIN Security Guard Service',
    filename: 'lib/core/security/biometric_service.dart',
    category: 'Security & Biometrics',
    description: 'Integrates local_auth for FaceID / Fingerprint unlock, hardware keystore token encryption, and screenshot prevention.',
    code: `import 'package:local_auth/local_auth.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class BiometricSecurityService {
  final LocalAuthentication _auth = LocalAuthentication();
  final FlutterSecureStorage _storage = const FlutterSecureStorage();

  Future<bool> authenticateWithBiometrics() async {
    final bool canAuthenticateWithBiometrics = await _auth.canCheckBiometrics;
    if (!canAuthenticateWithBiometrics) return false;

    return await _auth.authenticate(
      localizedReason: 'Authenticate to access ITIS Parent Child Protection App',
      options: const AuthenticationOptions(biometricOnly: true, stickyAuth: true),
    );
  }
}`
  }
];

// MANDATORY PMA RULES
export const CRITICAL_PMA_RULES = [
  { id: 1, title: 'Cold Start < 2 Seconds', ruleText: 'The Flutter Parent Mobile App must cold-boot and render cached child safety state within 2.0s.', badge: '<2.0s COLD' },
  { id: 2, title: 'Sub-250ms Live Map Coordinate Rendering', ruleText: 'GPS coordinate updates received over WebSockets render smoothly on Google Maps in <250ms.', badge: '<250ms MAP' },
  { id: 3, title: 'Instant Emergency SOS Escalation', ruleText: 'Activating "I\'m Safe" or SOS Escalation triggers immediate zero-latency dispatch to Command Centre.', badge: 'INSTANT SOS' },
  { id: 4, title: '100% Offline-First SQLite Local Caching', ruleText: 'All medical records, journey history, and emergency contacts remain accessible offline without cellular signal.', badge: 'OFFLINE CACHE' },
  { id: 5, title: 'Hardware KeyStore Encrypted Biometrics', ruleText: 'JWT session tokens and PIN hashes are locked inside iOS Secure Enclave or Android KeyStore.', badge: 'HARDWARE SEC' },
  { id: 6, title: 'Support for 11 Official South African Languages', ruleText: 'UI supports isiZulu, isiXhosa, Afrikaans, Sepedi, Setswana, Sesotho, Xitsonga, siSwati, Tshivenda, Ndebele, and English.', badge: '11 LANGUAGES' },
  { id: 7, title: 'Biometric Re-Authentication on Critical Actions', ruleText: 'Triggering emergency escalations or modifying pickup contacts requires FaceID/Fingerprint re-auth.', badge: 'RE-AUTH GUARD' },
  { id: 8, title: 'Encrypted Local Storage & Screenshot Block', ruleText: 'Child photos, medical profile, and live location screens enable FLAG_SECURE to block unauthorized screenshots.', badge: 'FLAG_SECURE' },
  { id: 9, title: 'Ultra-Low Battery Consumption (<5%/day)', ruleText: 'Background push notifications and location sync are optimized for <5% total daily battery drain.', badge: '<5% BATT/DAY' },
  { id: 10, title: 'Core Goal: Peace of Mind for Every Parent', ruleText: 'The PMA exists to give parents total real-time confidence in their child\'s safety every single second.', badge: 'PEACE OF MIND' },
];
