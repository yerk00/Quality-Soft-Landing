import { prisma } from '@/db'
import { defineAction } from 'astro:actions'

export const getAllUsers = defineAction({
  accept: 'json',

  handler: async () => {

    const [ users, count ] = await prisma.$transaction([
      prisma.user.findMany(),
      prisma.user.count()
    ])

    return {
      users,
      total: count
    }

  }
})
