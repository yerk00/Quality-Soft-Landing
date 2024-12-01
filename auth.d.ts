import type { DefaultUser, DefaultSession } from '@auth/core/types'

declare module '@auth/core/types' {
  interface User extends DefaultUser {
    name: string
    lastName: string
    email: string
    avatar: string | null
    role: string
    status: boolean
  }

  interface Session extends DefaultSession {
    user: User
  }
}
