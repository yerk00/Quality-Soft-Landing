import { prisma } from '@/db'
import { defineAction } from 'astro:actions'

export const toggleStatusTeamMember = defineAction({
  accept: 'json',
  handler: async ({ id }) => {
    const currentData = await prisma.teamMember.findUnique({
      where: { id }
    })

    if ( !currentData ) {
      throw new Error( 'No se encontró al miembro del equipo. 💁‍♂️' )
    }

    await prisma.teamMember.update({
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
