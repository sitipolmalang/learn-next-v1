import Link from 'next/link';

export default function EditPage() {
    return (
        <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-6 text-center">
                <h1 className="text-xl font-bold text-gray-900">Pilih halaman terlebih dahulu</h1>
                <p className="mt-2 text-sm text-gray-600">
                    Buka dashboard untuk memilih halaman yang ingin diedit.
                </p>
                <Link
                    href="/dashboard"
                    className="mt-5 inline-flex rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                >
                    Kembali ke Dashboard
                </Link>
            </div>
        </main>
    );
}
