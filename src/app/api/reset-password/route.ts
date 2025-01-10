// app/api/reset-password/route.js
import { NextResponse } from 'next/server'
import PocketBase from 'pocketbase'

export async function POST(request: Request) {
  const { id, password, confirmPassword } = await request.json()

  const superClient = new PocketBase(process.env.POCKETBASE_URL) // Replace with your PocketBase URL
  superClient.autoCancellation(false)
  await superClient
    .collection('_superusers')
    .authWithPassword(
      process.env.POCKETBASE_SUPER_ADMIN_EMAIL!,
      process.env.POCKETBASE_SUPER_ADMIN_PASSWORD!,
    )
  console.log('is super user', superClient.authStore.isSuperuser)
  console.log(id, password, confirmPassword)
  // Validate input
  try {
    if (!id || !password || !confirmPassword) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (password !== confirmPassword) {
      return NextResponse.json({ error: 'Passwords do not match' }, { status: 400 })
    }

    // Initialize PocketBase client with super admin privileges

    // Update the user's passwordo
    await superClient.collection('users').update(id, {
      password: password,
      passwordConfirm: confirmPassword,
    })

    superClient.authStore.clear()

    return NextResponse.json({ message: 'Password reset successfully' }, { status: 200 })
  } catch (error) {
    console.error('Password reset error:', error)
    superClient.authStore.clear()
    return NextResponse.json({ error: 'Failed to reset password' }, { status: 500 })
  }
}
