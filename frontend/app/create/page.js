'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateItem() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    last_name: '',
    age: '',
    email: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [documentCode, setDocumentCode] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setDocumentCode('');

    try {
      const response = await fetch('http://localhost:8000/api/v1/items/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          age: parseInt(formData.age)
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        const error_message = Object.entries(errorData.errors)
          .map(([field, message]) => {
            return `${field}: ${message}`;
          })
          .join(". ");
        throw new Error(error_message || 'Failed to create item');
      }

      const data = await response.json();
      setDocumentCode(data.document_code);

      // Reset form
      setFormData({
        name: '',
        last_name: '',
        age: '',
        email: '',
        phone: ''
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto', fontFamily: 'system-ui, sans-serif' }}>
      <h1>Crear un nuevo Item</h1>

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

      {documentCode && (
        <div style={{
          padding: '1rem',
          backgroundColor: '#d4edda',
          border: '1px solid #c3e6cb',
          borderRadius: '4px',
          marginBottom: '1rem'
        }}>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#155724' }}>Success!</h3>
          <p style={{ margin: '0' }}>Document Code: <strong>{documentCode}</strong></p>
          <button
            onClick={() => router.push(`/view/${documentCode}`)}
            style={{
              marginTop: '0.5rem',
              padding: '0.5rem 1rem',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            View PDF
          </button>
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

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label htmlFor="name" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Nombre *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '1rem'
            }}
          />
        </div>

        <div>
          <label htmlFor="last_name" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Apellido *
          </label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '1rem'
            }}
          />
        </div>

        <div>
          <label htmlFor="age" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Edad *
          </label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
            min="1"
            max="150"
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '1rem'
            }}
          />
        </div>

        <div>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Correo *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '1rem'
            }}
          />
        </div>

        <div>
          <label htmlFor="phone" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Telefono *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '1rem'
            }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '0.75rem',
            backgroundColor: loading ? '#6c757d' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '1rem',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontWeight: 'bold'
          }}
        >
          {loading ? 'Creando...' : 'Crear Item'}
        </button>
      </form>
    </main>
  );
}
