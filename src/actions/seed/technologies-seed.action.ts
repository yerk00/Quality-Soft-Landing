import { defineAction } from 'astro:actions'
import { prisma } from '@/db'
import { technologiesSeedData } from '@/seed'

export const technologiesSeed = defineAction({
  accept: 'json',
  handler: async () => {
    try {

      const countData = await prisma.technology.count()
      if ( countData > 0 ) {
        throw new Error( 'Seed already exists' )
      }

      await prisma.technology.createMany({
        data: technologiesSeedData.map( ( data ) => ({
          ...data
        }) )
      })

      return { success: true }
    } catch ( error : any ) {
      console.error( error )
      throw new Error( error )
    }
  }
})
