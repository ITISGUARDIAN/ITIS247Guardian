// ITIS Enterprise Email Template Engine
// High-conversion, dark-mode compatible responsive HTML templates
// Pre-built templates: Password Reset, OTP Verification, Emergency Alerts, Invoice Settlement, Generic

import { EmailTemplateType } from './email.types';

export interface TemplateRenderResult {
  subject: string;
  htmlBody: string;
  textBody: string;
}

export class EmailTemplateEngine {
  private static instance: EmailTemplateEngine;

  private constructor() {}

  public static getInstance(): EmailTemplateEngine {
    if (!EmailTemplateEngine.instance) {
      EmailTemplateEngine.instance = new EmailTemplateEngine();
    }
    return EmailTemplateEngine.instance;
  }

  /**
   * Main Compiler Entry point for Email Templates
   */
  public compileTemplate(
    templateType: EmailTemplateType,
    variables: Record<string, any>
  ): TemplateRenderResult {
    switch (templateType) {
      case 'PASSWORD_RESET':
        return this.renderPasswordResetTemplate(variables);
      case 'OTP_VERIFICATION':
        return this.renderOtpTemplate(variables);
      case 'EMERGENCY_NOTIFICATION':
        return this.renderEmergencyTemplate(variables);
      case 'INVOICE_SETTLEMENT':
        return this.renderInvoiceTemplate(variables);
      case 'GENERIC_TRANSACTIONAL':
      default:
        return this.renderGenericTemplate(variables);
    }
  }

