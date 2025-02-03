// app/api/auth/register/route.ts
import { NextResponse } from 'next/server'
import User from '@/models/User' // Assuming you have a User model defined
import connectDB from '@/lib/mongodb'

export async function POST(request: Request) {
  await connectDB() // Ensure that MongoDB is connected

  try {
    const { name, email, password } = await request.json()
    if(!name || !email || !password){
        return NextResponse.json({ message: 'Please fill all the fields' }, { status: 400 })
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 })
    }

    // Create the new user
    const newUser  = await User.create({
        name,
        email,
        password,
    });

    // Respond with a success message (You can add more details like JWT here)
    return NextResponse.json({ message: 'User created successfully' }, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'An error occurred', error }, { status: 500 })
  }
}
