import { prisma } from '@/db'
import { defineAction } from 'astro:actions'
import { z } from 'astro:schema'


export const updateProject = defineAction({
  accept: 'form',
  input: z.object({
    id: z.string({ message: '🆔 El id es requerido.' }),
    title: z.string({ message: '📧 El título es requerido.' }).min( 2, { message: '📧 El título debe tener al menos 2 caracteres.' }),
    imageUrl: z.string().optional(),
    description: z.string({ message: '📧 La descripción es requerida.' }).min( 2, { message: '📧 La descripción debe tener al menos 2 caracteres.' }),
    client: z.string({ message: '📧 El cliente es requerido.' }).min( 2, { message: '📧 El cliente debe tener al menos 2 caracteres.' }),
    startDate: z.string({ message: '📧 La fecha de inicio es requerida.' }).min( 2, { message: '📧 La fecha de inicio debe tener al menos 2 caracteres.' }),
    endDate: z.string({ message: '📧 La fecha de finalización es requerida.' }).min( 2, { message: '📧 La fecha de finalización debe tener al menos 2 caracteres.' }),
    category: z.string({ message: '📧 La categoría es requerida.' }).min( 2, { message: '📧 La categoría debe tener al menos 2 caracteres.' }),
    serviceId: z.string({ message: '📧 Los servicios es requerida.' }).min( 2, { message: '📧 Los servicios debe tener al menos 2 caracteres.' }),
    link: z.string().optional(),
  }),
  handler: async ({ id, title, imageUrl, description, client, startDate, endDate, category, serviceId, link }) => {
    const currentData = await prisma.project.findUnique({
      where: { id }
    })

    if ( !currentData ) {
      throw new Error( 'No se encontró el proyecto. 💁‍♂️' )
    }

    await prisma.project.update({
      where: { id },
      data: {
        title,
        client,
        startDate: new Date( startDate ),
        endDate: new Date( endDate ),
        category,
        serviceId,
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

