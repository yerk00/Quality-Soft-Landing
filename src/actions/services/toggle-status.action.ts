import { prisma } from '@/db'
import { defineAction } from 'astro:actions'

export const toggleStatusService = defineAction({
  accept: 'json',
  handler: async ({ id }) => {
    const currentData = await prisma.service.findUnique({
      where: { id }
    })

    if ( !currentData ) {
      throw new Error( 'No se encontró el servicio. 💁‍♂️' )
    }

    await prisma.service.update({
      where: { id },
      data: {
        status: !currentData.status
      }
    })

    return {
      success: true
    }
  }
})
