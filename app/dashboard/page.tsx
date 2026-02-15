import Link from 'next/link';
import {
    Home,
    ChevronRight,
    LayoutGrid,
    Globe,
    CreditCard,
    BarChart3,
    FolderKanban,
    Store,
    Plus,
} from 'lucide-react';
import { requireUser } from '@/lib/authz';
import { createPageAction, signOutAction } from './actions';
import CreatePageForm from './CreatePageForm';

type DashboardPageProps = {
    searchParams: Promise<{
        error?: string;
        templateId?: string;
    }>;
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
    const profileImage = session.user.image || '/default-avatar.svg';
    const profileName = session.user.name?.trim() || session.user.email?.split('@')[0] || 'User';
    const errorMessage = mapError(params.error);

    const navItems = [
        { label: 'Dashboard', icon: LayoutGrid, href: '/dashboard', active: true, disabled: false },
        { label: 'Websites', icon: Globe, href: '/websites', active: false, disabled: false },
        { label: 'Subscriptions', icon: CreditCard, href: '', active: false, disabled: true },
        { label: 'Analytics', icon: BarChart3, href: '', active: false, disabled: true },
        { label: 'Templates', icon: FolderKanban, href: '/templates', active: false, disabled: false },
    ];

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
                                href="/websites"
                                className="rounded-md border border-slate-200 px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100"
                            >
                                Websites
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
                                    <span className="font-semibold text-slate-800">Create Website</span>
                                </div>
                                <h1 className="mt-2 text-2xl font-bold text-slate-900">Buat Website Baru</h1>
                                <p className="text-sm text-slate-500">Mulai dari template, pilih subdomain, lalu lanjut edit.</p>
                            </div>
                            <Link
                                href="/websites"
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
                            >
                                <Plus size={16} />
                                Lihat Semua Website
                            </Link>
                        </div>
                    </div>

                    <div className="px-4 py-6 sm:px-6 lg:px-10">
                        <section id="create-website" className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
                            {errorMessage && (
                                <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
                                    {errorMessage}
                                </p>
                            )}
                            <CreatePageForm action={createPageAction} initialTemplateId={params.templateId} />
                        </section>
                    </div>
                </section>
            </div>
        </main>
    );
}
