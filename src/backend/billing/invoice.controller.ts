// ITIS Production Invoice Controller (Prompt 073)
// REST endpoints for PDF/Excel exports, Credit Notes, Receipts, VAT Summaries, Government Procurement Invoices & Payment History

import { Request, Response, Router } from 'express';
import { InvoiceService } from './invoice.service';

export const invoiceRouter = Router();
const invoiceService = InvoiceService.getInstance();

/**
 * 1. GET ALL TAX INVOICES
 * GET /api/v1/invoices
 */
invoiceRouter.get('/', (req: Request, res: Response) => {
  const invoices = invoiceService.getAllInvoices();
  return res.json({
    success: true,
    count: invoices.length,
    invoices
  });
});

/**
 * 2. GET SINGLE TAX INVOICE BY ID
 * GET /api/v1/invoices/:id
 */
invoiceRouter.get('/:id', (req: Request, res: Response) => {
  const invoice = invoiceService.getInvoice(req.params.id);
  if (!invoice) {
    return res.status(404).json({ success: false, error: 'INVOICE_NOT_FOUND' });
  }
  return res.json({
    success: true,
    invoice
  });
});

/**
 * 3. GENERATE GOVERNMENT PROCUREMENT TAX INVOICE
 * POST /api/v1/invoices/government
 */
invoiceRouter.post('/government', (req: Request, res: Response) => {
  try {
    const {
      accountId,
      customerName,
      customerEmail,
      customerPhone,
      taxRegistrationNumber,
      address,
      province,
      governmentDetails,
      lineItems,
      notes
    } = req.body;

    if (!accountId || !customerName || !governmentDetails || !governmentDetails.tenderReference || !lineItems) {
      return res.status(400).json({
        success: false,
        error: 'INVALID_GOVERNMENT_PAYLOAD',
        message: 'Required parameters: accountId, customerName, governmentDetails (tenderReference, orderNumber), lineItems'
      });
    }

    const invoice = invoiceService.generateGovernmentProcurementInvoice({
      accountId,
      customerName,
      customerEmail: customerEmail || 'procurement@gauteng.gov.za',
      customerPhone,
      taxRegistrationNumber: taxRegistrationNumber || '4010192834',
      address: address || '17 Simmonds Street, Marshalltown, Johannesburg',
      province: province || 'GAUTENG',
      governmentDetails,
      lineItems,
      notes
    });

    return res.status(201).json({
      success: true,
      data: invoice
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      error: 'GOVERNMENT_INVOICE_FAILED',
      message: err.message
    });
  }
});

/**
 * 4. ISSUE CREDIT NOTE
 * POST /api/v1/invoices/:id/credit-note
 */
invoiceRouter.post('/:id/credit-note', (req: Request, res: Response) => {
  try {
    const { reason, lineItemsToCredit } = req.body;

    if (!reason) {
      return res.status(400).json({
        success: false,
        error: 'MISSING_REASON',
        message: 'Credit note reason is required.'
      });
    }

    const creditNote = invoiceService.issueCreditNote(req.params.id, reason, lineItemsToCredit);

    return res.status(201).json({
      success: true,
      data: creditNote
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      error: 'CREDIT_NOTE_FAILED',
      message: err.message
    });
  }
});

/**
 * 5. GET PAYMENT RECEIPT
 * GET /api/v1/invoices/:id/receipt
 */
invoiceRouter.get('/:id/receipt', (req: Request, res: Response) => {
  try {
    const { paymentMethod, transactionReference } = req.query;

    const receipt = invoiceService.generatePaymentReceipt(
      req.params.id,
      (paymentMethod as string) || 'PAYFAST',
      (transactionReference as string) || `TX-${Date.now()}`
    );

    return res.json({
      success: true,
      receipt
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      error: 'RECEIPT_GENERATION_FAILED',
      message: err.message
    });
  }
});

/**
 * 6. EXPORT INVOICE TO PDF / HTML
 * GET /api/v1/invoices/:id/export/pdf
 */
invoiceRouter.get('/:id/export/pdf', (req: Request, res: Response) => {
  try {
    const file = invoiceService.exportInvoiceToPdf(req.params.id);
    res.setHeader('Content-Type', file.contentType);
    res.setHeader('Content-Disposition', `inline; filename="${file.filename}"`);
    return res.send(file.content);
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      error: 'PDF_EXPORT_FAILED',
      message: err.message
    });
  }
});

/**
 * 7. EXPORT INVOICE LEDGER TO EXCEL / CSV
 * GET /api/v1/invoices/export/excel
 */
invoiceRouter.get('/export/excel', (req: Request, res: Response) => {
  try {
    const file = invoiceService.exportInvoicesToExcel();
    res.setHeader('Content-Type', file.contentType);
    res.setHeader('Content-Disposition', `attachment; filename="${file.filename}"`);
    return res.send(file.content);
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      error: 'EXCEL_EXPORT_FAILED',
      message: err.message
    });
  }
});

/**
 * 8. GET SARS 15% VAT SUMMARY REPORT
 * GET /api/v1/invoices/vat-summary
 */
invoiceRouter.get('/reports/vat-summary', (req: Request, res: Response) => {
  const period = (req.query.period as string) || '2026-07';
  const report = invoiceService.generateVatSummaryReport(period);
  return res.json({
    success: true,
    report
  });
});

/**
 * 9. GET PAYMENT HISTORY
 * GET /api/v1/invoices/payment-history/:accountId?
 */
invoiceRouter.get('/payment-history/:accountId?', (req: Request, res: Response) => {
  const accountId = req.params.accountId;
  const history = invoiceService.getPaymentHistory(accountId);
  return res.json({
    success: true,
    count: history.length,
    paymentHistory: history
  });
});

/**
 * 10. GET CREDIT NOTES LIST
 * GET /api/v1/invoices/credit-notes
 */
invoiceRouter.get('/documents/credit-notes', (req: Request, res: Response) => {
  const notes = invoiceService.getCreditNotes();
  return res.json({
    success: true,
    count: notes.length,
    creditNotes: notes
  });
});

/**
 * 11. GET RECEIPTS LIST
 * GET /api/v1/invoices/receipts
 */
invoiceRouter.get('/documents/receipts', (req: Request, res: Response) => {
  const receipts = invoiceService.getReceipts();
  return res.json({
    success: true,
    count: receipts.length,
    receipts
  });
});
