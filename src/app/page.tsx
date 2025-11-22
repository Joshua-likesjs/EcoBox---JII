'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { Leaf } from 'lucide-react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const user = getCurrentUser();
      if (user) {
        router.push('/dashboard');
      } else {
        router.push('/login');
      }
    };

    checkAuth();
  }, [router]);

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center">
      <div className="text-center">
        <div className="bg-green-100 p-4 rounded-full inline-block mb-4">
          <Leaf className="h-12 w-12 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold text-green-800 mb-2">EcoBox</h1>
        <p className="text-green-600">Redirecionando...</p>
      </div>
    </div>
  );
}