import { prisma } from '@/db'
import { defineAction } from 'astro:actions'
import { z } from 'astro:schema'

export const updateTeamMember = defineAction({
  accept: 'form',
  input: z.object({
    id: z.string({ message: '🆔 El id es requerido.' }),
    name: z.string({ message: 'El nombre es requerido 🤷‍♂️' }),
    role: z.string({ message: 'El rol es requerido 🤷‍♂️' }),
    bio: z.string({ message:  'La biografía es requerida 🤷‍♂️' }),
    imageUrl: z.string().optional(),
  }),
  handler: async ({ id, name, role, bio, imageUrl }) => {
    const currentData = await prisma.teamMember.findUnique({
      where: { id }
    })

    if ( !currentData ) {
      throw new Error( 'No se encontró al miembro del equipo. 💁‍♂️' )
    }

    await prisma.teamMember.update({
      where: { id },
      data: {
        name,
        role,
        bio,
        imageUrl: ( imageUrl ) ? imageUrl : 'https://savethefrogs.com/wp-content/uploads/placeholder-image-blue-landscape.png',
      }
    })

    return {
      success: true
    }
  }
})

