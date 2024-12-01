import { prisma } from '@/db'
import { defineAction } from 'astro:actions'
import { z } from 'astro:schema'


export const updateUser = defineAction({
  accept: 'form',
  input: z.object({
    id: z.string({ message: '🆔 El id es requerido.' }),
    email: z.string({ message: '📧 El correo electrónico es requerido.' }).email( { message: '📧 El correo electrónico debe ser válido.' } ),
    name: z.string({ message: '👤 El nombre es requerido.' }).min( 2, { message: '👤 El nombre debe tener al menos 2 caracteres.' } ),
    lastName: z.string({ message: '👥 El apellido es requerido' }).min( 2, { message: '👥 El apellido debe tener al menos 2 caracteres.' } ),
    avatar: z.string().optional()
  }),
  handler: async ({ id, email, name, lastName, avatar }) => {
    const currentUser = await prisma.user.findUnique({
      where: { id }
    })

    if ( !currentUser ) {
      throw new Error( 'No se encontró el usuario. 💁‍♂️' )
    }

    await prisma.user.update({
      where: { id },
      data: {
        email,
        name,
        lastName,
        avatar
      }
    })

    return {
      success: true
    }
  }
})
