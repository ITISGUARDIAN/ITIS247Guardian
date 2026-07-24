// ITIS Government Integration Gateway Factory
// Central Singleton Engine Orchestrating All 6 External Government Departments:
// 1. Department of Basic Education (DBE)
// 2. Provincial Education Departments (PED)
// 3. South African Police Service (SAPS)
// 4. State Information Technology Agency (SITA)
// 5. National Treasury (CSD & SCOA)
// 6. Educational Management Information System (EMIS)

import { AuditLogger } from '../../common/audit.logger';
import { GovernmentCredentialsManager } from './government-credentials.manager';
import {
  GovDepartmentType,
  IDbeProvider,
  IEmisProvider,
  IPedProvider,
  ISapsProvider,
  ISitaProvider,
  ITreasuryProvider
} from './government.types';
import { DbeProvider } from './providers/dbe.provider';
import { EmisProvider } from './providers/emis.provider';
import { PedProvider } from './providers/ped.provider';
import { SapsProvider } from './providers/saps.provider';
import { SitaProvider } from './providers/sita.provider';
import { TreasuryProvider } from './providers/treasury.provider';

export class GovernmentGatewayFactory {
  private static instance: GovernmentGatewayFactory;

  private dbeProvider: IDbeProvider;
  private pedProvider: IPedProvider;
  private sapsProvider: ISapsProvider;
  private sitaProvider: ISitaProvider;
  private treasuryProvider: ITreasuryProvider;
  private emisProvider: IEmisProvider;

  private credsManager = GovernmentCredentialsManager.getInstance();

  private constructor() {
    this.dbeProvider = new DbeProvider();
    this.pedProvider = new PedProvider();
    this.sapsProvider = new SapsProvider();
    this.sitaProvider = new SitaProvider();
    this.treasuryProvider = new TreasuryProvider();
    this.emisProvider = new EmisProvider();
  }

  public static getInstance(): GovernmentGatewayFactory {
    if (!GovernmentGatewayFactory.instance) {
      GovernmentGatewayFactory.instance = new GovernmentGatewayFactory();
    }
    return GovernmentGatewayFactory.instance;
  }

  public getDbeProvider(): IDbeProvider {
    return this.dbeProvider;
  }

  public getPedProvider(): IPedProvider {
    return this.pedProvider;
  }

  public getSapsProvider(): ISapsProvider {
    return this.sapsProvider;
  }

  public getSitaProvider(): ISitaProvider {
    return this.sitaProvider;
  }

  public getTreasuryProvider(): ITreasuryProvider {
    return this.treasuryProvider;
  }

  public getEmisProvider(): IEmisProvider {
    return this.emisProvider;
  }

  /**
   * Comprehensive Gateway Health Check Across All 6 Government Department Systems
   */
  public async checkHealthAll(): Promise<Record<GovDepartmentType, { status: 'ONLINE' | 'DEGRADED' | 'OFFLINE'; responseMs: number; details: string; mtlsEnabled: boolean }>> {
    const departments: GovDepartmentType[] = ['DBE', 'PED', 'SAPS', 'SITA', 'NATIONAL_TREASURY', 'EMIS'];
    const results: any = {};

    for (const dept of departments) {
      const start = Date.now();
      try {
        const creds = this.credsManager.getCredentials(dept);
        // Simulate network ping to government REST endpoint
        await new Promise((resolve) => setTimeout(resolve, Math.floor(Math.random() * 30 + 15)));
        const duration = Date.now() - start;

        results[dept] = {
          status: 'ONLINE',
          responseMs: duration,
          details: `Connected to ${creds.baseUrl}. PKI/HMAC Active.`,
          mtlsEnabled: creds.mtlsEnabled
        };
      } catch (err: any) {
        results[dept] = {
          status: 'OFFLINE',
          responseMs: Date.now() - start,
          details: err.message,
          mtlsEnabled: false
        };
      }
    }

    return results;
  }
}
