import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const body = await req.json();
    const { bio, skills, githubUrl, linkedinUrl, twitterUrl } = body;
    const client = await clientPromise;
    const db = client.db('student_portfolio');
    const user = await db.collection('users').findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    await db.collection('users').updateOne(
      { email: session.user.email },
      { 
        $set: {
          bio,
          skills: skills.split(',').map((skill: string) => skill.trim()),
          socialLinks: {
            github: githubUrl,
            linkedin: linkedinUrl,
            twitter: twitterUrl
          },
          updatedAt: new Date()
        }
      }
    );
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
  }
}
