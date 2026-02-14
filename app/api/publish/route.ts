import { NextResponse } from 'next/server';
import type { Block } from '@/app/components/editor/types/editor';
import { isValidSubdomain, normalizeSubdomain, savePublishedSite } from '@/lib/publishedStore';

type PublishPayload = {
    subdomain?: unknown;
    blocks?: unknown;
};

export async function POST(request: Request) {
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

    const site = await savePublishedSite(subdomain, payload.blocks as Block[]);

    return NextResponse.json({
        success: true,
        subdomain: site.subdomain,
        publishedAt: site.publishedAt,
        url: `http://${site.subdomain}.localhost:3000`,
    });
}
