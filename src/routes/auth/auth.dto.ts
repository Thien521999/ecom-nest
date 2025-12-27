import { createZodDto } from 'nestjs-zod'
import { LoginBodySchema, RegisterBodySchema, RegisterResSchema, SendOTPBodySchema } from './auth.model'

// response ko cần strict()
// body: cần strict()

// class is required for using DTO as a type
export class RegisterBodyDTO extends createZodDto(RegisterBodySchema) {}

export class RegisterResDTO extends createZodDto(RegisterResSchema) {}

export class SendOTPBodyDTO extends createZodDto(SendOTPBodySchema) {}

export class LoginBodyDTO extends createZodDto(LoginBodySchema) {}
