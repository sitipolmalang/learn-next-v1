import PageRenderer from '@/app/components/PageRenderer';
import { schemaMap } from '@/app/components/editor/schemaMap';
import { getPublishedSite } from '@/lib/publishedStore';

type PublishedPageProps = {
    params: Promise<{ subdomain: string }>;
};

export default async function PublishedPage({ params }: PublishedPageProps) {
    const { subdomain } = await params;
    const site = getPublishedSite(subdomain);

    if (!site) {
        return (
            <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
                <div className="max-w-md text-center">
                    <h1 className="text-2xl font-bold text-gray-900">Halaman belum dipublish</h1>
                    <p className="mt-2 text-sm text-gray-600">
                        Subdomain <span className="font-semibold">{subdomain}.localhost:3000</span> belum punya data publish.
                    </p>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-white">
            <PageRenderer blocks={site.blocks} schemaMap={schemaMap} />
        </main>
    );
}

