import type { Block } from '@/app/components/editor/types/editor';

export type PublishedSite = {
    subdomain: string;
    blocks: Block[];
    publishedAt: string;
};

const SUBDOMAIN_REGEX = /^[a-z0-9](?:[a-z0-9-]{1,61}[a-z0-9])?$/;

declare global {
    var __publishedSites: Map<string, PublishedSite> | undefined;
}

const publishedSites = global.__publishedSites ?? new Map<string, PublishedSite>();
global.__publishedSites = publishedSites;

export function normalizeSubdomain(input: string): string {
    return input.trim().toLowerCase();
}

export function isValidSubdomain(input: string): boolean {
    return SUBDOMAIN_REGEX.test(input);
}

export function savePublishedSite(subdomain: string, blocks: Block[]): PublishedSite {
    const normalized = normalizeSubdomain(subdomain);
    const site: PublishedSite = {
        subdomain: normalized,
        blocks,
        publishedAt: new Date().toISOString(),
    };
    publishedSites.set(normalized, site);
    return site;
}

export function getPublishedSite(subdomain: string): PublishedSite | null {
    return publishedSites.get(normalizeSubdomain(subdomain)) ?? null;
}
