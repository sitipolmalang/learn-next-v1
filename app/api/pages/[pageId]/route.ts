import { NextResponse } from 'next/server';
import { Role } from '@prisma/client';
import type { Prisma } from '@prisma/client';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { isValidSubdomain, normalizeSubdomain } from '@/lib/pages';

type PageParams = {
    params: Promise<{ pageId: string }>;
};

type UpdatePagePayload = {
    name?: unknown;
    subdomain?: unknown;
    blocks?: unknown;
};

async function getAllowedPage(pageId: string, userId: string, role: Role) {
    const page = await prisma.page.findUnique({
        where: { id: pageId },
    });

    if (!page) {
        return null;
    }

    if (role !== Role.ADMIN && page.ownerId !== userId) {
        return null;
    }

    return page;
}

export async function GET(_: Request, { params }: PageParams) {
    const session = await auth();

    if (!session?.user?.id) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { pageId } = await params;
    const page = await getAllowedPage(pageId, session.user.id, session.user.role);

    if (!page) {
        return NextResponse.json({ error: 'Halaman tidak ditemukan.' }, { status: 404 });
    }

    return NextResponse.json({ page });
}

export async function PATCH(request: Request, { params }: PageParams) {
    const session = await auth();

    if (!session?.user?.id) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { pageId } = await params;
    const existingPage = await getAllowedPage(pageId, session.user.id, session.user.role);

    if (!existingPage) {
        return NextResponse.json({ error: 'Halaman tidak ditemukan.' }, { status: 404 });
    }

    let payload: UpdatePagePayload;

    try {
        payload = (await request.json()) as UpdatePagePayload;
    } catch {
        return NextResponse.json({ error: 'Payload tidak valid.' }, { status: 400 });
    }

    const data: Prisma.PageUpdateInput = {};

    if (typeof payload.name === 'string' && payload.name.trim()) {
        data.name = payload.name.trim();
    }

    if (typeof payload.subdomain === 'string') {
        const normalizedSubdomain = normalizeSubdomain(payload.subdomain);
        if (!isValidSubdomain(normalizedSubdomain)) {
            return NextResponse.json({ error: 'Subdomain tidak valid.' }, { status: 400 });
        }
        data.subdomain = normalizedSubdomain;
    }

    if (Array.isArray(payload.blocks)) {
        data.blocks = payload.blocks as unknown as Prisma.InputJsonValue;
    }

    try {
        const page = await prisma.page.update({
            where: { id: pageId },
            data,
        });

        return NextResponse.json({ page });
    } catch (error: unknown) {
        const typedError = error as { code?: string };
        if (typedError.code === 'P2002') {
            return NextResponse.json(
                { error: 'Subdomain sudah dipakai. Gunakan subdomain lain.' },
                { status: 409 }
            );
        }

        return NextResponse.json({ error: 'Gagal memperbarui halaman.' }, { status: 500 });
    }
}

export async function DELETE(_: Request, { params }: PageParams) {
    const session = await auth();

    if (!session?.user?.id) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { pageId } = await params;
    const page = await getAllowedPage(pageId, session.user.id, session.user.role);

    if (!page) {
        return NextResponse.json({ error: 'Halaman tidak ditemukan.' }, { status: 404 });
    }

    await prisma.page.delete({
        where: { id: pageId },
    });

    return NextResponse.json({ success: true });
}
