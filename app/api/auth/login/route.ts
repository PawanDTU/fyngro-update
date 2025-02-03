// app/api/auth/login/route.ts
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '@/models/User' // Assuming you have a User model defined
import connectDB from '@/lib/mongodb'

export async function POST(request: Request) {
  await connectDB() // Ensure that MongoDB is connected

  try {
    const { email, password } = await request.json()

    // Find user by email
    const user = await User.findOne({ email })
    console.log({user});
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }

    // Compare provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 })
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' } // Token expiration time (optional)
    )

    // Respond with the token
    return NextResponse.json({ message: 'Login successful', token }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'An error occurred' }, { status: 500 })
  }
}
