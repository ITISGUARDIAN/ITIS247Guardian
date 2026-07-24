// ITIS SMS Template Engine
// High-impact concise SMS text generator formatted for GSM-7 (160 char max per segment)
// Supports: OTP, Emergency SMS, Attendance Notifications, Low Battery Alerts, and Incident Alerts

import { SmsCategoryType } from './sms.types';

export interface SmsRenderResult {
  message: string;
  partsCount: number;
  category: SmsCategoryType;
}

export class SmsTemplateEngine {
  private static instance: SmsTemplateEngine;

  private constructor() {}

  public static getInstance(): SmsTemplateEngine {
    if (!SmsTemplateEngine.instance) {
      SmsTemplateEngine.instance = new SmsTemplateEngine();
    }
    return SmsTemplateEngine.instance;
  }

  /**
   * Calculate GSM-7 character parts count
   */
  public calculateParts(text: string): number {
    if (!text) return 0;
    // Standard GSM 7-bit single part max is 160 chars; multi-part is 153 chars per segment
    if (text.length <= 160) return 1;
    return Math.ceil(text.length / 153);
  }

  /**
   * Main Compiler Entry Point for SMS Categories
   */
  public compileTemplate(
    category: SmsCategoryType,
    variables: Record<string, any>
  ): SmsRenderResult {
    let message = '';

    switch (category) {
      case 'OTP':
        message = this.renderOtp(variables);
        break;
      case 'EMERGENCY_SMS':
        message = this.renderEmergencySms(variables);
        break;
      case 'ATTENDANCE_NOTIFICATION':
        message = this.renderAttendanceSms(variables);
        break;
      case 'LOW_BATTERY':
        message = this.renderLowBatterySms(variables);
        break;
      case 'INCIDENT_ALERT':
        message = this.renderIncidentAlertSms(variables);
        break;
      case 'GENERIC':
      default:
        message = variables.message || 'ITIS Alert: You have a new notification in your ITIS portal.';
        break;
    }

    return {
      message,
      partsCount: this.calculateParts(message),
      category
    };
  }

  /**
   * 1. OTP Passcode SMS
   */
  private renderOtp(vars: Record<string, any>): string {
    const code = vars.otpCode || vars.code || '849201';
    const mins = vars.expiryMinutes || 5;
    const action = vars.action || 'ITIS Security Sign-in';

    return `ITIS SECURITY: Your One-Time Code for ${action} is: ${code}. Valid for ${mins} mins. Do NOT share this OTP with anyone.`;
  }

  /**
   * 2. Emergency SOS Panic Alert SMS
   */
  private renderEmergencySms(vars: Record<string, any>): string {
    const learnerName = vars.learnerName || vars.name || 'Learner';
    const location = vars.location || vars.address || 'Pretoria Primary Zone B';
    const time = vars.time || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const liveUrl = vars.liveUrl || 'https://itis.gov.za/radar';

    return `🚨 EMERGENCY SOS: Panic alert triggered for ${learnerName} at ${time} near ${location}. Track live location: ${liveUrl} . Helpline: 0800111911`;
  }

  /**
   * 3. Attendance Check-in / Check-out Notification SMS
   */
  private renderAttendanceSms(vars: Record<string, any>): string {
    const learnerName = vars.learnerName || vars.name || 'Learner';
    const eventType = vars.eventType || 'ARRIVED AT SCHOOL'; // ARRIVED AT SCHOOL, BOARDED BUS, DISEMBARKED
    const time = vars.time || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const location = vars.location || 'Springfield High School';

    return `ITIS ATTENDANCE: ${learnerName} safely ${eventType} (${location}) at ${time}. View daily logs on your ITIS Parent app.`;
  }

  /**
   * 4. Low Battery Alert SMS (< 15%)
   */
  private renderLowBatterySms(vars: Record<string, any>): string {
    const learnerName = vars.learnerName || vars.name || 'Learner';
    const batteryLevel = vars.batteryLevel || vars.level || '12%';
    const deviceId = vars.deviceId || 'ITIS-BAND-04';

    return `⚠️ BATTERY LOW: Wearable device (${deviceId}) for ${learnerName} is at ${batteryLevel} battery. Please charge the device tonight to ensure safety tracking.`;
  }

  /**
   * 5. Incident & Geofence Breach Alert SMS
   */
  private renderIncidentAlertSms(vars: Record<string, any>): string {
    const incidentType = vars.incidentType || 'GEOFENCE BREACH';
    const targetName = vars.targetName || vars.learnerName || 'Vehicle / Learner';
    const details = vars.details || 'Deviated from designated safety corridor';
    const time = vars.time || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return `⚠️ ITIS INCIDENT ALERT: [${incidentType}] logged for ${targetName} at ${time}. ${details}. Immediate review required on portal.`;
  }
}
