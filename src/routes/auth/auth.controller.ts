import { Body, Controller, Post } from '@nestjs/common'
import { ZodSerializerDto } from 'nestjs-zod'
import { IP } from 'src/shared/decorators/ip.decorator'
import { UserAgent } from 'src/shared/decorators/user-agent.decorator'
import { LoginBodyDTO, RegisterBodyDTO, RegisterResDTO, SendOTPBodyDTO } from './auth.dto'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ZodSerializerDto(RegisterResDTO)
  async register(@Body() body: RegisterBodyDTO) {
    return await this.authService.register(body)
  }

  @Post('otp')
  async sendOTP(@Body() body: SendOTPBodyDTO) {
    return await this.authService.sendOTP(body)
  }

  @Post('login')
  async login(@Body() body: LoginBodyDTO, @UserAgent() userAgent: string, @IP() ip: string) {
    return await this.authService.login({
      ...body,
      userAgent,
      ip,
    })
  }

  // @Post('refresh-token')
  // @HttpCode(HttpStatus.OK) // để trả về status code 200
  // async RefreshToken(@Body() body: any) {
  //   return await this.authService.refreshToken(body.refreshToken)
  // }

  // @Post('logout')
  // async logout(@Body() body: any) {
  //   return await this.authService.logout(body.refreshToken)
  // }
}
