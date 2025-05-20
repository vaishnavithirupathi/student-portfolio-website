import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

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
