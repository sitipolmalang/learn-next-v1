import { NextRequest, NextResponse } from 'next/server';

function extractSubdomain(hostHeader: string | null): string | null {
    if (!hostHeader) return null;

    const host = hostHeader.split(':')[0].toLowerCase();
    if (!host.endsWith('.localhost')) return null;

    const segments = host.split('.');
    if (segments.length < 2) return null;

    const subdomain = segments.slice(0, -1).join('.');
    if (!subdomain) return null;

    return subdomain;
}

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (pathname !== '/') {
        return NextResponse.next();
    }

    const subdomain = extractSubdomain(request.headers.get('host'));
    if (!subdomain) {
        return NextResponse.next();
    }

    const rewrittenUrl = request.nextUrl.clone();
    rewrittenUrl.pathname = `/published/${subdomain}`;

    return NextResponse.rewrite(rewrittenUrl);
}

export const config = {
    matcher: ['/'],
};

