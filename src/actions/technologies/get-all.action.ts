import { prisma } from '@/db'
import { defineAction } from 'astro:actions'

export const getAllTechnologies = defineAction({
  accept: 'json',

  handler: async () => {

    const [ technologies, count ] = await prisma.$transaction([
      prisma.technology.findMany(),
      prisma.technology.count()
    ])

    return {
      technologies,
      total: count
    }

  }
})
