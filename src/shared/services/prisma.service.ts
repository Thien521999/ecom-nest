import { Injectable, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({
      log: ['info'], // keyword: Connection pool
    })
  }
  async onModuleInit() {
    await this.$connect()
  }
}
