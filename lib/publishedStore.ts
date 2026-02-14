import type { Block } from '@/app/components/editor/types/editor';
import { prisma } from '@/lib/prisma';
import type { Prisma } from '@prisma/client';

export type PublishedSite = {
    subdomain: string;
    blocks: Block[];
    publishedAt: string;
};

const SUBDOMAIN_REGEX = /^[a-z0-9](?:[a-z0-9-]{1,61}[a-z0-9])?$/;

export function normalizeSubdomain(input: string): string {
    return input.trim().toLowerCase();
}

export function isValidSubdomain(input: string): boolean {
    return SUBDOMAIN_REGEX.test(input);
}

export async function savePublishedSite(
    subdomain: string,
    blocks: Block[]
): Promise<PublishedSite> {
    const normalized = normalizeSubdomain(subdomain);

    const site = await prisma.publishedSite.upsert({
        where: { subdomain: normalized },
        update: {
            blocks: blocks as unknown as Prisma.InputJsonValue,
        },
        create: {
            subdomain: normalized,
            blocks: blocks as unknown as Prisma.InputJsonValue,
        },
    });

    return {
        subdomain: site.subdomain,
        blocks: site.blocks as unknown as Block[],
        publishedAt: site.publishedAt.toISOString(),
    };
}

export async function getPublishedSite(
    subdomain: string
): Promise<PublishedSite | null> {
    const site = await prisma.publishedSite.findUnique({
        where: {
            subdomain: normalizeSubdomain(subdomain),
        },
    });

    if (!site) {
        return null;
    }

    return {
        subdomain: site.subdomain,
        blocks: site.blocks as unknown as Block[],
        publishedAt: site.publishedAt.toISOString(),
    };
}
