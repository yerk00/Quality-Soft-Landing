import { prisma } from '@/db'
import { defineAction } from 'astro:actions'

export const getOneTeamMember = defineAction({
  accept: 'json',
  handler: async ({ id }) => {
    const data = await prisma.teamMember.findUnique({
      where: { id }
    })

    if ( !data ) {
      throw new Error( 'No se pudo encontrar al miembro del equipo. 💁‍♂️' )
    }

    return {
      teamMember: data
    }
  }
})
