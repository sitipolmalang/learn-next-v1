import PageRenderer from '@/app/components/PageRenderer';
import { schemaMap } from '@/app/components/editor/schemaMap';
import { requireUser } from '@/lib/authz';
import { getPageForUser } from '@/lib/pages';

type DraftPreviewPageProps = {
    params: Promise<{ pageId: string }>;
};

export default async function DraftPreviewPage({ params }: DraftPreviewPageProps) {
    const session = await requireUser();
    const { pageId } = await params;

    const page = await getPageForUser(pageId, session.user.id, session.user.role);

    if (!page) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
                <div className="max-w-md text-center">
                    <h1 className="text-2xl font-bold text-gray-900">Draft tidak ditemukan</h1>
                    <p className="mt-2 text-sm text-gray-600">
                        Halaman ini tidak tersedia atau Anda tidak punya akses.
                    </p>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-white">
            <PageRenderer blocks={page.blocks} schemaMap={schemaMap} />
        </main>
    );
}
