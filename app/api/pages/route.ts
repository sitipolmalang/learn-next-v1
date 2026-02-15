import { NextResponse } from 'next/server';
import type { Prisma } from '@prisma/client';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { defaultTemplates } from '@/app/components/templates/defaults';
import { isValidSubdomain, normalizeSubdomain } from '@/lib/pages';

type CreatePagePayload = {
    name?: unknown;
    templateId?: unknown;
    subdomain?: unknown;
};

export async function GET() {
    const session = await auth();

    if (!session?.user?.id) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const pages = await prisma.page.findMany({
        where: { ownerId: session.user.id },
        orderBy: { updatedAt: 'desc' },
    });

    return NextResponse.json({ pages });
}

export async function POST(request: Request) {
    const session = await auth();

    if (!session?.user?.id) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let payload: CreatePagePayload;

    try {
        payload = (await request.json()) as CreatePagePayload;
    } catch {
        return NextResponse.json({ error: 'Payload tidak valid.' }, { status: 400 });
    }

    const name = typeof payload.name === 'string' ? payload.name.trim() : '';
    const templateId = typeof payload.templateId === 'string' ? payload.templateId.trim() : '';
    const subdomain = typeof payload.subdomain === 'string' ? normalizeSubdomain(payload.subdomain) : '';

    if (!name) {
        return NextResponse.json({ error: 'Nama halaman wajib diisi.' }, { status: 400 });
    }

    if (!templateId) {
        return NextResponse.json({ error: 'Template wajib dipilih.' }, { status: 400 });
    }

    if (!isValidSubdomain(subdomain)) {
        return NextResponse.json({ error: 'Subdomain tidak valid.' }, { status: 400 });
    }

    const selectedTemplate = defaultTemplates.find((template) => template.id === templateId);

    if (!selectedTemplate) {
        return NextResponse.json({ error: 'Template tidak ditemukan.' }, { status: 400 });
    }

    try {
        const page = await prisma.page.create({
            data: {
                name,
                templateId,
                subdomain,
                ownerId: session.user.id,
                blocks: selectedTemplate.blocks as unknown as Prisma.InputJsonValue,
            },
        });

        return NextResponse.json({ page }, { status: 201 });
    } catch (error: unknown) {
        const typedError = error as { code?: string };
        if (typedError.code === 'P2002') {
            return NextResponse.json(
                { error: 'Subdomain sudah dipakai. Gunakan subdomain lain.' },
                { status: 409 }
            );
        }
        return NextResponse.json({ error: 'Gagal membuat halaman.' }, { status: 500 });
    }
}
