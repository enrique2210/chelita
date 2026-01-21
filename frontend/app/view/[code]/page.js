'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function ViewPDF() {
  const router = useRouter();
  const params = useParams();
  const documentCode = params.code;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [pdfData, setPdfData] = useState('');

  useEffect(() => {
    if (documentCode) {
      fetchPDF();
    }
  }, [documentCode]);

  const fetchPDF = async () => {
    setLoading(true);
    setError('');
    setPdfData('');

    try {
      const response = await fetch(`http://localhost:8000/api/v1/items/${documentCode}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to fetch PDF');
      }

      const data = await response.json();
      setPdfData(data.document_b64);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = () => {
    if (!pdfData) return;

    // Convert base64 to blob
    const byteCharacters = atob(pdfData);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/pdf' });

    // Create download link
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `document_${documentCode}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <main style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto', fontFamily: 'system-ui, sans-serif' }}>
      <h1>Ver Documento</h1>

      <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem' }}>
        <button
          onClick={() => router.push('/')}
          style={{
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

        {pdfData && (
          <button
            onClick={downloadPDF}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Descargar PDF
          </button>
        )}
      </div>

      {documentCode && (
        <div style={{
          padding: '1rem',
          backgroundColor: '#e7f3ff',
          border: '1px solid #b3d9ff',
          borderRadius: '4px',
          marginBottom: '1rem'
        }}>
          <strong>Document Code:</strong> {documentCode}
        </div>
      )}

      {loading && (
        <div style={{
          padding: '2rem',
          textAlign: 'center',
          color: '#666'
        }}>
          Cargando PDF...
        </div>
      )}

      {error && (
        <div style={{
          padding: '1rem',
          backgroundColor: '#f8d7da',
          border: '1px solid #f5c6cb',
          borderRadius: '4px',
          marginBottom: '1rem',
          color: '#721c24'
        }}>
          {error}
        </div>
      )}

      {pdfData && !loading && (
        <div style={{
          border: '1px solid #ccc',
          borderRadius: '4px',
          overflow: 'hidden',
          backgroundColor: '#f5f5f5'
        }}>
          <iframe
            src={`data:application/pdf;base64,${pdfData}`}
            style={{
              width: '100%',
              height: '800px',
              border: 'none'
            }}
            title="PDF"
          />
        </div>
      )}
    </main>
  );
}
