import { Prisma, Role } from '@prisma/client';
import type { Block } from '@/app/components/editor/types/editor';
import { prisma } from '@/lib/prisma';

const SUBDOMAIN_REGEX = /^[a-z0-9](?:[a-z0-9-]{1,61}[a-z0-9])?$/;

export type ManagedPage = {
    id: string;
    name: string;
    subdomain: string;
    templateId: string;
    blocks: Block[];
    isPublished: boolean;
    ownerId: string;
    ownerEmail: string | null;
    createdAt: string;
    updatedAt: string;
};

export function normalizeSubdomain(input: string): string {
    return input.trim().toLowerCase();
}

export function isValidSubdomain(input: string): boolean {
    return SUBDOMAIN_REGEX.test(input);
}

function mapPage(page: Prisma.PageGetPayload<{ include: { owner: true } }>): ManagedPage {
    return {
        id: page.id,
        name: page.name,
        subdomain: page.subdomain,
        templateId: page.templateId,
        blocks: page.blocks as unknown as Block[],
        isPublished: page.isPublished,
        ownerId: page.ownerId,
        ownerEmail: page.owner.email,
        createdAt: page.createdAt.toISOString(),
        updatedAt: page.updatedAt.toISOString(),
    };
}

export async function getPublishedPage(subdomain: string) {
    const normalizedSubdomain = normalizeSubdomain(subdomain);

    const page = await prisma.page.findFirst({
        where: {
            subdomain: normalizedSubdomain,
            isPublished: true,
        },
        include: {
            owner: true,
        },
    });

    if (!page) {
        return null;
    }

    return mapPage(page);
}

export async function getUserPages(userId: string) {
    const pages = await prisma.page.findMany({
        where: { ownerId: userId },
        include: { owner: true },
        orderBy: { updatedAt: 'desc' },
    });

    return pages.map(mapPage);
}

export async function getAllPages() {
    const pages = await prisma.page.findMany({
        include: { owner: true },
        orderBy: { updatedAt: 'desc' },
    });

    return pages.map(mapPage);
}

export async function getPageForUser(pageId: string, userId: string, role: Role) {
    const page = await prisma.page.findUnique({
        where: { id: pageId },
        include: { owner: true },
    });

    if (!page) {
        return null;
    }

    if (role !== Role.ADMIN && page.ownerId !== userId) {
        return null;
    }

    return mapPage(page);
}
