// app/auth/signout/route.js

import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request) {
  const supabase = createClient()

  // Sign out the user
  const { error } = await supabase.auth.signOut()

  console.log(error)
  if (error) {
    // If there's an error, redirect to an error page
    return NextResponse.redirect(new URL('/error', request.url))
  }

  console.log('User signed out successfully')
  // Redirect to the home page after successful sign-out
  return NextResponse.redirect(new URL('/', request.url))
}