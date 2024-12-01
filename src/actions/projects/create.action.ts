import { prisma } from '@/db'
import { defineAction } from 'astro:actions'
import { z } from 'astro:schema'


export const createProject = defineAction({
  accept: 'form',
  input: z.object({
    title: z.string({ message: '📧 El título es requerido.' }).min( 2, { message: '📧 El título debe tener al menos 2 caracteres.' }),
    imageUrl: z.string({ message: '📧 La imagen es requerida.' }).min( 2, { message: '📧 La imagen debe tener al menos 2 caracteres.' }),
    description: z.string({ message: '📧 La descripción es requerida.' }).min( 2, { message: '📧 La descripción debe tener al menos 2 caracteres.' }),
    client: z.string({ message: '📧 El cliente es requerido.' }).min( 2, { message: '📧 El cliente debe tener al menos 2 caracteres.' }),
    startDate: z.string({ message: '📧 La fecha de inicio es requerida.' }).min( 2, { message: '📧 La fecha de inicio debe tener al menos 2 caracteres.' }),
    endDate: z.string({ message: '📧 La fecha de finalización es requerida.' }).min( 2, { message: '📧 La fecha de finalización debe tener al menos 2 caracteres.' }),
    category: z.string({ message: '📧 La categoría es requerida.' }).min( 2, { message: '📧 La categoría debe tener al menos 2 caracteres.' }),
    serviceId: z.string({ message: '📧 Los servicios es requerida.' }).min( 2, { message: '📧 Los servicios debe tener al menos 2 caracteres.' }),
    link: z.string().optional(),
  }),
  handler: async ({ title, client, startDate, endDate, category, serviceId, imageUrl, description, link }) => {

    const servicesDB = await prisma.service.findUnique({
      where: {
        id: serviceId
      }
    })

    if ( !servicesDB ) {
      throw new Error( 'No se encontró el servicio. 💁‍♂️' )
    }

    try {
      await prisma.project.create({
        data: {
          title,
          description,
          client,
          startDate: new Date( startDate ),
          endDate: new Date( endDate ),
          category,
          serviceId,
          imageUrl: ( imageUrl ) ? imageUrl : 'https://savethefrogs.com/wp-content/uploads/placeholder-image-blue-landscape.png',
          link: ( link ) ? link : null,
        }
      })

      return {
        success: true
      }
    } catch ( error : any ) {
      console.log({ error })
      throw new Error( 'No se pudo crear el proyecto. 💁‍♂️' )
    }

  }
})
