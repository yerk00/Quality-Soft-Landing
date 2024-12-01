import { prisma } from '@/db'
import { defineAction } from 'astro:actions'
import { z } from 'astro:schema'


export const updateService = defineAction({
  accept: 'form',
  input: z.object({
    id: z.string({ message: '🆔 El id es requerido.' }),
    title: z.string({ message: '📧 El título es requerido.' }).min( 2, { message: '📧 El título debe tener al menos 2 caracteres.' }),
    icon: z.string({ message: '📧 El icono es requerido.' }).min( 2, { message: '📧 El icono debe tener al menos 2 caracteres.' }),
    description: z.string({ message: '📧 La descripción es requerida.' }).min( 2, { message: '📧 La descripción debe tener al menos 2 caracteres.' }),
    imageUrl: z.string().optional(),
    link: z.string().optional(),
  }),
  handler: async ({ id, title, icon, imageUrl, description, link }) => {
    const currentData = await prisma.service.findUnique({
      where: { id }
    })

    if ( !currentData ) {
      throw new Error( 'No se encontró el servicio. 💁‍♂️' )
    }

    await prisma.service.update({
      where: { id },
      data: {
        title,
        icon,
        link: ( link ) ? link : null,
        imageUrl: ( imageUrl ) ? imageUrl : 'https://savethefrogs.com/wp-content/uploads/placeholder-image-blue-landscape.png',
        description
      }
    })

    return {
      success: true
    }
  }
})

