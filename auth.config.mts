import { defineConfig } from 'auth-astro'
import type { AdapterUser } from '@auth/core/adapters'
import Credentials from '@auth/core/providers/credentials'
import { prisma } from '@/db'
import bcrypt from 'bcryptjs'


export default defineConfig({
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Correo electrónico 📧', type: 'email' },
        password: { label: 'Contraseña 🔒', type: 'password' }
      },
      authorize: async ({ email, password }) => {
        const user = await prisma.user.findUnique({
          where: {
            email: `${ email }`
          }
        })

        if ( !user ) {
          throw new Error( 'Parece que no existe un usuario con ese correo electrónico 📧' )
        }
        if ( bcrypt.compareSync( password as string, user.password ) !== true ) {
          throw new Error( 'La contraseña es incorrecta 🔒' )
        }

        const { password: _, ...userData } = user
        return userData
      }
    })
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if ( user ) token.user = user
      return token
    },
    session: ({ session, token }) => {
      session.user = token.user as AdapterUser
      return session
    }
  }
})
