import Link from 'next/link';
import { auth, signIn } from '@/auth';

export default async function LoginPage() {
    const session = await auth();

    if (session?.user) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                <div className="w-full max-w-md bg-white border border-gray-200 rounded-xl p-8 text-center">
                    <h1 className="text-2xl font-bold text-gray-900">Anda sudah login</h1>
                    <p className="mt-2 text-sm text-gray-600">Lanjutkan ke panel Anda.</p>
                    <div className="mt-6">
                        <Link
                            href={session.user.role === 'ADMIN' ? '/admin' : '/dashboard'}
                            className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                        >
                            Buka Panel
                        </Link>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md bg-white border border-gray-200 rounded-xl p-8">
                <h1 className="text-2xl font-bold text-gray-900">Masuk / Daftar</h1>
                <p className="mt-2 text-sm text-gray-600">
                    Gunakan akun Google untuk masuk ke SaaS builder Anda.
                </p>
                <form
                    className="mt-6"
                    action={async () => {
                        'use server';
                        await signIn('google', { redirectTo: '/dashboard' });
                    }}
                >
                    <button
                        type="submit"
                        className="w-full rounded-md bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-gray-800"
                    >
                        Continue with Google
                    </button>
                </form>
            </div>
        </main>
    );
}
