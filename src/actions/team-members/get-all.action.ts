import { prisma } from '@/db'
import { defineAction } from 'astro:actions'

export const getAllTeamMembers = defineAction({
  accept: 'json',

  handler: async () => {

    const [ teamMembers, count ] = await prisma.$transaction([
      prisma.teamMember.findMany(),
      prisma.teamMember.count()
    ])

    return {
      teamMembers,
      total: count
    }

  }
})
