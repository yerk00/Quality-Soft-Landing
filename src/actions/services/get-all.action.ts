import { prisma } from '@/db'
import { defineAction } from 'astro:actions'

export const getAllServices = defineAction({
  accept: 'json',

  handler: async () => {

    const [ services, count ] = await prisma.$transaction([
      prisma.service.findMany(),
      prisma.service.count()
    ])

    return {
      services,
      total: count
    }

  }
})
