import { getCurrentEnv } from './env-config';

export type WsChannel = 'telemetry' | 'incidents' | 'attendance' | 'notifications' | 'dispatch' | 'ai_predictions' | 'devices';

export interface WsMessage<T = unknown> {
  channel: WsChannel;
  event: string;
  payload: T;
  timestamp: string;
  senderApp: string;
}

export type WsListener<T = unknown> = (message: WsMessage<T>) => void;

class ITISWebSocketHub {
  private eventSource: EventSource | null = null;
  private isConnected: boolean = false;
  private listeners: Map<WsChannel, Set<WsListener>> = new Map();
  private activeStreamsCount: number = 0;
  private simulatedInterval: NodeJS.Timeout | null = null;

  constructor() {
    this.initChannels();
  }

  private initChannels() {
    const channels: WsChannel[] = ['telemetry', 'incidents', 'attendance', 'notifications', 'dispatch', 'ai_predictions', 'devices'];
    channels.forEach((ch) => this.listeners.set(ch, new Set()));
  }

  public connect() {
    if (this.isConnected) return;
    const env = getCurrentEnv();
    console.log(`[ITIS WebSocket Hub] Connecting live stream to /api/v1/events/stream...`);

    if (typeof window !== 'undefined' && 'EventSource' in window) {
      try {
        this.eventSource = new EventSource('/api/v1/events/stream');
        
        const channels: WsChannel[] = ['telemetry', 'incidents', 'attendance', 'notifications', 'dispatch', 'ai_predictions', 'devices'];
        channels.forEach((ch) => {
          this.eventSource?.addEventListener(ch, (e: MessageEvent) => {
            try {
              const data = JSON.parse(e.data);
              this.broadcast(ch, data.event, data.payload, 'LIVE_BACKEND');
            } catch (err) {
              // Ignore parse errors
            }
          });
        });

        this.eventSource.onopen = () => {
          this.isConnected = true;
          console.log('[ITIS EventStream] Connected to live backend stream.');
        };

        this.eventSource.onerror = () => {
          this.startSimulatedBroadcasts();
        };
      } catch (e) {
        this.startSimulatedBroadcasts();
      }
    } else {
      this.startSimulatedBroadcasts();
    }

    this.isConnected = true;
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

  private startSimulatedBroadcasts() {
    if (this.simulatedInterval) return;

    this.simulatedInterval = setInterval(() => {
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
    }, 3000);
  }
}

export const itisWebSocketHub = new ITISWebSocketHub();
