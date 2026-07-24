// ITIS Production Invoice Service Types (Prompt 073)
// Tax Invoices, Credit Notes, Payment Receipts, SARS 15% VAT Summaries, Government Procurement Invoices, PDF/Excel Exports

export type DocumentType = 'TAX_INVOICE' | 'CREDIT_NOTE' | 'PAYMENT_RECEIPT' | 'GOVERNMENT_PROCUREMENT_INVOICE';

export type ExportFormat = 'PDF' | 'EXCEL' | 'CSV';

export interface SequentialNumberConfig {
  invoicePrefix: string; // "INV"
  creditNotePrefix: string; // "CN"
  receiptPrefix: string; // "REC"
  govInvoicePrefix: string; // "GOV-INV"
  currentYear: number;
  currentMonth: number;
  sequenceCounter: number;
}

export interface GovernmentProcurementDetails {
  departmentName: string; // e.g. "Gauteng Department of Education"
  tenderReference: string; // e.g. "GDE-2026-ITIS-081"
  pfmaComplianceApproved: boolean; // Public Finance Management Act Section 38
  treasuryTariffCode: string; // e.g. "TR-SA-SAFETY-004"
  emisNumber?: string; // EMIS School Code
  vendorMasterNumber: string; // CSD (Central Supplier Database) MAAA Number e.g. "MAAA0981023"
  bbbeeLevel: 'LEVEL_1' | 'LEVEL_2' | 'LEVEL_3';
  orderNumber: string; // Government Purchase Order Number e.g. "PO-GDE-89102"
}

export interface InvoiceLineItem {
  id: string;
  itemCode: string;
  description: string;
  quantity: number;
  unitPriceExclVat: number;
  subtotalExclVat: number;
  vatRatePercentage: number; // 15.0
  vatAmount: number;
  totalAmountInclVat: number;
}

export interface TaxInvoiceDocument {
  invoiceId: string;
  invoiceNumber: string; // e.g. "INV-2026-07-00101"
  documentType: DocumentType;
  issueDate: string;
  dueDate: string;
  paidAt?: string;
  status: 'DRAFT' | 'ISSUED' | 'PAID' | 'CREDITED' | 'CANCELLED';
  
  // Buyer / Customer Information
  accountId: string;
  accountType: 'PARENT' | 'SCHOOL' | 'GOVERNMENT_CONTRACT' | 'FLEET';
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  taxRegistrationNumber?: string; // SA VAT Registration Number
  address?: string;
  province?: string;

  // Supplier Information (ITIS Enterprise)
  supplierName: string; // "ITIS Wearables (Pty) Ltd"
  supplierVatNumber: string; // "4092817263"
  supplierCsdNumber: string; // "MAAA0981023"
  supplierAddress: string;

  // Financial Breakdown
  currency: 'ZAR';
  subtotalExclVat: number;
  vatRatePercentage: number; // 15.0
  vatAmount: number;
  totalAmountInclVat: number;
  
  lineItems: InvoiceLineItem[];
  governmentDetails?: GovernmentProcurementDetails;
  paymentMethod?: string;
  paymentReference?: string;
  notes?: string;
  createdAt: string;
}

export interface CreditNote {
  creditNoteId: string;
  creditNoteNumber: string; // e.g. "CN-2026-07-00101"
  originalInvoiceId: string;
  originalInvoiceNumber: string;
  accountId: string;
  customerName: string;
  issueDate: string;
  reason: string; // e.g. "Learner de-registered prior to term start", "SLA downtime penalty credit"
  subtotalExclVat: number;
  vatAmount: number;
  totalAmountInclVat: number;
  lineItems: InvoiceLineItem[];
  createdAt: string;
}

export interface PaymentReceipt {
  receiptId: string;
  receiptNumber: string; // e.g. "REC-2026-07-00101"
  invoiceId: string;
  invoiceNumber: string;
  accountId: string;
  customerName: string;
  paymentDate: string;
  amountPaidInclVat: number;
  currency: 'ZAR';
  paymentMethod: string; // "PAYFAST" | "OZOW" | "PEACH_PAYMENTS" | "EFT_TREASURY"
  transactionReference: string;
  issuingBank?: string;
  createdAt: string;
}

export interface VatSummaryReport {
  reportPeriod: string; // "2026-07"
  generatedAt: string;
  totalInvoicesCount: number;
  totalTaxableSalesExclVat: number;
  totalOutputVat15Percent: number;
  totalGrossSalesInclVat: number;
  breakdownByAccountType: {
    PARENT: { count: number; totalExclVat: number; vat: number; totalInclVat: number };
    SCHOOL: { count: number; totalExclVat: number; vat: number; totalInclVat: number };
    GOVERNMENT_CONTRACT: { count: number; totalExclVat: number; vat: number; totalInclVat: number };
    FLEET: { count: number; totalExclVat: number; vat: number; totalInclVat: number };
  };
  sarsComplianceCode: string; // e.g. "SARS-VAT201-202607-VERIFIED"
}

export interface PaymentHistoryRecord {
  id: string;
  accountId: string;
  invoiceId: string;
  invoiceNumber: string;
  paymentDate: string;
  amount: number;
  currency: 'ZAR';
  paymentMethod: string;
  transactionReference: string;
  status: 'SUCCESS' | 'FAILED' | 'REFUNDED';
}
