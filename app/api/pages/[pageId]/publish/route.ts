import { NextResponse } from 'next/server';
import { Role } from '@prisma/client';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

type PageParams = {
    params: Promise<{ pageId: string }>;
};

export async function POST(_: Request, { params }: PageParams) {
    const session = await auth();

    if (!session?.user?.id) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { pageId } = await params;
    const page = await prisma.page.findUnique({
        where: { id: pageId },
    });

    if (!page) {
        return NextResponse.json({ error: 'Halaman tidak ditemukan.' }, { status: 404 });
    }

    if (session.user.role !== Role.ADMIN && page.ownerId !== session.user.id) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const updatedPage = await prisma.page.update({
        where: { id: page.id },
        data: { isPublished: true },
    });

    return NextResponse.json({
        success: true,
        subdomain: updatedPage.subdomain,
        publishedAt: updatedPage.updatedAt,
        url: `http://${updatedPage.subdomain}.localhost:3000`,
    });
}
