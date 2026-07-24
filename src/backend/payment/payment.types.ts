// ITIS Production Payment Gateway Abstraction Types & Interfaces (Prompt 071)
// Unified Payment Types for South African Payment Rails (PayFast, Ozow Instant EFT, Peach Payments)

export type PaymentProvider = 'PAYFAST' | 'OZOW' | 'PEACH_PAYMENTS';

export type PaymentStatus =
  | 'PENDING'
  | 'PROCESSING'
  | 'SUCCESS'
  | 'FAILED'
  | 'CANCELLED'
  | 'REFUNDED'
  | 'EXPIRED';

export type Currency = 'ZAR';

export interface CustomerDetails {
  name: string;
  email: string;
  phone?: string;
  idNumber?: string;
  address?: string;
}

export interface PaymentRequest {
  transactionId: string;
  amount: number; // In ZAR
  currency?: Currency;
  itemReference: string;
  itemDescription: string;
  customer: CustomerDetails;
  returnUrl: string;
  cancelUrl: string;
  notifyUrl: string;
  metadata?: Record<string, any>;
}

export interface UnifiedPaymentResponse {
  success: boolean;
  transactionId: string;
  provider: PaymentProvider;
  providerReference: string;
  redirectUrl?: string;
  paymentFormData?: Record<string, string>;
  status: PaymentStatus;
  amount: number;
  currency: Currency;
  rawResponse?: any;
  errorMessage?: string;
  timestamp: string;
  retryCount?: number;
  latencyMs?: number;
}

export interface WebhookVerificationRequest {
  payload: Record<string, any>;
  headers?: Record<string, string | string[] | undefined>;
  rawBody?: string;
}

export interface WebhookVerificationResult {
  isValid: boolean;
  transactionId: string;
  providerReference: string;
  status: PaymentStatus;
  amount: number;
  signatureVerified: boolean;
  isDuplicate?: boolean;
  idempotencyKey?: string;
  processedAt?: string;
  retryCount?: number;
  errorMessage?: string;
  metadata?: Record<string, any>;
}

export interface WebhookIdempotencyRecord {
  idempotencyKey: string;
  provider: PaymentProvider;
  transactionId: string;
  providerReference: string;
  status: PaymentStatus;
  amount: number;
  signatureVerified: boolean;
  isDuplicate: boolean;
  processedAt: string;
  attemptCount: number;
  responsePayload?: any;
  errorMessage?: string;
}

export interface WebhookProcessingOptions {
  retryOnFailure?: boolean;
  maxAttempts?: number;
  backoffMs?: number;
}

export interface PaymentGatewayConfig {
  merchantId: string;
  merchantKey?: string;
  passphrase?: string;
  apiKey?: string;
  secretKey?: string;
  entityId?: string;
  siteCode?: string;
  privateKey?: string;
  isSandbox: boolean;
  timeoutMs: number;
  maxRetries: number;
}

export interface PaymentGateway {
  readonly providerName: PaymentProvider;
  initializePayment(request: PaymentRequest): Promise<UnifiedPaymentResponse>;
  verifyWebhook(req: WebhookVerificationRequest): Promise<WebhookVerificationResult>;
  queryTransactionStatus(transactionId: string, providerReference?: string): Promise<UnifiedPaymentResponse>;
  refundTransaction?(transactionId: string, amount: number, reason: string): Promise<UnifiedPaymentResponse>;
}

export interface PaymentAuditRecord {
  id: string;
  transactionId: string;
  provider: PaymentProvider;
  action: 'INITIALIZATION' | 'WEBHOOK_RECEIVED' | 'STATUS_QUERY' | 'REFUND_REQUEST';
  status: PaymentStatus;
  amount: number;
  retryAttempts: number;
  signatureValid?: boolean;
  errorMessage?: string;
  metadata?: Record<string, any>;
  timestamp: string;
}
