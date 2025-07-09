'use client';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <button
        onClick={() => router.push('/dashboard')}
        className="px-6 py-3 bg-blue-600 text-white text-lg rounded hover:bg-blue-700 transition"
      >
        Dashboard
      </button>
    </div>
  );
}