  /**
   * Shared Master Responsive Layout Wrapper
   */
  private wrapMasterLayout(
    title: string,
    contentHtml: string,
    headerBadgeColor: string = '#1E3A8A'
  ): string {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f3f4f6; margin: 0; padding: 0; color: #1f2937; }
    .container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); }
    .header { background-color: ${headerBadgeColor}; color: #ffffff; padding: 24px; text-align: center; }
    .header h1 { margin: 0; font-size: 20px; font-weight: 700; letter-spacing: -0.02em; }
    .header p { margin: 6px 0 0 0; font-size: 13px; opacity: 0.9; }
    .content { padding: 32px 24px; line-height: 1.6; font-size: 15px; }
    .btn { display: inline-block; background-color: #0284c7; color: #ffffff !important; font-weight: 600; text-decoration: none; padding: 12px 28px; border-radius: 8px; margin: 20px 0; font-size: 15px; text-align: center; }
    .btn-danger { background-color: #dc2626; }
    .code-box { background-color: #f8fafc; border: 2px dashed #cbd5e1; border-radius: 8px; padding: 16px; text-align: center; font-size: 32px; font-weight: 800; letter-spacing: 0.25em; color: #0f172a; margin: 20px 0; }
    .footer { background-color: #f9fafb; padding: 20px 24px; text-align: center; font-size: 12px; color: #6b7280; border-top: 1px solid #e5e7eb; }
    .footer a { color: #0284c7; text-decoration: none; }
    .alert-box { background-color: #fef2f2; border-left: 4px solid #ef4444; padding: 14px 16px; border-radius: 6px; margin: 16px 0; font-size: 14px; color: #991b1b; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>ITIS Enterprise Communications</h1>
      <p>Integrated Transport & Safety Infrastructure System</p>
    </div>
    <div class="content">
      ${contentHtml}
    </div>
    <div class="footer">
      <p>This is an automated operational notification sent by ITIS Government Services.</p>
      <p>Republic of South Africa &bull; Department of Transport &bull; <a href="https://itis.gov.za">itis.gov.za</a></p>
    </div>
  </div>
</body>
</html>`;
  }

  /**
   * 1. PASSWORD RESET TEMPLATE
   */
  private renderPasswordResetTemplate(vars: Record<string, any>): TemplateRenderResult {
    const userName = vars.userName || vars.name || 'Valued User';
    const resetUrl = vars.resetUrl || 'https://itis.gov.za/auth/reset-password?token=sample_token_2026';
    const expiresMinutes = vars.expiresMinutes || 15;
    const requestIp = vars.requestIp || '196.25.255.1';

    const subject = `🔐 Password Reset Request for your ITIS Account`;

    const htmlBody = this.wrapMasterLayout(
      subject,
      `
      <h2>Hello ${userName},</h2>
      <p>We received a request to reset the password for your ITIS administrative account associated with IP <strong>${requestIp}</strong>.</p>
      <p>Click the button below to specify a new password. This link is valid for <strong>${expiresMinutes} minutes</strong>.</p>
      
      <div style="text-align: center;">
        <a href="${resetUrl}" class="btn">Reset Password Now</a>
      </div>

      <div class="alert-box">
        <strong>Security Notice:</strong> If you did not initiate this password reset request, please ignore this email or contact the ITIS Security Operations Centre immediately at <strong>soc@itis.gov.za</strong>.
      </div>
      <p style="font-size: 13px; color: #64748b;">Or copy and paste this link into your browser:<br/><a href="${resetUrl}" style="word-break: break-all;">${resetUrl}</a></p>
      `,
      '#0F172A'
    );

    const textBody = `Hello ${userName},\n\nWe received a request to reset your ITIS account password from IP ${requestIp}.\nReset link (expires in ${expiresMinutes} mins):\n${resetUrl}\n\nIf you did not request this, please contact soc@itis.gov.za immediately.`;

    return { subject, htmlBody, textBody };
  }

  /**
   * 2. OTP VERIFICATION TEMPLATE
   */
  private renderOtpTemplate(vars: Record<string, any>): TemplateRenderResult {
    const userName = vars.userName || vars.name || 'Valued User';
    const otpCode = vars.otpCode || vars.code || '849201';
    const expiryMinutes = vars.expiryMinutes || 5;
    const actionContext = vars.actionContext || 'Administrative Login Verification';

    const subject = `🔑 Your ITIS One-Time Passcode (OTP): ${otpCode}`;

    const htmlBody = this.wrapMasterLayout(
      subject,
      `
      <h2>Security Passcode Verification</h2>
      <p>Hello ${userName},</p>
      <p>Use the following 6-digit One-Time Passcode (OTP) to complete your <strong>${actionContext}</strong>:</p>

      <div class="code-box">${otpCode}</div>

      <p style="text-align: center; color: #64748b; font-size: 14px;">This code expires in <strong>${expiryMinutes} minutes</strong>. Do not share this code with anyone.</p>

      <div class="alert-box">
        <strong>Anti-Phishing Warning:</strong> ITIS staff will NEVER ask for your OTP over the phone, via SMS, or by email.
      </div>
      `,
      '#1E3A8A'
    );

    const textBody = `Hello ${userName},\n\nYour ITIS OTP for ${actionContext} is: ${otpCode}\n\nThis code is valid for ${expiryMinutes} minutes. Never share your OTP with anyone.`;

    return { subject, htmlBody, textBody };
  }

  /**
   * 3. EMERGENCY SOS NOTIFICATION TEMPLATE
   */
  private renderEmergencyTemplate(vars: Record<string, any>): TemplateRenderResult {
    const learnerName = vars.learnerName || 'Learner';
    const location = vars.location || 'Pretoria Primary School Zone B';
    const timestamp = vars.time || vars.timestamp || new Date().toLocaleTimeString();
    const liveRadarUrl = vars.liveRadarUrl || 'https://itis.gov.za/parent/live-radar';

    const subject = `🚨 CRITICAL SAFETY ALERT: Emergency SOS for ${learnerName}`;

    const htmlBody = this.wrapMasterLayout(
      subject,
      `
      <div style="background-color: #fef2f2; border-left: 6px solid #dc2626; padding: 16px; margin-bottom: 20px; border-radius: 6px;">
        <h2 style="color: #991b1b; margin: 0 0 8px 0; font-size: 22px;">🚨 EMERGENCY PANIC SOS TRIGGERED</h2>
        <p style="color: #7f1d1d; margin: 0; font-weight: 600;">High-Priority Safety Event Logged</p>
      </div>

      <p>Dear Parent / Guardian,</p>
      <p>A wearable Panic SOS trigger was activated for <strong>${learnerName}</strong> at <strong>${timestamp}</strong> near <strong>${location}</strong>.</p>

      <div style="background-color: #f8fafc; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0; margin: 20px 0;">
        <h4 style="margin: 0 0 10px 0; color: #0f172a;">Real-Time Status Metrics:</h4>
        <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
          <li><strong>Learner:</strong> ${learnerName}</li>
          <li><strong>Location:</strong> ${location}</li>
          <li><strong>Trigger Time:</strong> ${timestamp}</li>
          <li><strong>Emergency Escalation:</strong> Rapid Transport Response Dispatched</li>
        </ul>
      </div>

      <div style="text-align: center;">
        <a href="${liveRadarUrl}" class="btn btn-danger">Open Live GPS Radar Map</a>
      </div>

      <p style="font-size: 13px; color: #64748b;">If you need direct emergency assistance, tap below to contact the ITIS Control Centre helpline at <strong>0800 111 911</strong>.</p>
      `,
      '#DC2626'
    );

    const textBody = `🚨 CRITICAL SAFETY ALERT: Emergency SOS triggered for ${learnerName} at ${timestamp} near ${location}.\nView Live Radar: ${liveRadarUrl}\nITIS Emergency Helpline: 0800 111 911.`;

    return { subject, htmlBody, textBody };
  }

  /**
   * 4. INVOICE SETTLEMENT / RECEIPT TEMPLATE
   */
  private renderInvoiceTemplate(vars: Record<string, any>): TemplateRenderResult {
    const customerName = vars.customerName || 'Valued Partner';
    const invoiceNumber = vars.invoiceNumber || 'INV-2026-001';
    const amount = vars.amount || '1,250.00';
    const paymentStatus = vars.status || 'PAID';
    const paymentMethod = vars.paymentMethod || 'PayFast Instant EFT';

    const subject = `🧾 Payment Receipt: Invoice ${invoiceNumber} (${paymentStatus})`;

    const htmlBody = this.wrapMasterLayout(
      subject,
      `
      <h2>Payment Receipt & Confirmation</h2>
      <p>Dear ${customerName},</p>
      <p>Thank you for your payment. Your transaction for invoice <strong>${invoiceNumber}</strong> has been successfully processed.</p>

      <div style="background: #f8fafc; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0; margin: 20px 0;">
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 8px 0; color: #64748b;">Invoice Number:</td>
            <td style="padding: 8px 0; text-align: right; font-weight: 600;">${invoiceNumber}</td>
          </tr>
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 8px 0; color: #64748b;">Amount Settled:</td>
            <td style="padding: 8px 0; text-align: right; font-weight: 700; color: #16a34a; font-size: 16px;">R ${amount}</td>
          </tr>
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 8px 0; color: #64748b;">Payment Gateway:</td>
            <td style="padding: 8px 0; text-align: right; font-weight: 600;">${paymentMethod}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b;">Status:</td>
            <td style="padding: 8px 0; text-align: right; font-weight: 700; color: #16a34a;">${paymentStatus}</td>
          </tr>
        </table>
      </div>

      <p style="font-size: 13px; color: #64748b;">A formal tax invoice PDF is stored in your billing dashboard under account records.</p>
      `,
      '#15803D'
    );

    const textBody = `Dear ${customerName},\n\nPayment receipt for invoice ${invoiceNumber}: R ${amount} (${paymentStatus}) via ${paymentMethod}.\nThank you for using ITIS Services.`;

    return { subject, htmlBody, textBody };
  }

  /**
   * 5. GENERIC TRANSACTIONAL TEMPLATE
   */
  private renderGenericTemplate(vars: Record<string, any>): TemplateRenderResult {
    const subject = vars.subject || vars.title || 'ITIS Notification';
    const title = vars.title || 'Notification Update';
    const message = vars.message || vars.body || 'You have a new update in your ITIS dashboard.';

    const htmlBody = this.wrapMasterLayout(
      subject,
      `
      <h2>${title}</h2>
      <p>${message}</p>
      `,
      '#1E3A8A'
    );

    const textBody = `${title}\n\n${message}`;

    return { subject, htmlBody, textBody };
  }
}
