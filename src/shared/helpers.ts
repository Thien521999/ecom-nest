// P2002: Unique constraint failed
// P2025: Record not found
// P2003: Foreign key constraint failed
// P2014: Invalid ID relation
// P2016: Query interpretation error

import { Prisma } from '@prisma/client'
import { randomInt } from 'crypto'

// Type Predicate
export function isUniqueConstraintPrismaError(error: any): error is Prisma.PrismaClientKnownRequestError {
  return error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002'
}

export function isNotFoundPrismaError(error: any): error is Prisma.PrismaClientKnownRequestError {
  return error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025'
}

export function generateOTP() {
  return String(randomInt(100000, 1000000))
}
