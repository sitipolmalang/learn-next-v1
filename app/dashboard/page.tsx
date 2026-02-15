import Link from 'next/link';
import { requireUser } from '@/lib/authz';
import { prisma } from '@/lib/prisma';
import { createPageAction, deletePageAction, publishPageAction, signOutAction } from './actions';
import CreatePageForm from './CreatePageForm';
import DeletePageButton from './DeletePageButton';

type DashboardPageProps = {
    searchParams: Promise<{ error?: string; templateId?: string }>;
};

function mapError(error?: string) {
    if (error === 'subdomain-conflict') return 'Subdomain sudah dipakai.';
    if (error === 'template-not-found') return 'Template tidak ditemukan.';
    if (error === 'invalid-create') return 'Data create page tidak valid.';
    if (error === 'create-failed') return 'Gagal membuat halaman. Silakan coba lagi.';
    return null;
}

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
    const session = await requireUser();
    const params = await searchParams;
    const pages = await prisma.page.findMany({
        where: { ownerId: session.user.id },
        orderBy: { updatedAt: 'desc' },
    });

    const errorMessage = mapError(params.error);

    return (
        <main className="min-h-screen bg-gray-50 py-10 px-4">
            <div className="mx-auto w-full max-w-6xl">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">User Panel</h1>
                        <p className="text-sm text-gray-600">
                            {session.user.email} ({session.user.role})
                        </p>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                        {session.user.role === 'ADMIN' && (
                            <Link
                                href="/admin"
                                className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                            >
                                Admin Panel
                            </Link>
                        )}
                        <form action={signOutAction}>
                            <button
                                type="submit"
                                className="rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-white hover:bg-black"
                            >
                                Sign out
                            </button>
                        </form>
                    </div>
                </div>

                <section className="mt-8 rounded-xl border border-gray-200 bg-white p-4 sm:p-5">
                    <h2 className="text-lg font-semibold text-gray-900">Buat Halaman Baru</h2>
                    <p className="mt-1 text-sm text-gray-600">
                        Pilih template dan subdomain saat membuat halaman.
                    </p>
                    {errorMessage && (
                        <p className="mt-3 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
                            {errorMessage}
                        </p>
                    )}
                    <CreatePageForm action={createPageAction} initialTemplateId={params.templateId} />
                </section>

                <section className="mt-6 rounded-xl border border-gray-200 bg-white p-4 sm:p-5">
                    <h2 className="text-lg font-semibold text-gray-900">Halaman Saya</h2>
                    {pages.length === 0 ? (
                        <p className="mt-3 text-sm text-gray-600">Belum ada halaman.</p>
                    ) : (
                        <>
                            <div className="mt-4 space-y-3 md:hidden">
                                {pages.map((page) => (
                                    <article key={page.id} className="rounded-lg border border-gray-200 bg-white p-3">
                                        <div className="flex items-start justify-between gap-2">
                                            <div>
                                                <p className="font-semibold text-gray-900">{page.name}</p>
                                                <p className="text-xs text-gray-500">{page.templateId}</p>
                                            </div>
                                            <span
                                                className={`rounded-full px-2 py-1 text-[11px] font-semibold ${
                                                    page.isPublished
                                                        ? 'bg-emerald-100 text-emerald-700'
                                                        : 'bg-amber-100 text-amber-700'
                                                }`}
                                            >
                                                {page.isPublished ? 'Published' : 'Draft'}
                                            </span>
                                        </div>
                                        <p className="mt-2 text-xs text-gray-600 break-all">
                                            {page.subdomain}.localhost:3000
                                        </p>
                                        <div className="mt-3 flex flex-wrap gap-2">
                                            <Link
                                                href={`/edit/${page.id}`}
                                                className="rounded-md border border-gray-300 px-2.5 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
                                            >
                                                Edit
                                            </Link>
                                            <a
                                                href={`http://${page.subdomain}.localhost:3000`}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="rounded-md border border-gray-300 px-2.5 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
                                            >
                                                Visit
                                            </a>
                                            <form action={publishPageAction}>
                                                <input type="hidden" name="pageId" value={page.id} />
                                                <button
                                                    type="submit"
                                                    className="rounded-md bg-emerald-600 px-2.5 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700"
                                                >
                                                    Publish
                                                </button>
                                            </form>
                                            <DeletePageButton
                                                action={deletePageAction}
                                                pageId={page.id}
                                                pageName={page.name}
                                            />
                                        </div>
                                    </article>
                                ))}
                            </div>

                            <div className="mt-4 overflow-x-auto hidden md:block">
                            <table className="w-full min-w-[720px] text-sm">
                                <thead>
                                    <tr className="border-b border-gray-200 text-left text-gray-600">
                                        <th className="py-2 pr-4">Nama</th>
                                        <th className="py-2 pr-4">Template</th>
                                        <th className="py-2 pr-4">Subdomain</th>
                                        <th className="py-2 pr-4">Status</th>
                                        <th className="py-2">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pages.map((page) => (
                                        <tr key={page.id} className="border-b border-gray-100">
                                            <td className="py-3 pr-4 font-medium text-gray-900">{page.name}</td>
                                            <td className="py-3 pr-4 text-gray-700">{page.templateId}</td>
                                            <td className="py-3 pr-4 text-gray-700">
                                                {page.subdomain}.localhost:3000
                                            </td>
                                            <td className="py-3 pr-4">
                                                <span
                                                    className={`rounded-full px-2 py-1 text-xs font-semibold ${
                                                        page.isPublished
                                                            ? 'bg-emerald-100 text-emerald-700'
                                                            : 'bg-amber-100 text-amber-700'
                                                    }`}
                                                >
                                                    {page.isPublished ? 'Published' : 'Draft'}
                                                </span>
                                            </td>
                                            <td className="py-3">
                                                <div className="flex flex-wrap gap-2">
                                                    <Link
                                                        href={`/edit/${page.id}`}
                                                        className="rounded-md border border-gray-300 px-2.5 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <a
                                                        href={`http://${page.subdomain}.localhost:3000`}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="rounded-md border border-gray-300 px-2.5 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
                                                    >
                                                        Visit
                                                    </a>
                                                    <form action={publishPageAction}>
                                                        <input type="hidden" name="pageId" value={page.id} />
                                                        <button
                                                            type="submit"
                                                            className="rounded-md bg-emerald-600 px-2.5 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700"
                                                        >
                                                            Publish
                                                        </button>
                                                    </form>
                                                    <DeletePageButton
                                                        action={deletePageAction}
                                                        pageId={page.id}
                                                        pageName={page.name}
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            </div>
                        </>
                    )}
                </section>
            </div>
        </main>
    );
}
