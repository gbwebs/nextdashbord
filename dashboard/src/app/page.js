'use client';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <button
        onClick={() => router.push('/dashboard')}
        className="px-6 py-3 bg-gradient-to-tr from-[#cc4700] to-[#ed8413] text-white text-lg rounded hover:bg-orange-700 transition"
      >
       Check Dashboard
      </button>
    </div>
  );
}
