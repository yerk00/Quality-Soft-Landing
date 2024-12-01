import { prisma } from '@/db'
import { defineAction } from 'astro:actions'

export const getOneUser = defineAction({
  accept: 'json',
  handler: async ({ id }) => {
    const user = await prisma.user.findUnique({
      where: { id }
    })

    if ( !user ) {
      throw new Error( 'No se pudo encontrar el usuario' )
    }

    return {
      user
    }
  }
})
