import { ConflictException, Injectable } from '@nestjs/common'
import { isUniqueConstraintPrismaError } from 'src/shared/helpers'
import { HashingService } from 'src/shared/services/hashing.service'
import { TokenService } from 'src/shared/services/token.service'
import { RegisterBodyType } from './auth.model'
import { AuthRepository } from './auth.repo'
import { RolesService } from './roles.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly hashingService: HashingService,
    private readonly tokenService: TokenService,
    private readonly rolesService: RolesService,
    private readonly authRepository: AuthRepository,
  ) {}

  async register(body: RegisterBodyType) {
    try {
      const clientRoleId = await this.rolesService.getClientRoleId()
      const hashedPassword = await this.hashingService.hash(body.password)

      return this.authRepository.createUser({
        email: body.email,
        name: body.name,
        phoneNumber: body.phoneNumber,
        password: hashedPassword,
        roleId: clientRoleId,
      })
    } catch (error) {
      console.log(error)

      if (isUniqueConstraintPrismaError(error)) {
        throw new ConflictException('Email already exists')
      }

      throw error
    }
  }

  // async login(body: any) {
  //   // Tìm email có khớp ko
  //   const user = await this.prismaService.user.findUnique({
  //     where: {
  //       email: body.email,
  //       id: body.id,
  //     },
  //   })

  //   if (!user) {
  //     throw new UnauthorizedException('Acount is not exist')
  //   }

  //   // Kiểm tra password có khớp ko
  //   const isPasswordMatch = await this.hashingService.compare(body.password, user.password)

  //   if (!isPasswordMatch) {
  //     throw new UnprocessableEntityException({
  //       field: 'password',
  //       error: 'Password is correct',
  //     })
  //   }

  //   const tokens = await this.generateTokens({ userId: user.id })

  //   return tokens
  // }

  // async generateTokens(payload: { userId: number }) {
  //   // const [accessToken, refreshToken] = await Promise.all([
  //   //   this.tokenService.signAccessToken(payload),
  //   //   this.tokenService.signRereshToken(payload),
  //   // ])
  //   const accessToken = this.tokenService.signAccessToken(payload)
  //   const refreshToken = this.tokenService.signRereshToken(payload)

  //   const decodedRefreshToken = await this.tokenService.verifyRefreshToken(refreshToken)

  //   // save refreshToken vào Db
  //   await this.prismaService.refreshToken.create({
  //     data: {
  //       token: refreshToken,
  //       userId: payload.userId,
  //       expiresAt: new Date(decodedRefreshToken.exp * 1000),
  //       deviceId: 1,
  //     },
  //   })

  //   return {
  //     accessToken,
  //     refreshToken,
  //   }
  // }

  // async refreshToken(refreshToken: string) {
  //   try {
  //     // 1. Kiểm tra refreshToken có hợp lệ hay ko
  //     const { userId } = await this.tokenService.verifyRefreshToken(refreshToken)

  //     // 2. Kiểm tra refreshToken có tồn tại trong DB hay ko
  //     await this.prismaService.refreshToken.findUniqueOrThrow({
  //       where: {
  //         token: refreshToken,
  //       },
  //     })

  //     // 3. Xoá refreshToken trong DB
  //     await this.prismaService.refreshToken.delete({
  //       where: {
  //         token: refreshToken,
  //       },
  //     })

  //     // 4. Tạo accessToken và refreshToken mới
  //     const tokens = await this.generateTokens({ userId })
  //     return tokens
  //   } catch (error) {
  //     // Trường hợp đã refresh token rùi, nên thông báo cho user biết
  //     // refresh token đã bị đánh cắp
  //     if (isNotFoundPrismaError(error)) {
  //       throw new UnauthorizedException('Refresh token has been revoked')
  //     }

  //     throw new UnauthorizedException()
  //   }
  // }

  // async logout(refreshToken: string) {
  //   try {
  //     // 1. Kiểm tra refreshToken có hợp lệ hay ko
  //     await this.tokenService.verifyRefreshToken(refreshToken)

  //     // 2. xoá refreshToken trong DB
  //     await this.prismaService.refreshToken.delete({
  //       where: {
  //         token: refreshToken,
  //       },
  //     })

  //     return { message: 'Logout successfully' }
  //   } catch (error) {
  //     // Trường hợp đã refresh token rùi, nên thông báo cho user biết
  //     // refresh token đã bị đánh cắp
  //     if (isNotFoundPrismaError(error)) {
  //       throw new UnauthorizedException('Refresh token has been revoked')
  //     }

  //     throw new UnauthorizedException()
  //   }
  // }
}
