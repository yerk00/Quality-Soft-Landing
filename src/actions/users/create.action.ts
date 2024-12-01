import { prisma } from '@/db'
import type { Role } from '@prisma/client'
import { defineAction } from 'astro:actions'
import { z } from 'astro:schema'
import bcrypt from 'bcryptjs'


export const createUser = defineAction({
  accept: 'form',
  input: z.object({
    email: z.string({ message: '📧 El correo electrónico es requerido.' }).email( { message: '📧 El correo electrónico debe ser válido.' } ),
    password: z.string({ message: '🔒 La contraseña es requerida.' }).min( 6, { message: '🔒 La contraseña debe tener al menos 6 caracteres.' } ),
    confirmPassword: z.string({ message: '🔑 La confirmación de la contraseña es requerida.' }),
    name: z.string({ message: '👤 El nombre es requerido.' }).min( 2, { message: '👤 El nombre debe tener al menos 2 caracteres.' } ),
    lastName: z.string({ message: '👥 El apellido es requerido' }).min( 2, { message: '👥 El apellido debe tener al menos 2 caracteres.' } ),
    role: z.string().optional(),
    avatar: z.string().optional()
  }).refine( ({ password, confirmPassword }) => {
    return password === confirmPassword
  }, {
      message: '🔑 La confirmación de la contraseña debe ser igual a la contraseña.',
      path: [ 'confirmPassword' ],
  }),
  handler: async ({ email, password, name, lastName, role, avatar }) => {
    try {
      await prisma.user.create({
        data: {
          email,
          password: bcrypt.hashSync( password, 10 ),
          name,
          lastName,
          role: ( role ) ? role as Role : 'ADMIN',
          avatar
        }
      })

      return {
        success: true
      }
    } catch ( error : any ) {
      console.log({ error })
      throw new Error( 'No se pudo crear el usuario. 💁‍♂️' )
    }

  }
})
