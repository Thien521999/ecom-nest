import { Injectable } from '@nestjs/common'
import fs from 'fs'
import path from 'path'
import { Resend } from 'resend'
import envConfig from '../config'

// console.log(path.resolve('src/shared/email-templates/otp.html'))

@Injectable()
export class EmailService {
  private resend: Resend
  constructor() {
    this.resend = new Resend(envConfig.RESEND_API_KEY)
  }

  sendEmail(payload: { email: string; code: string }) {
    const otpTemplate = fs.readFileSync(path.resolve('src/shared/email-templates/otp.html'), {
      encoding: 'utf-8',
    })

    const subject = 'Mã OTP'

    return this.resend.emails.send({
      from: 'Ecommerce <no-reply@tranhoangthien.id.vn>',
      to: [payload.email],
      subject,
      html: otpTemplate.replaceAll('{{subject}}', subject).replaceAll('{{code}}', payload.code),
    })
  }
}
