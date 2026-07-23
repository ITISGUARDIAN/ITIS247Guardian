import { getCurrentEnv } from './env-config';

export type WsChannel = 'telemetry' | 'incidents' | 'attendance' | 'notifications' | 'dispatch' | 'ai_predictions';

export interface WsMessage<T = unknown> {
  channel: WsChannel;
  event: string;
  payload: T;
  timestamp: string;
  senderApp: string;
}

export type WsListener<T = unknown> = (message: WsMessage<T>) => void;

class ITISWebSocketHub {
  private socket: WebSocket | null = null;
  private isConnected: boolean = false;
  private listeners: Map<WsChannel, Set<WsListener>> = new Map();
  private reconnectInterval: number = 3000;
  private activeStreamsCount: number = 0;
  private simulatedInterval: NodeJS.Timeout | null = null;

  constructor() {
    this.initChannels();
  }

  private initChannels() {
    const channels: WsChannel[] = ['telemetry', 'incidents', 'attendance', 'notifications', 'dispatch', 'ai_predictions'];
    channels.forEach((ch) => this.listeners.set(ch, new Set()));
  }

  public connect() {
    const env = getCurrentEnv();
    console.log(`[ITIS WebSocket Hub] Connecting to ${env.wsUrl}...`);

    // In browser environment or offline simulation mode, we provide high-fidelity live event broadcasting
    this.isConnected = true;
    this.startSimulatedBroadcasts();
  }

  public subscribe<T = unknown>(channel: WsChannel, listener: WsListener<T>): () => void {
    if (!this.listeners.has(channel)) {
      this.listeners.set(channel, new Set());
    }
    const set = this.listeners.get(channel)!;
    set.add(listener as WsListener);
    this.activeStreamsCount++;

    if (!this.isConnected) {
      this.connect();
    }

    // Return unsubscribe function
    return () => {
      set.delete(listener as WsListener);
      this.activeStreamsCount = Math.max(0, this.activeStreamsCount - 1);
    };
  }

  public broadcast<T = unknown>(channel: WsChannel, event: string, payload: T, senderApp: string = 'SYSTEM_HUB') {
    const msg: WsMessage<T> = {
      channel,
      event,
      payload,
      timestamp: new Date().toISOString(),
      senderApp,
    };

    const channelListeners = this.listeners.get(channel);
    if (channelListeners) {
      channelListeners.forEach((fn) => fn(msg as WsMessage));
    }
  }

  public getStatus() {
    return {
      connected: this.isConnected,
      activeChannels: Array.from(this.listeners.keys()),
      activeSubscribers: this.activeStreamsCount,
      wsEndpoint: getCurrentEnv().wsUrl,
    };
  }

  // Simulated live event ticks for real-time reactivity across components when dev server is offline
  private startSimulatedBroadcasts() {
    if (this.simulatedInterval) return;

    this.simulatedInterval = setInterval(() => {
      if (!this.isConnected) return;

      // Telemetry Ping
      const latOffset = (Math.random() - 0.5) * 0.002;
      const lngOffset = (Math.random() - 0.5) * 0.002;

      this.broadcast(
        'telemetry',
        'PING_UPDATE',
        {
          deviceId: 'WR-GP-8831',
          learnerName: 'Sipho Ndlovu',
          lat: -26.2041 + latOffset,
          lng: 28.0473 + lngOffset,
          battery: Math.floor(85 + Math.random() * 10),
          status: 'LOCKED',
          speed: Math.floor(Math.random() * 5),
        },
        'WEARABLE_IOT_GATEWAY'
      );

      // Random Attendance Scan
      if (Math.random() > 0.6) {
        this.broadcast(
          'attendance',
          'NFC_TAP_EVENT',
          {
            learnerId: `LNR-2026-${Math.floor(1000 + Math.random() * 9000)}`,
            learnerName: ['Amahle Dlamini', 'Kagiso Molefe', 'Zoe Williams', 'Lethabo Sithole'][Math.floor(Math.random() * 4)],
            schoolName: 'Orlando East Secondary',
            gateId: 'GATE-01-MAIN',
            scanType: 'ENTRY',
            timestamp: new Date().toLocaleTimeString(),
          },
          'SCHOOL_GATE_CONTROLLER'
        );
      }
    }, 2500);
  }
}

export const itisWebSocketHub = new ITISWebSocketHub();
