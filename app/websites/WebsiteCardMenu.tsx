'use client';

import { useState, useTransition } from 'react';
import { useEffect, useId } from 'react';
import { MoreVertical } from 'lucide-react';
import ConfirmModal from '@/app/components/ui/ConfirmModal';

type WebsiteCardMenuProps = {
    pageId: string;
    pageName: string;
    siteUrl: string;
    isPublished: boolean;
    publishAction: (formData: FormData) => void | Promise<void>;
    unpublishAction: (formData: FormData) => void | Promise<void>;
    deleteAction: (formData: FormData) => void | Promise<void>;
    showStatusActions?: boolean;
};

type ConfirmType = 'publish' | 'unpublish' | 'delete' | null;

export default function WebsiteCardMenu({
    pageId,
    pageName,
    siteUrl,
    isPublished,
    publishAction,
    unpublishAction,
    deleteAction,
    showStatusActions = true,
}: WebsiteCardMenuProps) {
    const menuId = useId();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [confirmType, setConfirmType] = useState<ConfirmType>(null);
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        const handleExternalMenuOpen = (event: Event) => {
            const customEvent = event as CustomEvent<{ id?: string }>;
            if (customEvent.detail?.id !== menuId) {
                setIsMenuOpen(false);
            }
        };

        window.addEventListener('website-card-menu-open', handleExternalMenuOpen as EventListener);
        return () => {
            window.removeEventListener('website-card-menu-open', handleExternalMenuOpen as EventListener);
        };
    }, [menuId]);

    useEffect(() => {
        if (!isMenuOpen) return;
        window.dispatchEvent(
            new CustomEvent('website-card-menu-open', { detail: { id: menuId } })
        );
    }, [isMenuOpen, menuId]);

    const toggleMenu = () => setIsMenuOpen((prev) => !prev);

    const openConfirm = (type: Exclude<ConfirmType, null>) => {
        setIsMenuOpen(false);
        setConfirmType(type);
    };

    const closeConfirm = () => setConfirmType(null);

    const handleConfirmAction = () => {
        if (!confirmConfig) return;
        const formData = new FormData();
        formData.set('pageId', pageId);

        // Close UI first so modal always disappears immediately.
        setConfirmType(null);
        setIsMenuOpen(false);

        startTransition(async () => {
            await confirmConfig.action(formData);
        });
    };

    const confirmConfig =
        confirmType === 'publish'
            ? {
                title: 'Publish website?',
                message: `Website "${pageName}" akan dipublikasikan.`,
                buttonLabel: 'Ya, Publish',
                action: publishAction,
            }
            : confirmType === 'unpublish'
                ? {
                    title: 'Jadikan Draft?',
                    message: `Website "${pageName}" akan di-unpublish dan kembali jadi draft.`,
                    buttonLabel: 'Ya, Unpublish',
                    action: unpublishAction,
                }
                : confirmType === 'delete'
                    ? {
                        title: 'Hapus website?',
                        message: `Website "${pageName}" akan dihapus permanen.`,
                        buttonLabel: 'Ya, Hapus',
                        action: deleteAction,
                    }
                    : null;

    return (
        <>
            <div className="relative">
                <button
                    type="button"
                    onClick={toggleMenu}
                    className={`group relative inline-flex items-center justify-center rounded-xl border p-2 text-slate-600 shadow-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 ${
                        isMenuOpen
                            ? 'border-blue-200 bg-blue-50 text-blue-700 ring-2 ring-blue-100'
                            : 'border-slate-200 bg-white hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50/70 hover:text-blue-700 hover:shadow'
                    }`}
                    title="Menu aksi"
                    aria-haspopup="menu"
                    aria-expanded={isMenuOpen}
                >
                    <MoreVertical size={16} className="transition-transform duration-200 group-hover:scale-110" />
                    {!isMenuOpen && (
                        <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-blue-500/90 ring-2 ring-white" />
                    )}
                </button>

                {isMenuOpen && (
                    <>
                        <button
                            type="button"
                            aria-label="Close menu"
                            className="fixed inset-0 z-10 cursor-default"
                            onClick={() => setIsMenuOpen(false)}
                        />
                        <div className="absolute right-0 z-20 mt-2 w-40 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl">
                            {isPublished && (
                                <a
                                    href={siteUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="block rounded-lg px-3 py-2 text-xs font-medium text-blue-700 hover:bg-blue-50"
                                >
                                    Visit Website
                                </a>
                            )}

                            {showStatusActions && (
                                isPublished ? (
                                    <button
                                        type="button"
                                        onClick={() => openConfirm('unpublish')}
                                        className="w-full rounded-lg px-3 py-2 text-left text-xs font-medium text-amber-700 hover:bg-amber-50"
                                    >
                                        Unpublish
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() => openConfirm('publish')}
                                        className="w-full rounded-lg px-3 py-2 text-left text-xs font-medium text-emerald-700 hover:bg-emerald-50"
                                    >
                                        Publish
                                    </button>
                                )
                            )}

                            <button
                                type="button"
                                onClick={() => openConfirm('delete')}
                                className="w-full rounded-lg px-3 py-2 text-left text-xs font-medium text-red-700 hover:bg-red-50"
                            >
                                Delete
                            </button>
                        </div>
                    </>
                )}
            </div>
            <ConfirmModal
                open={!!confirmConfig}
                title={confirmConfig?.title ?? ''}
                message={confirmConfig?.message ?? ''}
                confirmLabel={confirmConfig?.buttonLabel ?? ''}
                confirmTone={
                    confirmType === 'publish'
                        ? 'success'
                        : confirmType === 'unpublish'
                            ? 'warning'
                            : 'danger'
                }
                pending={isPending}
                onCancel={closeConfirm}
                onConfirm={handleConfirmAction}
            />
        </>
    );
}
