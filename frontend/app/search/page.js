'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchDocument() {
  const router = useRouter();
  const [documentCode, setDocumentCode] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (documentCode.trim()) {
      router.push(`/view/${documentCode.trim()}`);
    }
  };

  return (
    <main style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto', fontFamily: 'system-ui, sans-serif' }}>
      <h1>Buscar Documento</h1>

      <button
        onClick={() => router.push('/')}
        style={{
          marginBottom: '1rem',
          padding: '0.5rem 1rem',
          backgroundColor: '#6c757d',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        ← Back
      </button>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label htmlFor="documentCode" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Ingresa el Document Code
          </label>
          <input
            type="text"
            id="documentCode"
            value={documentCode}
            onChange={(e) => setDocumentCode(e.target.value)}
            placeholder="e.g., aBcD123456"
            required
            minLength={10}
            maxLength={10}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '1rem'
            }}
          />
          <small style={{ color: '#666', marginTop: '0.25rem', display: 'block' }}>
            Document code debe ser de 10 caracteres
          </small>
        </div>

        <button
          type="submit"
          style={{
            padding: '0.75rem',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '1rem',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Ver Documento
        </button>
      </form>
    </main>
  );
}
