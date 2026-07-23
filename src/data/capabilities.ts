import { Level1Domain, VisionPhase } from '../types/capability';

export const VISION_PHASES: VisionPhase[] = [
  {
    phase: 'Phase 1',
    title: 'Gauteng Pilot',
    targetScope: 'Gauteng Schools & Scholar Transport Fleets',
    timeline: '2026 - 2027',
    keyMilestones: [
      'Onboard 150 Public & Private Schools in Gauteng',
      'Deploy 2,500 IoT GPS wearables for high-risk learners',
      'Integrate 400 Scholar Transport Vehicles',
      'Establish Johannesburg & Pretoria Command Hubs',
      'Implement SAPS & Emergency Medical Service (EMS) Direct Dispatch API'
    ]
  },
  {
    phase: 'Phase 2',
    title: 'South Africa National Rollout',
    targetScope: '9 Provinces - Public, Private & Municipal Fleets',
    timeline: '2028 - 2030',
    keyMilestones: [
      'Scale to 12,000 Schools nationally across South Africa',
      'Integrate Department of Basic Education (DBE) Learner Database',
      'Onboard Municipal Transport & Fleet Operators',
      'Deploy AI Camera Telematics for Driver Fatigue & Distraction Detection',
      'National Emergency Grid Integration with Provincial SAPS Command'
    ]
  },
  {
    phase: 'Phase 3',
    title: 'SADC Regional Expansion',
    targetScope: 'Cross-Border Logistics, Regional Transport Corridors',
    timeline: '2031 - 2035',
    keyMilestones: [
      'Extend tracking across SADC Transport Corridors (SADC Corridor Grid)',
      'Cross-border customs & transport compliance integration',
      'Multi-currency billing & international roaming SIM telemetry',
      'Cross-border Emergency Mutual Assistance Protocols',
      'Regional Mobility Intelligence Platform for Southern Africa'
    ]
  }
];

