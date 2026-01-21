'use client';

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <main style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', fontFamily: 'system-ui, sans-serif' }}>
      <h1>Chelita Software</h1>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem',
        marginTop: '2rem'
      }}>
        <div style={{
          padding: '1.5rem',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#f8f9fa',
          cursor: 'pointer',
          transition: 'transform 0.2s, box-shadow 0.2s'
        }}
        onClick={() => router.push('/create')}>
          <h2 style={{ margin: '0 0 0.5rem 0', color: '#007bff' }}>📝 Crear un nuevo Item</h2>
        </div>

        <div style={{
          padding: '1.5rem',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#f8f9fa',
          cursor: 'pointer',
          transition: 'transform 0.2s, box-shadow 0.2s'
        }}
        onClick={() => router.push('/search')}>
          <h2 style={{ margin: '0 0 0.5rem 0', color: '#28a745' }}>🔍 Buscar un Documento</h2>
        </div>
      </div>

    </main>
  );
}
