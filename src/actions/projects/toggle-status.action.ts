import { prisma } from '@/db'
import { defineAction } from 'astro:actions'

export const toggleStatusProject = defineAction({
  accept: 'json',
  handler: async ({ id }) => {
    const currentData = await prisma.project.findUnique({
      where: { id }
    })

    if ( !currentData ) {
      throw new Error( 'No se encontró el proyecto. 💁‍♂️' )
    }

    await prisma.project.update({
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
