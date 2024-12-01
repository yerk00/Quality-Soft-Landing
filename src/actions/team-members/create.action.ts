import { prisma } from '@/db'
import { defineAction } from 'astro:actions'
import { z } from 'astro:schema'

export const createTeamMember = defineAction({
  accept: 'form',
  input: z.object({
    name: z.string({ message: 'El nombre es requerido 🤷‍♂️' }),
    role: z.string({ message: 'El rol es requerido 🤷‍♂️' }),
    bio: z.string({ message:  'La biografía es requerida 🤷‍♂️' }),
    imageUrl: z.string().optional(),
  }),
  handler: async ({ name, role, bio, imageUrl }) => {
    try {
      await prisma.teamMember.create({
        data: {
          name,
          role,
          bio,
          imageUrl: ( imageUrl ) ? imageUrl : 'https://qualitysoft-1f745.web.app/img/ing.png',
        }
      })

      return {
        success: true
      }
    } catch ( error : any ) {
      console.log({ error })
      throw new Error( 'No se pudo crear al nuevo miembro nuestro equipo. 💁‍♂️' )
    }

  }
})
