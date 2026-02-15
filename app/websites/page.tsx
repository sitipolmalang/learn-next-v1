import Link from 'next/link';
import {
    Globe,
    CheckCircle2,
    Eye,
    Pencil,
    Home,
    ChevronRight,
    Plus,
    Clock3,
    Sparkles,
} from 'lucide-react';
import { requireUser } from '@/lib/authz';
import { prisma } from '@/lib/prisma';
import { deletePageAction, publishPageAction, unpublishPageAction } from '@/app/dashboard/actions';
import CopyUrlButton from '@/app/dashboard/CopyUrlButton';
import { defaultTemplates } from '@/app/components/templates/defaults';
import AppSidebar from '@/app/components/layout/AppSidebar';
import WebsitesFilters from './WebsitesFilters';
import WebsiteCardMenu from './WebsiteCardMenu';
import PublishToggleButton from './PublishToggleButton';

type WebsitesPageProps = {
    searchParams: Promise<{
        q?: string;
        status?: string;
        sort?: string;
    }>;
};

export default async function WebsitesPage({ searchParams }: WebsitesPageProps) {
    const session = await requireUser();
    const params = await searchParams;
    const isAdmin =
        session.user.role === 'ADMIN' ||
        session.user.email?.toLowerCase() === 'wahidikqbal@gmail.com';

    const profileImage = session.user.image || '/default-avatar.svg';
    const profileName = session.user.name?.trim() || session.user.email?.split('@')[0] || 'User';

    const allPages = await prisma.page.findMany({
        where: { ownerId: session.user.id },
        orderBy: { updatedAt: 'desc' },
    });

    const query = (params.q ?? '').trim().toLowerCase();
    const selectedStatus = params.status ?? 'all';
    const selectedSort = params.sort ?? 'newest';

    const pages = allPages
        .filter((page) => {
            if (selectedStatus === 'published' && !page.isPublished) return false;
            if (selectedStatus === 'draft' && page.isPublished) return false;
            if (!query) return true;
            return (
                page.name.toLowerCase().includes(query) ||
                page.subdomain.toLowerCase().includes(query) ||
                page.templateId.toLowerCase().includes(query)
            );
        })
        .sort((a, b) =>
            selectedSort === 'oldest'
                ? a.updatedAt.getTime() - b.updatedAt.getTime()
                : b.updatedAt.getTime() - a.updatedAt.getTime()
        );

    const totalWebsite = allPages.length;
    const publishedCount = allPages.filter((page) => page.isPublished).length;
    const draftCount = totalWebsite - publishedCount;
    const totalViews = allPages.reduce((acc, page) => acc + (page.isPublished ? 7 : 1), 0);

    const formatDate = (date: Date) =>
        new Intl.DateTimeFormat('id-ID', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        }).format(date);

    const getTemplateThumbnailClass = (templateId: string) =>
        defaultTemplates.find((template) => template.id === templateId)?.thumbnail || 'bg-slate-100';
    const getTemplateName = (templateId: string) =>
        defaultTemplates.find((template) => template.id === templateId)?.name || 'Custom Template';

    return (
        <main className="min-h-screen bg-slate-50">
            <div className="mx-auto flex min-h-screen w-full">
                <AppSidebar
                    active="websites"
                    user={{
                        name: profileName,
                        email: session.user.email ?? '',
                        image: profileImage,
                    }}
                    isAdmin={isAdmin}
                    footerLink={{ href: '/dashboard', label: 'Dashboard' }}
                />

                <section className="flex-1">
                    <div className="border-b border-slate-200 bg-white px-4 py-4 sm:px-6 lg:px-10">
                        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                            <div>
                                <div className="flex items-center gap-1.5 text-sm text-slate-500">
                                    <Home size={14} />
                                    <ChevronRight size={14} />
                                    <span>Dashboard</span>
                                    <ChevronRight size={14} />
                                    <span className="font-semibold text-slate-800">Websites</span>
                                </div>
                                <h1 className="mt-2 text-2xl font-bold text-slate-900">Website Saya</h1>
                                <p className="text-sm text-slate-500">Kelola semua website Anda</p>
                            </div>
                            <Link
                                href="/dashboard#create-website"
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
                            >
                                <Plus size={16} />
                                Buat Website Baru
                            </Link>
                        </div>
                    </div>

                    <div className="px-4 py-6 sm:px-6 lg:px-10">
                        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                            <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <div className="rounded-xl bg-blue-50 p-3 text-blue-600"><Globe size={20} /></div>
                                    <p className="text-4xl font-bold text-slate-900">{totalWebsite}</p>
                                </div>
                                <p className="mt-3 text-sm text-slate-500">Total Website</p>
                            </article>
                            <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600"><CheckCircle2 size={20} /></div>
                                    <p className="text-4xl font-bold text-slate-900">{publishedCount}</p>
                                </div>
                                <p className="mt-3 text-sm text-slate-500">Published</p>
                            </article>
                            <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <div className="rounded-xl bg-violet-50 p-3 text-violet-600"><Eye size={20} /></div>
                                    <p className="text-4xl font-bold text-slate-900">{totalViews}</p>
                                </div>
                                <p className="mt-3 text-sm text-slate-500">Views</p>
                            </article>
                            <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <div className="rounded-xl bg-amber-50 p-3 text-amber-600"><Pencil size={20} /></div>
                                    <p className="text-4xl font-bold text-slate-900">{draftCount}</p>
                                </div>
                                <p className="mt-3 text-sm text-slate-500">Draft</p>
                            </article>
                        </div>

                        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-4">
                            <WebsitesFilters
                                key={`${params.q ?? ''}|${selectedStatus}|${selectedSort}`}
                                initialQuery={params.q ?? ''}
                                initialStatus={selectedStatus}
                                initialSort={selectedSort}
                            />
                        </section>

                        <section className="mt-6">
                            {pages.length === 0 ? (
                                <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
                                    <p className="text-sm text-slate-500">Belum ada website yang sesuai filter.</p>
                                </div>
                            ) : (
                                <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
                                    {pages.map((page) => {
                                        const siteUrl = `http://${page.subdomain}.localhost:3000`;
                                        const simulatedViews = page.isPublished ? 7 : 1;
                                        return (
                                            <article
                                                key={page.id}
                                                className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-2xl"
                                            >
                                                <div className={`relative h-48 ${getTemplateThumbnailClass(page.templateId)} p-4`}>
                                                    <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-slate-900/20" />
                                                    <span className={`absolute right-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-semibold backdrop-blur-sm ${page.isPublished ? 'bg-emerald-100/95 text-emerald-700' : 'bg-amber-100/95 text-amber-700'}`}>
                                                        {page.isPublished ? 'Published' : 'Draft'}
                                                    </span>
                                                    <div className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full border border-white/50 bg-white/75 px-2.5 py-1 text-[11px] font-semibold text-slate-700 backdrop-blur-sm">
                                                        <Sparkles size={12} />
                                                        {getTemplateName(page.templateId)}
                                                    </div>
                                                    <div className="mx-auto h-3/4 w-3/4 rounded-lg border border-white/70 bg-white/75 p-3 shadow-lg opacity-70 scale-95 transition-transform duration-300 group-hover:scale-100">
                                                        <div className="h-3 w-1/3 rounded bg-slate-200" />
                                                        <div className="mt-2.5 space-y-2">
                                                            <div className="h-2 w-full rounded bg-slate-200" />
                                                            <div className="h-2 w-5/6 rounded bg-slate-200" />
                                                            <div className="h-2 w-3/5 rounded bg-slate-200" />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex flex-1 flex-col space-y-4 p-6">
                                                    <div className="flex items-start justify-between gap-2">
                                                        <div className="min-w-0">
                                                            <h3 className="truncate text-xl font-bold text-slate-900">{page.name}</h3>
                                                            <p className="mt-0.5 text-xs text-slate-500">@{page.subdomain}</p>
                                                        </div>
                                                        <WebsiteCardMenu
                                                            pageId={page.id}
                                                            pageName={page.name}
                                                            siteUrl={siteUrl}
                                                            isPublished={page.isPublished}
                                                            publishAction={publishPageAction}
                                                            unpublishAction={unpublishPageAction}
                                                            deleteAction={deletePageAction}
                                                            showStatusActions={false}
                                                        />
                                                    </div>

                                                    {page.isPublished ? (
                                                        <div className="flex items-center justify-between gap-2 rounded-lg border border-slate-200 bg-slate-50/80 px-2.5 py-2">
                                                            <p className="truncate text-xs font-medium text-slate-700">{siteUrl}</p>
                                                            <CopyUrlButton url={siteUrl} />
                                                        </div>
                                                    ) : (
                                                        <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800">
                                                            URL belum aktif. Publish website terlebih dahulu.
                                                        </div>
                                                    )}

                                                    <div className="grid grid-cols-2 gap-2 text-xs">
                                                        <div className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-slate-600">
                                                            <Clock3 size={13} />
                                                            {formatDate(page.updatedAt)}
                                                        </div>
                                                        <div className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-slate-600">
                                                            <Eye size={13} />
                                                            {simulatedViews} views
                                                        </div>
                                                    </div>

                                                    <div className="sticky bottom-0 z-10 -mx-6 mt-auto grid grid-cols-2 gap-2 border-t border-slate-100 bg-white/95 px-6 pt-3 pb-0 backdrop-blur-sm md:static md:mx-0 md:bg-transparent md:px-0 md:pb-0 md:backdrop-blur-none">
                                                        <Link
                                                            href={`/edit/${page.id}`}
                                                            className="inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
                                                        >
                                                            Edit Website
                                                        </Link>
                                                        <PublishToggleButton
                                                            pageId={page.id}
                                                            pageName={page.name}
                                                            isPublished={page.isPublished}
                                                            publishAction={publishPageAction}
                                                            unpublishAction={unpublishPageAction}
                                                        />
                                                    </div>
                                                </div>
                                            </article>
                                        );
                                    })}
                                </div>
                            )}
                        </section>
                    </div>
                </section>
            </div>
        </main>
    );
}
