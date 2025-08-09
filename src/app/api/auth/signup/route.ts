import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/app/api/lib/db'
import { hashPassword, generateToken } from '@/app/api/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const firstName = body.firstName?.trim()
    const lastName = body.lastName?.trim()
    const email = body.email?.trim().toLowerCase()
    const password = body.password
    const inputRole = body.role?.toLowerCase()

    const allowedRoles = ['candidate', 'recruiter', 'admin']
    const role = allowedRoles.includes(inputRole) ? inputRole : 'candidate'

    // Validate input
    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Check if user already exists
    // const existingUser = await prisma.user.findUnique({
    //   where: { email }
    // })

    // if (existingUser) {
    //   return NextResponse.json(
    //     { error: 'User already exists with this email' },
    //     { status: 400 }
    //   )
    // }

    // Hash password
    const hashedPassword = await hashPassword(password)

    // Create user
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true
      }
    })

    // Generate token
    const token = generateToken(user.id, user.role, user.email)

    return NextResponse.json(
      {
        message: 'User created successfully',
        user,
        token
      },
      { status: 201 }
    )

  } catch (error: any) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
