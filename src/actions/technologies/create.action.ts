import { prisma } from '@/db'
import { defineAction } from 'astro:actions'
import { z } from 'astro:schema'


export const createService = defineAction({
  accept: 'form',
  input: z.object({
    title: z.string({ message: '📧 El título es requerido.' }).min( 2, { message: '📧 El título debe tener al menos 2 caracteres.' }),
    icon: z.string({ message: '📧 El icono es requerido.' }).min( 2, { message: '📧 El icono debe tener al menos 2 caracteres.' }),
    imageUrl: z.string({ message: '📧 La imagen es requerida.' }).min( 2, { message: '📧 La imagen debe tener al menos 2 caracteres.' }),
    description: z.string({ message: '📧 La descripción es requerida.' }).min( 2, { message: '📧 La descripción debe tener al menos 2 caracteres.' }),
  }),
  handler: async ({ title, icon, imageUrl, description }) => {
    try {
      await prisma.service.create({
        data: {
          title,
          description,
          icon,
          imageUrl: ( imageUrl ) ? imageUrl : 'https://savethefrogs.com/wp-content/uploads/placeholder-image-blue-landscape.png',
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
