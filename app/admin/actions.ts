'use server';

import { revalidatePath } from 'next/cache';
import { Role } from '@prisma/client';
import { requireAdmin } from '@/lib/authz';
import { prisma } from '@/lib/prisma';

const PRIMARY_ADMIN_EMAIL = 'wahidikqbal@gmail.com';

export async function setUserRoleAction(formData: FormData) {
    await requireAdmin();
    const userId = String(formData.get('userId') ?? '');
    const role = String(formData.get('role') ?? '');

    if (!userId || (role !== Role.ADMIN && role !== Role.USER)) {
        return;
    }

    await prisma.user.update({
        where: { id: userId },
        data: { role: role as Role },
    });

    revalidatePath('/admin');
}

export async function deleteAnyPageAction(formData: FormData) {
    await requireAdmin();
    const pageId = String(formData.get('pageId') ?? '');

    if (!pageId) {
        return;
    }

    await prisma.page.delete({
        where: { id: pageId },
    });

    revalidatePath('/admin');
}

export async function deleteUserAction(formData: FormData) {
    const session = await requireAdmin();
    const userId = String(formData.get('userId') ?? '');

    if (!userId) {
        return;
    }

    if (userId === session.user.id) {
        return;
    }

    const targetUser = await prisma.user.findUnique({
        where: { id: userId },
        select: { email: true },
    });

    if (!targetUser) {
        return;
    }

    if (
        targetUser.email &&
        targetUser.email.toLowerCase() === PRIMARY_ADMIN_EMAIL.toLowerCase()
    ) {
        return;
    }

    await prisma.user.delete({
        where: { id: userId },
    });

    revalidatePath('/admin');
}
