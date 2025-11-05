// import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

// // Type Predicate
// export function isUniqueConstraintPrismaError(error: any): error is PrismaClientKnownRequestError {
//   return error instanceof PrismaClientKnownRequestError && error.code === 'P2002'
// }

// export function isNotFoundPrismaError(error: any): error is PrismaClientKnownRequestError {
//   return error instanceof PrismaClientKnownRequestError && error.code === 'P2025'
// }

// // P2002: Unique constraint failed
// // P2025: Record not found
// // P2003: Foreign key constraint failed
// // P2014: Invalid ID relation
// // P2016: Query interpretation error

// import { Prisma } from 'generated/prisma/client'
import { Prisma } from '@prisma/client'

// Type Predicate
export function isUniqueConstraintPrismaError(error: any): error is Prisma.PrismaClientKnownRequestError {
  return error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002'
}

export function isNotFoundPrismaError(error: any): error is Prisma.PrismaClientKnownRequestError {
  return error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025'
}
