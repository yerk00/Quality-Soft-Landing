import { prisma } from '@/db'
import { defineAction } from 'astro:actions'

export const getOneProject = defineAction({
  accept: 'json',
  handler: async ({ id }) => {
    const data = await prisma.project.findUnique({
      where: { id }
    })

    if ( !data ) {
      throw new Error( 'No se pudo encontrar el proyecto. 💁‍♂️' )
    }

    return {
      project: data
    }
  }
})
