// ITIS Production Payment Gateway Factory (Prompt 071)
// Instantiates and manages South African payment gateway adapters (PayFast, Ozow, Peach Payments)

import { PaymentGateway, PaymentProvider, PaymentGatewayConfig } from './payment.types';
import { PayFastGateway } from './gateways/payfast.gateway';
import { OzowGateway } from './gateways/ozow.gateway';
import { PeachGateway } from './gateways/peach.gateway';

export class PaymentGatewayFactory {
  private static instances: Map<PaymentProvider, PaymentGateway> = new Map();

  /**
   * Retrieves or instantiates the singleton instance for the specified Payment Provider.
   */
  public static getGateway(provider: PaymentProvider, customConfig?: Partial<PaymentGatewayConfig>): PaymentGateway {
    if (!this.instances.has(provider) || customConfig) {
      let gateway: PaymentGateway;

      switch (provider) {
        case 'PAYFAST':
          gateway = new PayFastGateway(customConfig);
          break;
        case 'OZOW':
          gateway = new OzowGateway(customConfig);
          break;
        case 'PEACH_PAYMENTS':
          gateway = new PeachGateway(customConfig);
          break;
        default:
          throw new Error(`Unsupported Payment Provider: ${provider}`);
      }

      if (!customConfig) {
        this.instances.set(provider, gateway);
      }
      return gateway;
    }

    return this.instances.get(provider)!;
  }

  /**
   * Returns all registered and supported payment gateway instances.
   */
  public static getAllGateways(): Map<PaymentProvider, PaymentGateway> {
    const providers: PaymentProvider[] = ['PAYFAST', 'OZOW', 'PEACH_PAYMENTS'];
    for (const p of providers) {
      if (!this.instances.has(p)) {
        this.getGateway(p);
      }
    }
    return this.instances;
  }

  /**
   * Selects an optimal fallback gateway if the primary gateway is experiencing outages or rate limits.
   */
  public static getFallbackGateway(primary: PaymentProvider): PaymentGateway {
    const fallbacks: Record<PaymentProvider, PaymentProvider> = {
      PAYFAST: 'OZOW',
      OZOW: 'PEACH_PAYMENTS',
      PEACH_PAYMENTS: 'PAYFAST'
    };
    const fallbackProvider = fallbacks[primary] || 'PAYFAST';
    return this.getGateway(fallbackProvider);
  }
}
