import { apiFetch } from '@/lib/api';

export default async function Home() {
  const data = await apiFetch('/health');
  return (
    <main className='flex min-h-screen items-center justify-center'>
      <div className='text-center'>
        <h1 className='text-4xl font-bold mb-4'>Jarvis</h1>
        <p className='text-green-500'>API status: {data.status}</p>
      </div>
    </main>
  );
}
