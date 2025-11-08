import { Injectable } from '@nestjs/common'
import envConfig from '../config'
import { Resend } from 'resend'

@Injectable()
export class EmailService {
  private resend: Resend
  constructor() {
    this.resend = new Resend(envConfig.RESEND_API_KEY)
  }

  sendEmail(payload: { email: string; code: string }) {
    return this.resend.emails.send({
      from: 'Ecommerce <no-reply@tranhoangthien.id.vn>',
      to: [payload.email],
      subject: 'Mã OTP',
      html: `<strong>${payload.code}</strong>`,
    })
  }
}
