import { defineAction } from 'astro:actions'
import { prisma } from '@/db'
import { usersSeedData } from '@/seed'
import bcrypt from 'bcryptjs'

export const usersSeed = defineAction({
  accept: 'json',
  handler: async () => {
    const existsUser = await prisma.user.findUnique({
      where: {
        email: usersSeedData[ 0 ].email
      }
    })
    if ( existsUser ) {
      throw new Error( 'Seed already exists' )
    }

    await prisma.user.createMany({
      data: usersSeedData.map( user => ({
        ...user,
        password: bcrypt.hashSync( user.password, 10 ),
        role: 'ADMIN'
      }) )
    })

    return { success: true }
  }
})
