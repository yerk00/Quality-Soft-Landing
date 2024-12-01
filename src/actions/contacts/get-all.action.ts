import { prisma } from '@/db'
import { defineAction } from 'astro:actions'

export const getAllContacts = defineAction({
  accept: 'json',

  handler: async () => {

    const [ contacts, count ] = await prisma.$transaction([
      prisma.contactMessage.findMany(),
      prisma.contactMessage.count()
    ])

    return {
      contacts,
      total: count
    }

  }
})
