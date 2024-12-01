import { defineMiddleware } from 'astro:middleware'
import { getSession } from 'auth-astro/server'


export const onRequest = defineMiddleware(
  async ( { url, locals, redirect, request }, next ) => {
    const session = await getSession( request )
    const isAuthenticated = !!session
    const user = session?.user

    locals.isAuthenticated = isAuthenticated
    locals.user = null

    if ( user ) {
      locals.user = {
        name: user.name!,
        email: user.email!,
        lastName: user.lastName!,
        role: user.role!,
        avatar: user.avatar,
        status: user.status,
      }
    }
    const pathname = url.pathname

    if ( isAuthenticated && ( pathname.startsWith( '/auth' ) || pathname === '/' ) ) {
      return redirect( '/admin' )
    }

    if ( !isAuthenticated && pathname.startsWith( '/admin' ) ) {
      return redirect( '/auth/signin' )
    }

    return next()
  }
)
