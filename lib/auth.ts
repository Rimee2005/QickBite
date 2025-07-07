import bcrypt from 'bcryptjs'

/**
 * Hash a password using bcrypt
 * @param password - The plain text password to hash
 * @param saltRounds - Number of salt rounds (default: 12)
 * @returns Promise<string> - The hashed password
 */
export async function hashPassword(password: string, saltRounds: number = 12): Promise<string> {
  return bcrypt.hash(password, saltRounds)
}

/**
 * Verify a password against a hash
 * @param password - The plain text password to verify
 * @param hash - The hashed password to compare against
 * @returns Promise<boolean> - True if password matches, false otherwise
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

/**
 * Generate a random password
 * @param length - Length of the password (default: 12)
 * @returns string - A random password
 */
export function generateRandomPassword(length: number = 12): string {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*'
  let password = ''
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length))
  }
  return password
}
