import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { compare } from "bcrypt"
import { connectToDatabase } from "@/lib/mongodb"
import { User } from "@/lib/models/User"

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials")
        }

        await connectToDatabase()

        const user = await User.findOne({ email: credentials.email })

        if (!user) {
          throw new Error("Invalid credentials")
        }

        const isPasswordValid = await compare(credentials.password, user.password)

        if (!isPasswordValid) {
          throw new Error("Invalid credentials")
        }

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          type: user.type,
          ...(user.type === 'student' && { registrationNumber: user.registrationNumber })
        }
      }
    })
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.type = user.type
        if (user.type === 'student') {
          token.registrationNumber = user.registrationNumber
        }
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id
        session.user.type = token.type
        if (token.type === 'student') {
          session.user.registrationNumber = token.registrationNumber
        }
      }
      return session
    }
  },
  session: {
    strategy: "jwt",
  },
})

export { handler as GET, handler as POST }
