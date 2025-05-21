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
    const { institution, degree, field, startYear, endYear } = body;
    if (!institution || !degree || !field || !startYear) {
      return NextResponse.json({ error: 'All fields except endYear are required.' }, { status: 400 });
    }
    const client = await clientPromise;
    const db = client.db('student_portfolio');
    const user = await db.collection('users').findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    const result = await db.collection('education').insertOne({
      userId: user._id,
      institution,
      degree,
      field,
      startYear,
      endYear,
      createdAt: new Date(),
    });
    return NextResponse.json({ success: true, id: result.insertedId });
  } catch {
    return NextResponse.json({ error: 'Failed to add education detail' }, { status: 500 });
  }
}
