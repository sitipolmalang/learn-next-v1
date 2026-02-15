import Link from 'next/link';
import {
    Globe,
    CheckCircle2,
    Eye,
    Pencil,
    Home,
    ChevronRight,
    LayoutGrid,
    CreditCard,
    BarChart3,
    Store,
    Plus,
    Search,
    MoreVertical,
    FolderKanban,
} from 'lucide-react';
import { requireUser } from '@/lib/authz';
import { prisma } from '@/lib/prisma';
import { deletePageAction, publishPageAction, signOutAction } from '@/app/dashboard/actions';
import DeletePageButton from '@/app/dashboard/DeletePageButton';
import CopyUrlButton from '@/app/dashboard/CopyUrlButton';
import { defaultTemplates } from '@/app/components/templates/defaults';

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

    const navItems = [
        { label: 'Dashboard', icon: LayoutGrid, href: '/dashboard', active: false, disabled: false },
        { label: 'Websites', icon: Globe, href: '/websites', active: true, disabled: false },
        { label: 'Subscriptions', icon: CreditCard, href: '', active: false, disabled: true },
        { label: 'Analytics', icon: BarChart3, href: '', active: false, disabled: true },
        { label: 'Templates', icon: FolderKanban, href: '/templates', active: false, disabled: false },
    ];

    const formatDate = (date: Date) =>
        new Intl.DateTimeFormat('id-ID', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        }).format(date);

    const getTemplateThumbnailClass = (templateId: string) =>
        defaultTemplates.find((template) => template.id === templateId)?.thumbnail || 'bg-slate-100';

    return (
        <main className="min-h-screen bg-slate-50">
            <div className="mx-auto flex min-h-screen w-full">
                <aside className="hidden w-72 shrink-0 border-r border-slate-200 bg-white lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col">
                    <div className="flex h-16 items-center gap-3 border-b border-slate-200 px-5">
                        <Store className="text-blue-600" size={22} />
                        <span className="text-2xl font-bold text-slate-900">page builder</span>
                    </div>

                    <div className="px-3 pt-5">
                        <p className="px-3 text-xs font-semibold tracking-wide text-slate-400">MAIN</p>
                        <nav className="mt-2 space-y-1.5">
                            {navItems.slice(0, 4).map((item) => {
                                const Icon = item.icon;
                                if (item.disabled) {
                                    return (
                                        <div key={item.label} className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-slate-400">
                                            <span className="flex items-center gap-3">
                                                <Icon size={18} />
                                                {item.label}
                                            </span>
                                            <span className="text-[10px] font-semibold uppercase tracking-wide">Soon</span>
                                        </div>
                                    );
                                }
                                return (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${item.active ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-100'}`}
                                    >
                                        <Icon size={18} />
                                        {item.label}
                                    </Link>
                                );
                            })}
                        </nav>

                        <p className="mt-8 px-3 text-xs font-semibold tracking-wide text-slate-400">OTHER</p>
                        <nav className="mt-2 space-y-1.5">
                            {navItems.slice(4).map((item) => {
                                const Icon = item.icon;
                                return (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100"
                                    >
                                        <Icon size={18} />
                                        {item.label}
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>

                    <div className="border-t border-slate-200 p-4 mt-8">
                        <div className="flex items-center gap-3">
                            <div className="h-11 w-11 rounded-full border border-slate-200 bg-cover bg-center bg-slate-100" style={{ backgroundImage: `url('${profileImage}')` }} />
                            <div className="min-w-0">
                                <p className="truncate text-sm font-semibold text-slate-900">{profileName}</p>
                                <p className="truncate text-xs text-slate-500">{session.user.email}</p>
                            </div>
                        </div>
                        <div className="mt-3 flex gap-2">
                            <Link
                                href="/dashboard"
                                className="rounded-md border border-slate-200 px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100"
                            >
                                Dashboard
                            </Link>
                            <form action={signOutAction}>
                                <button
                                    type="submit"
                                    className="rounded-md border border-slate-200 px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100"
                                >
                                    Sign out
                                </button>
                            </form>
                        </div>
                    </div>
                </aside>

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
                            <form className="grid gap-3 md:grid-cols-[1fr_auto_auto_auto]">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                    <input
                                        type="text"
                                        name="q"
                                        defaultValue={params.q ?? ''}
                                        placeholder="Cari website..."
                                        className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm outline-none focus:border-blue-400"
                                    />
                                </div>
                                <select
                                    name="status"
                                    defaultValue={selectedStatus}
                                    className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700"
                                >
                                    <option value="all">Semua Status</option>
                                    <option value="published">Published</option>
                                    <option value="draft">Draft</option>
                                </select>
                                <select
                                    name="sort"
                                    defaultValue={selectedSort}
                                    className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700"
                                >
                                    <option value="newest">Terbaru</option>
                                    <option value="oldest">Terlama</option>
                                </select>
                                <button
                                    type="submit"
                                    className="h-11 rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white hover:bg-slate-800"
                                >
                                    Terapkan
                                </button>
                            </form>
                        </section>

                        <section className="mt-6">
                            {pages.length === 0 ? (
                                <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
                                    <p className="text-sm text-slate-500">Belum ada website yang sesuai filter.</p>
                                </div>
                            ) : (
                                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                                    {pages.map((page) => {
                                        const siteUrl = `http://${page.subdomain}.localhost:3000`;
                                        const simulatedViews = page.isPublished ? 7 : 1;
                                        return (
                                            <article key={page.id} className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                                                <div className={`relative h-44 ${getTemplateThumbnailClass(page.templateId)} p-3`}>
                                                    <span className={`absolute right-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-semibold ${page.isPublished ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                                                        {page.isPublished ? 'Published' : 'Draft'}
                                                    </span>
                                                    <div className="mx-auto h-full w-4/5 rounded-lg bg-white/70 p-3">
                                                        <div className="h-2 w-2/3 rounded bg-slate-200" />
                                                        <div className="mt-2 space-y-1.5">
                                                            <div className="h-1.5 w-full rounded bg-slate-200" />
                                                            <div className="h-1.5 w-5/6 rounded bg-slate-200" />
                                                            <div className="h-1.5 w-3/5 rounded bg-slate-200" />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="p-4">
                                                    <div className="flex items-start justify-between gap-2">
                                                        <h3 className="text-xl font-bold text-slate-900">{page.name}</h3>
                                                        <span className="rounded-md p-1 text-slate-400"><MoreVertical size={16} /></span>
                                                    </div>

                                                    {page.isPublished ? (
                                                        <div className="mt-2 flex items-center justify-between gap-2 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5">
                                                            <p className="truncate text-xs text-slate-600">{siteUrl}</p>
                                                            <CopyUrlButton url={siteUrl} />
                                                        </div>
                                                    ) : (
                                                        <p className="mt-2 text-xs text-slate-500">URL belum aktif. Publish website terlebih dahulu.</p>
                                                    )}

                                                    <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                                                        <span>Terakhir diubah: {formatDate(page.updatedAt)}</span>
                                                        <span>Views: {simulatedViews}</span>
                                                    </div>

                                                    <div className="mt-4 grid grid-cols-2 gap-2">
                                                        <Link
                                                            href={`/edit/${page.id}`}
                                                            className="col-span-2 inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                                                        >
                                                            Edit Website
                                                        </Link>
                                                        {page.isPublished ? (
                                                            <a
                                                                href={siteUrl}
                                                                target="_blank"
                                                                rel="noreferrer"
                                                                className="inline-flex w-full items-center justify-center rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700 hover:bg-blue-100"
                                                            >
                                                                Visit Website
                                                            </a>
                                                        ) : (
                                                            <form action={publishPageAction}>
                                                                <input type="hidden" name="pageId" value={page.id} />
                                                                <button
                                                                    type="submit"
                                                                    className="w-full rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700 hover:bg-emerald-100"
                                                                >
                                                                    Publish
                                                                </button>
                                                            </form>
                                                        )}
                                                        <div className="flex justify-end">
                                                            <DeletePageButton
                                                                action={deletePageAction}
                                                                pageId={page.id}
                                                                pageName={page.name}
                                                            />
                                                        </div>
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
