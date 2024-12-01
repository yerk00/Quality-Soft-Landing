import { prisma } from '@/db'
import { defineAction } from 'astro:actions'

export const getOneService = defineAction({
  accept: 'json',
  handler: async ({ id }) => {
    const data = await prisma.service.findUnique({
      where: { id }
    })

    if ( !data ) {
      throw new Error( 'No se pudo encontrar el servicio. 💁‍♂️' )
    }

    return {
      service: data
    }
  }
})