export const CAPABILITY_DOMAINS: Level1Domain[] = [
  // --- CORE OPERATIONS ---
  {
    id: 'school-mgmt',
    name: 'School Management',
    code: 'DOM-SCH',
    category: 'Core Operations',
    description: 'School onboarding, learner roster management, route assignment, and academic calendar integration.',
    iconName: 'School',
    capabilities: [
      {
        id: 'sch-cap-1',
        code: 'CAP-SCH-01',
        name: 'Institutional Administration',
        description: 'Multi-tenant school profile, campus geofencing, and academic schedule management.',
        services: [
          {
            id: 'srv-sch-01',
            name: 'Campus Directory & Geofence Service',
            description: 'Maintains polygon boundaries of school property and pickup/dropoff zones.',
            softwareModules: ['SchoolMgmtModule', 'GeofenceEngineModule', 'RosterSyncModule'],
            details: {
              id: 'det-sch-01',
              name: 'Campus Directory & Polygon Boundaries',
              purpose: 'Provide high-precision spatial boundaries and organizational metadata for educational institutions.',
              businessValue: 'Enables automated arrival/departure detection and prevents unauthorized learner drops.',
              primaryUsers: ['School Administrator', 'ITIS Operator', 'Super Administrator'],
              inputs: ['School Coordinates', 'Cadastral Boundaries', 'Operating Hours', 'Contact Profiles'],
              outputs: ['Spatial Geofence Layer', 'Campus Status Feed', 'Zone Entry/Exit Triggers'],
              dependencies: ['GIS Engine Service', 'Database Cluster', 'RBAC Module'],
              futureExpansion: 'Automated satellite imagery ingestion for boundary auto-detection in Phase 2.'
            }
          }
        ]
      }
    ]
  },
  {
    id: 'learner-safety',
    name: 'Learner Safety',
    code: 'DOM-SAF',
    category: 'Safety & Emergency',
    description: 'Real-time learner presence verification, NFC/RFID scanning, and automated parent notifications.',
    iconName: 'ShieldCheck',
    capabilities: [
      {
        id: 'saf-cap-1',
        code: 'CAP-SAF-01',
        name: 'Learner Telemetry & Boarding Verification',
        description: 'Biometric and RFID-based student boarding, deboarding, and missing learner alerts.',
        services: [
          {
            id: 'srv-saf-01',
            name: 'Passenger Verification & Boarding Service',
            description: 'Validates learner identity during bus boarding via wearable or NFC tags.',
            softwareModules: ['BoardingVerificationModule', 'NFCScanModule', 'LearnerAlertModule'],
            details: {
              id: 'det-saf-01',
              name: 'Boarding & Deboarding Telemetry',
              purpose: 'Ensure every learner boards the correct vehicle and exits at designated stops.',
              businessValue: 'Eliminates lost child incidents and provides instant accountability to parents and schools.',
              primaryUsers: ['Learner', 'Driver', 'Teacher', 'Parent'],
              inputs: ['RFID Tag UID', 'GPS Telemetry', 'Vehicle ID', 'Passenger Roster'],
              outputs: ['Boarding Log Event', 'Parent Push Notification', 'Unaccounted Learner Alert'],
              dependencies: ['GPS Tracking Domain', 'Parent Engagement Domain', 'Attendance Domain'],
              futureExpansion: 'Facial recognition camera verification at bus doors during Phase 2 national rollout.'
            }
          }
        ]
      }
    ]
  },
  {
    id: 'fleet-mgmt',
    name: 'Fleet Management',
    code: 'DOM-FLT',
    category: 'Core Operations',
    description: 'Vehicle registry, roadworthiness verification, license tracking, and maintenance scheduling.',
    iconName: 'Bus',
    capabilities: [
      {
        id: 'flt-cap-1',
        code: 'CAP-FLT-01',
        name: 'Vehicle Lifecycle & Maintenance',
        description: 'Asset health monitoring, operating certificates, and routine service alerts.',
        services: [
          {
            id: 'srv-flt-01',
            name: 'Roadworthiness & Compliance Service',
            description: 'Monitors vehicle inspection status, disc renewals, and mechanical diagnostic alerts.',
            softwareModules: ['FleetRegistryModule', 'MaintenanceEngineModule', 'ComplianceCheckModule'],
            details: {
              id: 'det-flt-01',
              name: 'Vehicle Health & Certification',
              purpose: 'Guarantee only safe, roadworthy transport vehicles carry learners.',
              businessValue: 'Prevents mechanical breakdowns and enforces strict transport regulations.',
              primaryUsers: ['Fleet Owner', 'ITIS Operator', 'Compliance Inspector'],
              inputs: ['Vehicle VIN', 'License Disc Expiry', 'Odometer Reading', 'CANbus Diagnostics'],
              outputs: ['Compliance Certificate Status', 'Maintenance Due Alert', 'Grounding Order'],
              dependencies: ['Driver Management Domain', 'Inventory Domain'],
              futureExpansion: 'IoT OBD-II engine telemetry streaming directly into predictive maintenance AI models.'
            }
          }
        ]
      }
    ]
  },
  {
    id: 'gps-tracking',
    name: 'GPS Tracking',
    code: 'DOM-GPS',
    category: 'Core Operations',
    description: 'High-frequency telemetry ingestion, sub-second position streaming, map rendering, and geofence evaluation.',
    iconName: 'Navigation',
    capabilities: [
      {
        id: 'gps-cap-1',
        code: 'CAP-GPS-01',
        name: 'Real-Time Telemetry Pipeline',
        description: 'Ingests MQTT/TCP telemetry packets from vehicle trackers and learner wearables.',
        services: [
          {
            id: 'srv-gps-01',
            name: 'High-Velocity Position Ingestion Service',
            description: 'Processes up to 50,000 telemetry packets/sec with latency under 150ms.',
            softwareModules: ['TelemetryIngestModule', 'SpatialStreamProcessor', 'GeofenceEvaluator'],
            details: {
              id: 'det-gps-01',
              name: 'Sub-Second Vehicle & Wearable Position Processing',
              purpose: 'Provide precise live location coordinates across the entire tracking grid.',
              businessValue: 'Delivers real-time ETA accuracy and immediate speed/route violation detection.',
              primaryUsers: ['Command Centre Supervisor', 'Parent', 'School Administrator'],
              inputs: ['NMEA/GPRMC Packets', 'Cellular Triangulation', 'Speed', 'Heading'],
              outputs: ['Normalized Position Stream', 'Geofence Breached Alert', 'ETA Calculation'],
              dependencies: ['PostgreSQL/TimescaleDB', 'Google Maps Abstraction', 'Redis Cache'],
              futureExpansion: 'Dead reckoning algorithm for seamless underground and urban canyon tracking.'
            }
          }
        ]
      }
    ]
  },
  {
    id: 'driver-mgmt',
    name: 'Driver Management',
    code: 'DOM-DRV',
    category: 'Core Operations',
    description: 'Driver licensing, PrDP validation, driving behavior scoring, and fatigue monitoring.',
    iconName: 'UserCheck',
    capabilities: [
      {
        id: 'drv-cap-1',
        code: 'CAP-DRV-01',
        name: 'Driver Qualification & Behavior Analytics',
        description: 'Verifies professional driving permits (PrDP) and logs harsh braking/speeding.',
        services: [
          {
            id: 'srv-drv-01',
            name: 'Driver Credential & Behavior Service',
            description: 'Evaluates driver safety scores based on telematics data and duty hours.',
            softwareModules: ['DriverProfileModule', 'PrDPVerifierModule', 'BehaviorScoringEngine'],
            details: {
              id: 'det-drv-01',
              name: 'Driver Scoring & Shift Compliance',
              purpose: 'Ensure drivers are fully licensed, rested, and driving safely.',
              businessValue: 'Reduces road accident risk by over 80% through proactive behavior scoring.',
              primaryUsers: ['Driver', 'Fleet Owner', 'Command Centre Supervisor'],
              inputs: ['Driver License No', 'PrDP Expiry', 'Accelerometer Data', 'Shift Hours'],
              outputs: ['Safety Scorecard', 'Shift Lockout Order', 'PrDP Renewal Notice'],
              dependencies: ['GPS Tracking Domain', 'Compliance Domain'],
              futureExpansion: 'AI dashcam driver fatigue and distraction eye-tracking streaming.'
            }
          }
        ]
      }
    ]
  },
  {
    id: 'parent-engagement',
    name: 'Parent Engagement',
    code: 'DOM-PAR',
    category: 'Core Operations',
    description: 'Mobile parent application, live bus radar, instant trip status updates, and emergency alerts.',
    iconName: 'HeartHandshake',
    capabilities: [
      {
        id: 'par-cap-1',
        code: 'CAP-PAR-01',
        name: 'Parent Mobility Communications',
        description: 'Delivers real-time location streaming, ETA notifications, and direct SOS comms to parents.',
        services: [
          {
            id: 'srv-par-01',
            name: 'Parent Mobile Notification & Tracking Service',
            description: 'Provides live bus radar map view and proximity radius alerts (e.g. 1km from home).',
            softwareModules: ['ParentPortalModule', 'NotificationDispatcher', 'LiveBusRadarModule'],
            details: {
              id: 'det-par-01',
              name: 'Live Bus Radar & Mobile Alerts',
              purpose: 'Give parents complete peace of mind with live vehicle radar and arrival countdowns.',
              businessValue: 'Eliminates waiting in dangerous pickup spots and improves parent satisfaction.',
              primaryUsers: ['Parent', 'Learner'],
              inputs: ['Parent Device Token', 'Vehicle Geolocation', 'Proximity Rules'],
              outputs: ['Push Notification', 'Live Radar Canvas Data', 'Trip Summary Report'],
              dependencies: ['GPS Tracking Domain', 'Learner Safety Domain'],
              futureExpansion: 'Bi-directional voice chat with transport attendant during emergency situations.'
            }
          }
        ]
      }
    ]
  },
  {
    id: 'attendance',
    name: 'Attendance',
    code: 'DOM-ATT',
    category: 'Core Operations',
    description: 'Integrated transit and classroom attendance tracking with automatic absenteeism reconciliation.',
    iconName: 'ClipboardCheck',
    capabilities: [
      {
        id: 'att-cap-1',
        code: 'CAP-ATT-01',
        name: 'Automated Attendance Reconciliation',
        description: 'Cross-checks learner bus boarding logs against school gate and classroom roll calls.',
        services: [
          {
            id: 'srv-att-01',
            name: 'Transit vs Classroom Attendance Service',
            description: 'Identifies discrepancies when a learner boarded the bus but missed classroom roll call.',
            softwareModules: ['AttendanceSyncModule', 'DiscrepancyDetectorModule', 'ParentAbsenceNotifier'],
            details: {
              id: 'det-att-01',
              name: 'Multi-Point Attendance Verification',
              purpose: 'Ensure learners who board transport safely arrive in their designated classroom.',
              businessValue: 'Detects truancy or unrecorded missing child incidents within 10 minutes of school start.',
              primaryUsers: ['Teacher', 'School Administrator', 'Parent'],
              inputs: ['Bus Boarding Log', 'School Gate Scan', 'Teacher Classroom Roll Call'],
              outputs: ['Attendance Record', 'Unaccounted Learner Alarm', 'Absence Summary'],
              dependencies: ['Learner Safety Domain', 'School Management Domain'],
              futureExpansion: 'Direct integration with South African DBE SA-SAMS national attendance database.'
            }
          }
        ]
      }
    ]
  },
  {
    id: 'emergency-resp',
    name: 'Emergency Response',
    code: 'DOM-EMG',
    category: 'Safety & Emergency',
    description: 'Instant panic button orchestration, SAPS/EMS integration, armed response unit dispatch.',
    iconName: 'AlertTriangle',
    capabilities: [
      {
        id: 'emg-cap-1',
        code: 'CAP-EMG-01',
        name: 'High-Priority SOS Orchestration',
        description: 'Triggers multi-channel panic alarms, establishes live audio streams, and alerts emergency networks.',
        services: [
          {
            id: 'srv-emg-01',
            name: 'SOS Panic Signal Dispatch Service',
            description: 'Routes emergency triggers to command center controllers and nearest tactical responders within 3 seconds.',
            softwareModules: ['SOSHandlerModule', 'TacticalDispatchModule', 'EmergencyBroadcastModule'],
            details: {
              id: 'det-emg-01',
              name: 'Sub-3-Second Emergency Panic Pipeline',
              purpose: 'Provide immediate tactical and medical rescue during vehicle crashes, hijackings, or child distress.',
              businessValue: 'Drastically reduces emergency response times, saving lives during critical incidents.',
              primaryUsers: ['Command Centre Supervisor', 'Emergency Response Partner', 'Parent'],
              inputs: ['Panic Hardware Trigger', 'Driver Mobile SOS', 'Wearable Panic Button'],
              outputs: ['Emergency Incident Docket', 'Automated Dispatch Payload', 'Live Video/Audio Feed'],
              dependencies: ['Command Centre Domain', 'GPS Tracking Domain', 'Dispatch Domain'],
              futureExpansion: 'Direct API mesh with SAPS 10111 and Netcare 911 dispatch CAD systems.'
            }
          }
        ]
      }
    ]
  },
  {
    id: 'dispatch',
    name: 'Dispatch',
    code: 'DOM-DSP',
    category: 'Safety & Emergency',
    description: 'Automated allocation of nearest private armed response units and emergency medical vehicles.',
    iconName: 'Siren',
    capabilities: [
      {
        id: 'dsp-cap-1',
        code: 'CAP-DSP-01',
        name: 'Tactical Unit Allocation',
        description: 'Geospatial proximity search to dispatch closest security/EMS partner to active incidents.',
        services: [
          {
            id: 'srv-dsp-01',
            name: 'Responder Nearest-Match Dispatch Service',
            description: 'Calculates optimal responder unit based on traffic, distance, and unit capabilities.',
            softwareModules: ['ProximateDispatchEngine', 'ResponderAppInterface', 'TacticalRoutingModule'],
            details: {
              id: 'det-dsp-01',
              name: 'Geospatial Responder Allocation Engine',
              purpose: 'Ensure the fastest armed or medical response arrives at the exact vehicle/wearable location.',
              businessValue: 'Guarantees SLA response times under 8 minutes in urban centers.',
              primaryUsers: ['Command Centre Supervisor', 'Emergency Response Partner'],
              inputs: ['Incident Lat/Long', 'Responder GPS Stream', 'Unit Skill Matrix'],
              outputs: ['Dispatch Assignment', 'Turn-by-Turn Navigation Payload', 'ETA to Scene'],
              dependencies: ['Google Maps Abstraction', 'Emergency Response Domain'],
              futureExpansion: 'Autonomous drone response dispatch for aerial situational awareness.'
            }
          }
        ]
      }
    ]
  },
  {
    id: 'incident-mgmt',
    name: 'Incident Management',
    code: 'DOM-INC',
    category: 'Safety & Emergency',
    description: 'End-to-end incident ticketing, forensic logging, timeline creation, and post-incident escalation.',
    iconName: 'FileText',
    capabilities: [
      {
        id: 'inc-cap-1',
        code: 'CAP-INC-01',
        name: 'Incident Lifecycle & Docket Tracking',
        description: 'Captures tamper-evident audit trails of every action taken from panic trigger to resolution.',
        services: [
          {
            id: 'srv-inc-01',
            name: 'Forensic Incident Ticketing Service',
            description: 'Logs all operator notes, responder timestamps, audio recordings, and resolution reports.',
            softwareModules: ['IncidentDocketModule', 'TimelineRecorder', 'EvidentiaryExportModule'],
            details: {
              id: 'det-inc-01',
              name: 'Tamper-Evident Incident Documentation',
              purpose: 'Provide court-admissible forensic documentation for criminal investigation and insurance claims.',
              businessValue: 'Mitigates legal liability and ensures total operational transparency.',
              primaryUsers: ['Command Centre Supervisor', 'ITIS Operator', 'Cybersecurity Engineer'],
              inputs: ['SOS Event', 'Operator Log Notes', 'Audio Recordings', 'Police Docket No'],
              outputs: ['Cryptographically Sealed Docket', 'Insurance Incident Report', 'SAPS Evidence Bundle'],
              dependencies: ['Audit Domain', 'PostgreSQL Database', 'Cloud Object Storage'],
              futureExpansion: 'Automated AI speech-to-text transcription of call center emergency audio.'
            }
          }
        ]
      }
    ]
  },
  {
    id: 'command-centre',
    name: 'Command Centre',
    code: 'DOM-CMD',
    category: 'Safety & Emergency',
    description: 'Multi-monitor video wall dashboard, active incident queues, spatial threat overlay, and operator dispatch tools.',
    iconName: 'Activity',
    capabilities: [
      {
        id: 'cmd-cap-1',
        code: 'CAP-CMD-01',
        name: '24/7 Operations Monitoring Console',
        description: 'Centralized situational awareness interface for viewing thousands of active routes concurrently.',
        services: [
          {
            id: 'srv-cmd-01',
            name: 'Situational Map & Incident Queue Service',
            description: 'Renders heatmaps, speed alerts, off-route flags, and prioritizes urgent panic calls.',
            softwareModules: ['CommandWallController', 'IncidentPriorityQueue', 'OperatorWorkstationModule'],
            details: {
              id: 'det-cmd-01',
              name: 'Real-Time Spatial Operations Wall',
              purpose: 'Equip command center controllers with instant overview of high-risk vehicles and alerts.',
              businessValue: 'Enables a single controller to monitor up to 500 vehicles with automated exception flags.',
              primaryUsers: ['Command Centre Supervisor', 'ITIS Operator'],
              inputs: ['Telemetry Streams', 'System Alarms', 'CCTV Video Feeds', 'Weather Overlay'],
              outputs: ['Prioritized Alert Stream', 'Operator Action Prompt', 'Video Wall Canvas'],
              dependencies: ['GPS Tracking Domain', 'Emergency Response Domain', 'AI Intelligence Domain'],
              futureExpansion: 'Multi-region failover command wall supporting national military-grade operations.'
            }
          }
        ]
      }
    ]
  },
  {
    id: 'analytics',
    name: 'Analytics',
    code: 'DOM-ANL',
    category: 'Intelligence & Analytics',
    description: 'Safety trend analysis, transport efficiency metrics, accident hot-spot mapping, and fleet performance.',
    iconName: 'BarChart3',
    capabilities: [
      {
        id: 'anl-cap-1',
        code: 'CAP-ANL-01',
        name: 'Business Intelligence & Heatmaps',
        description: 'Transforms raw tracking and incident logs into actionable executive dashboards.',
        services: [
          {
            id: 'srv-anl-01',
            name: 'Geospatial Hazard & Efficiency Analytics Service',
            description: 'Generates spatial heatmaps of high-crime areas and frequent vehicle breakdown zones.',
            softwareModules: ['SpatialAnalyticsEngine', 'ReportGeneratorModule', 'FleetEfficiencyModule'],
            details: {
              id: 'det-anl-01',
              name: 'Regional Safety & Transport Analytics',
              purpose: 'Provide government and transport authorities with data to optimize route safety.',
              businessValue: 'Identifies dangerous road segments and optimizes fuel/route efficiency.',
              primaryUsers: ['Senior Product Manager', 'Fleet Owner', 'School Administrator'],
              inputs: ['Historical Telemetry', 'Incident Logs', 'Road Network Data'],
              outputs: ['Safety Scorecards', 'Dangerous Intersection Heatmaps', 'Carbon Footprint Report'],
              dependencies: ['PostgreSQL/TimescaleDB', 'Reporting Domain'],
              futureExpansion: 'Predictive traffic congestion and weather hazard modeling.'
            }
          }
        ]
      }
    ]
  },
  {
    id: 'ai-intelligence',
    name: 'AI Intelligence',
    code: 'DOM-AI',
    category: 'Intelligence & Analytics',
    description: 'Anomalous driving detection, predictive ETA models, pattern-of-life learning, and automated threat scoring.',
    iconName: 'Brain',
    capabilities: [
      {
        id: 'ai-cap-1',
        code: 'CAP-AI-01',
        name: 'Machine Learning Safety Engine',
        description: 'Continuously analyzes route deviations, unusual stopping behavior, and high-risk patterns.',
        services: [
          {
            id: 'srv-ai-01',
            name: 'Anomaly Detection & Threat Intelligence Service',
            description: 'Flags unscheduled stops or route deviations exceeding historical pattern baselines.',
            softwareModules: ['AnomalyDetectionMLModule', 'PredictiveETAModule', 'PatternOfLifeEngine'],
            details: {
              id: 'det-ai-01',
              name: 'Predictive Anomaly & Deviation Classifier',
              purpose: 'Detect potential hijackings or child abductions before an explicit panic button is pressed.',
              businessValue: 'Automates early warnings for subtle, suspicious route deviations.',
              primaryUsers: ['Artificial Intelligence Engineer', 'Command Centre Supervisor'],
              inputs: ['Historical Route Vectors', 'Driver Habit Metrics', 'Live Telemetry Stream'],
              outputs: ['Anomaly Risk Score (0-100)', 'Automated Flag Trigger', 'AI Recommended Action'],
              dependencies: ['Gemini API / ML Inference Pipeline', 'GPS Tracking Domain'],
              futureExpansion: 'Edge-AI device deployment on vehicle tracking units for offline anomaly detection.'
            }
          }
        ]
      }
    ]
  },
  {
    id: 'billing',
    name: 'Billing',
    code: 'DOM-BIL',
    category: 'Enterprise & Administration',
    description: 'Subscription management, per-learner fee collection, fleet owner payouts, and automated invoicing.',
    iconName: 'CreditCard',
    capabilities: [
      {
        id: 'bil-cap-1',
        code: 'CAP-BIL-01',
        name: 'Multi-Tier Subscription & Revenue Engine',
        description: 'Handles parent monthly safety subscriptions, school site licenses, and government grants.',
        services: [
          {
            id: 'srv-bil-01',
            name: 'Automated Invoicing & Payment Gateway Service',
            description: 'Processes credit cards, debit orders, and mobile money for South Africa & SADC.',
            softwareModules: ['SubscriptionBillingModule', 'PayFast/StripeAdapter', 'InvoiceGeneratorModule'],
            details: {
              id: 'det-bil-01',
              name: 'Automated Recurring Billing Pipeline',
              purpose: 'Provide seamless financial operations for parent safety subscriptions and fleet licensing.',
              businessValue: 'Guarantees cash flow predictable recurring revenue with zero manual intervention.',
              primaryUsers: ['Fleet Owner', 'School Administrator', 'Super Administrator'],
              inputs: ['Subscription Plan ID', 'Bank Account / Card Token', 'Learner Count'],
              outputs: ['Tax Invoice PDF', 'Payment Receipt', 'Subscription Status Update'],
              dependencies: ['PostgreSQL Database', 'Parent Engagement Domain'],
              futureExpansion: 'SADC cross-border multi-currency billing (ZAR, BWP, NAD, MZN).'
            }
          }
        ]
      }
    ]
  },
  {
    id: 'cybersecurity',
    name: 'Cybersecurity',
    code: 'DOM-SEC',
    category: 'Enterprise & Administration',
    description: 'Zero-trust architecture, POPIA/GDPR data privacy enforcement, field encryption, and penetration monitoring.',
    iconName: 'Lock',
    capabilities: [
      {
        id: 'sec-cap-1',
        code: 'CAP-SEC-01',
        name: 'Data Protection & Threat Defense',
        description: 'Protects child minor location privacy and guards infrastructure against unauthorized intrusion.',
        services: [
          {
            id: 'srv-sec-01',
            name: 'POPIA Compliance & Encryption Key Service',
            description: 'Encrypts minor PII data at rest using AES-256 and manages hardware security modules (HSM).',
            softwareModules: ['PIIEncryptionModule', 'POPIAConsentEngine', 'ThreatMonitorModule'],
            details: {
              id: 'det-sec-01',
              name: 'POPIA Minor Privacy & Cryptographic Vault',
              purpose: 'Safeguard sensitive child identity and real-time location data against data breaches.',
              businessValue: 'Ensures strict legal compliance with South Africa POPIA and international GDPR laws.',
              primaryUsers: ['Cybersecurity Engineer', 'Compliance Officer'],
              inputs: ['Raw Learner Profile', 'Parent Consent Form', 'TLS Session Telemetry'],
              outputs: ['Encrypted Ciphertext', 'POPIA Audit Log', 'Threat Neutralization Event'],
              dependencies: ['Audit Domain', 'Administration Domain'],
              futureExpansion: 'Quantum-resistant cryptographic algorithms for national safety communications.'
            }
          }
        ]
      }
    ]
  }
];
