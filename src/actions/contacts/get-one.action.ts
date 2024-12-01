import { prisma } from '@/db'
import { defineAction } from 'astro:actions'

export const getOneContact = defineAction({
  accept: 'json',
  handler: async ({ id }) => {
    const data = await prisma.contactMessage.findUnique({
      where: { id }
    })

    if ( !data ) {
      console.log({ id })
      throw new Error( 'No se pudo encontrar el contacto. 💁‍♂️' )
    }

    return {
      contact: data
    }
  }
})
