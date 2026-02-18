import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function POST(req: NextRequest) {
  const secret = req.headers.get('x-revalidation-secret');

  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json() as { path?: string; tag?: string; type?: string };

  if (body.path) {
    revalidatePath(body.path);
    return NextResponse.json({ revalidated: true, path: body.path });
  }

  if (body.tag) {
    revalidateTag(body.tag);
    return NextResponse.json({ revalidated: true, tag: body.tag });
  }

  // Revalidate by type
  if (body.type === 'blog') {
    revalidatePath('/blog', 'layout');
    return NextResponse.json({ revalidated: true, type: 'blog' });
  }

  if (body.type === 'guide') {
    revalidatePath('/guia', 'layout');
    return NextResponse.json({ revalidated: true, type: 'guide' });
  }

  if (body.type === 'events') {
    revalidatePath('/eventos', 'layout');
    return NextResponse.json({ revalidated: true, type: 'events' });
  }

  return NextResponse.json({ error: 'Provide path, tag, or type' }, { status: 400 });
}
