import { Injectable } from '@nestjs/common'
import { UserType } from 'src/shared/models/shared-user.model'
import { PrismaService } from 'src/shared/services/prisma.service'
import { RegisterBodyType, VerificationCodeType } from './auth.model'

@Injectable()
export class AuthRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createUser(
    user: Omit<RegisterBodyType, 'confirmPassword'> & Pick<UserType, 'roleId'>,
  ): Promise<Omit<UserType, 'password' | 'totpSecret'>> {
    return await this.prismaService.user.create({
      data: user,
      omit: {
        password: true,
        totpSecret: true,
      },
    })
  }

  async createVerificationCode(
    payload: Pick<VerificationCodeType, 'email' | 'code' | 'type' | 'expiresAt'>,
  ): Promise<VerificationCodeType> {
    // upsert : chưa có thì tạo mới, có roi thì cập nhật
    return await this.prismaService.verificationCode.upsert({
      where: {
        email: payload.email,
      },
      create: payload,
      update: {
        code: payload.code,
        expiresAt: payload.expiresAt,
      },
    })
  }
}
