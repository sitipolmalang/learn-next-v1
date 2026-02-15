import { NextResponse } from 'next/server';
import type { Prisma } from '@prisma/client';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { isValidSubdomain, normalizeSubdomain } from '@/lib/pages';

type PublishPayload = {
    subdomain?: unknown;
    blocks?: unknown;
    templateId?: unknown;
    name?: unknown;
};

export async function POST(request: Request) {
    const session = await auth();

    if (!session?.user?.id) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let payload: PublishPayload;

    try {
        payload = (await request.json()) as PublishPayload;
    } catch {
        return NextResponse.json({ error: 'Payload tidak valid.' }, { status: 400 });
    }

    const subdomain = typeof payload.subdomain === 'string'
        ? normalizeSubdomain(payload.subdomain)
        : '';

    if (!isValidSubdomain(subdomain)) {
        return NextResponse.json({ error: 'Subdomain tidak valid.' }, { status: 400 });
    }

    if (!Array.isArray(payload.blocks)) {
        return NextResponse.json({ error: 'Data blocks tidak valid.' }, { status: 400 });
    }

    const name = typeof payload.name === 'string' && payload.name.trim()
        ? payload.name.trim()
        : `Website ${new Date().toLocaleDateString('id-ID')}`;

    const templateId = typeof payload.templateId === 'string' && payload.templateId.trim()
        ? payload.templateId.trim()
        : 'custom';

    try {
        const page = await prisma.page.create({
            data: {
                name,
                templateId,
                subdomain,
                blocks: payload.blocks as Prisma.InputJsonValue,
                ownerId: session.user.id,
                isPublished: true,
            },
        });

        return NextResponse.json({
            success: true,
            pageId: page.id,
            subdomain: page.subdomain,
            publishedAt: page.updatedAt,
            url: `http://${page.subdomain}.localhost:3000`,
        });
    } catch (error: unknown) {
        const typedError = error as { code?: string };
        if (typedError.code === 'P2002') {
            return NextResponse.json(
                { error: 'Subdomain sudah dipakai.' },
                { status: 409 }
            );
        }
        return NextResponse.json({ error: 'Publish gagal.' }, { status: 500 });
    }
}
