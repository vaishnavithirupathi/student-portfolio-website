import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import clientPromise from '@/lib/mongodb';
import { compare } from 'bcryptjs';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'jsmith@email.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const client = await clientPromise;
          const db = client.db('student_portfolio');
          const user = await db.collection('users').findOne({ email: credentials?.email });
          if (!user) {
            throw new Error('No user found with this email');
          }
          if (!credentials?.password) {
            throw new Error('Please enter your password');
          }
          const isValid = await compare(credentials.password, user.password);
          if (!isValid) {
            throw new Error('Invalid password');
          }
          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
          };
        } catch (error: unknown) {
          if (error instanceof Error) {
            throw new Error(error.message || 'Authentication failed');
          }
          throw new Error('Authentication failed');
        }
      },
    }),
  ],
  session: { 
    strategy: 'jwt' as const,
    maxAge: 30 * 24 * 60 * 60, 
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/signin',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && typeof token.id === 'string') {
        (session.user as { id?: string }).id = token.id;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export async function requireAuth() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect('/auth/signin');
  }
  
  return session;
}

export async function requireNoAuth() {
  const session = await getServerSession(authOptions);
  
  if (session) {
    redirect('/portfolio');
  }
}
