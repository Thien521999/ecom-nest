import { config } from 'dotenv'
import fs from 'fs'
import path from 'path'
import z from 'zod'
config({
  path: '.env',
})

// kiểm tra xem có file env chưa
if (!fs.existsSync(path.resolve('.env'))) {
  console.log('ko tìm thấy file .env')
  process.exit(1)
}

const configSchema = z.object({
  DATABASE_URL: z.string(),
  ACCESS_TOKEN_SECRET: z.string(),
  ACCESS_TOKEN_EXPIRES_IN: z.string(),
  REFRESH_TOKEN_SECRET: z.string(),
  REFRESH_TOKEN_EXPIRES_IN: z.string(),
  SECRET_API_KEY: z.string(),
  ADMIN_NAME: z.string(),
  ADMIN_PASSWORD: z.string(),
  ADMIN_EMAIL: z.string(),
  ADMIN_PHONENUMBER: z.string(),
  OTP_EXPIRES_IN: z.string(),
})

const configServer = configSchema.safeParse(process.env)

if (!configServer.success) {
  console.log('Các giá trị khai báo trong file .env ko hợp lệ')
  console.error(configServer.error)

  process.exit(1)
}

const envConfig = configServer.data

export default envConfig
