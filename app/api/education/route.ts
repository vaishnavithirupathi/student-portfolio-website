import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const client = await clientPromise;
    const db = client.db('student_portfolio');
    const user = await db.collection('users').findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    const education = await db.collection('education')
      .find({ userId: user._id })
      .sort({ startYear: -1 })
      .toArray();
    return NextResponse.json({ education });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch education details' }, { status: 500 });
  }
}
