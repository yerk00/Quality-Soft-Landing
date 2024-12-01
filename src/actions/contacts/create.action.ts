import { prisma } from '@/db'
import { defineAction } from 'astro:actions'
import { z } from 'astro:schema'


export const createContact = defineAction({
  accept: 'form',
  input: z.object({
    name: z.string({ message: '📧 El nombre es requerido.' }).min( 2, { message: '📧 El nombre debe tener al menos 2 caracteres.' }),
    email: z.string({ message: '📧 El email es requerido.' }).email({ message: '📧 El email no es válido.' }),
    message: z.string({ message: '📧 El mensaje es requerido.' }).min( 2, { message: '📧 El mensaje debe tener al menos 2 caracteres.' }),
  }),
  handler: async ({ name, email, message }) => {
    try {
      await prisma.contactMessage.create({
        data: {
          name,
          email,
          message
        }
      })

      return {
        success: true
      }
    } catch ( error : any ) {
      console.log({ error })
      throw new Error( '📧 Error al enviar el mensaje.' )
    }

  }
})
