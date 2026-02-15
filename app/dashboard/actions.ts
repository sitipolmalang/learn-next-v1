'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import type { Prisma } from '@prisma/client';
import { signOut } from '@/auth';
import { requireUser } from '@/lib/authz';
import { prisma } from '@/lib/prisma';
import { defaultTemplates } from '@/app/components/templates/defaults';
import { isValidSubdomain, normalizeSubdomain } from '@/lib/pages';

export async function createPageAction(formData: FormData) {
    const session = await requireUser();
    const name = String(formData.get('name') ?? '').trim();
    const templateId = String(formData.get('templateId') ?? '').trim();
    const subdomain = normalizeSubdomain(String(formData.get('subdomain') ?? ''));

    if (!name || !templateId || !isValidSubdomain(subdomain)) {
        redirect('/dashboard?error=invalid-create');
    }

    const template = defaultTemplates.find((item) => item.id === templateId);

    if (!template) {
        redirect('/dashboard?error=template-not-found');
    }

    let pageId: string;

    try {
        const page = await prisma.page.create({
            data: {
                name,
                templateId,
                subdomain,
                blocks: template.blocks as unknown as Prisma.InputJsonValue,
                ownerId: session.user.id,
            },
        });
        pageId = page.id;
    } catch (error: unknown) {
        const typedError = error as { code?: string };
        if (typedError.code === 'P2002') {
            redirect('/dashboard?error=subdomain-conflict');
        }
        redirect('/dashboard?error=create-failed');
    }

    redirect(`/edit/${pageId}`);
}

export async function deletePageAction(formData: FormData) {
    const session = await requireUser();
    const pageId = String(formData.get('pageId') ?? '');

    await prisma.page.deleteMany({
        where: {
            id: pageId,
            ownerId: session.user.id,
        },
    });

    revalidatePath('/dashboard');
}

export async function publishPageAction(formData: FormData) {
    const session = await requireUser();
    const pageId = String(formData.get('pageId') ?? '');

    await prisma.page.updateMany({
        where: {
            id: pageId,
            ownerId: session.user.id,
        },
        data: {
            isPublished: true,
        },
    });

    revalidatePath('/dashboard');
}

export async function signOutAction() {
    await signOut({ redirectTo: '/login' });
}
