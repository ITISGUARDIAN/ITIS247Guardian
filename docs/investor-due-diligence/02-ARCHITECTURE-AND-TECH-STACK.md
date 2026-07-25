# Investor Due Diligence — Part 2: Architecture & Technology Stack

## 1. High-Level System Architecture

ITIS employs a modern, full-stack, event-driven micro-architecture deployed across SITA Government Cloud Enclaves and Google Cloud Platform (GCP).

```
                      +----------------------------------+
                      |    IoT Fleet Gateway (50,000x)   |
                      |  CAN-Bus, GPS, RFID, SOS Buttons  |
                      +----------------------------------+
                                       |
                                (MQTT over TLS)
                                       v
                      +----------------------------------+
                      |     EMQX / Mosquitto Broker      |
                      +----------------------------------+
                                       |
                                       v
                      +----------------------------------+
                      | Express/Node.js API Gateway      |
                      | (REST, WebSockets, JWT, RBAC)    |
                      +----------------------------------+
                                       |
            +--------------------------+--------------------------+
            |                                                     |
            v                                                     v
+-----------------------+                             +-----------------------+
|  Cloud SQL PostgreSQL |                             | TimescaleDB / PostGIS |
|  Prisma Multi-Tenant  |                             | High-Frequency Pings  |
+-----------------------+                             +-----------------------+
```

---

## 2. Technology Stack Selection Matrix

| Tier | Technology | Rationale & Enterprise Fit |
| ---- | ---------- | -------------------------- |
| **Frontend Framework** | React 19 + TypeScript + Vite | Lightning-fast SPA rendering, type safety, modular component structure |
| **Styling & UI** | Tailwind CSS v4 + Lucide Icons | Responsive utility-first styling with zero unused CSS overhead |
| **Animation Engine** | Motion (`motion/react`) | Fluid route transitions and real-time GIS map animations |
| **Backend Runtime** | Node.js 20 LTS + Express v4 | Async event loop ideal for handling 85,000 req/sec telemetry pings |
| **Database ORM** | Prisma ORM v7 + PostGIS | Type-safe migrations, spatial query helpers, relational safety |
| **Time-Series DB** | TimescaleDB | Compressed hyper-tables storing 500M+ monthly GPS coordinates |
| **Hardware Messaging** | MQTT 5.0 + WebSockets | Low-overhead binary telemetry streaming from vehicle gateways |
| **AI Subsystem** | Google GenAI SDK (`@google/genai`) | Predictive driver fatigue & automated incident categorization |
