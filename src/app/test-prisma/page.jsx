'use client';

import { useState, useEffect } from 'react';
import prisma from '../../utils/db/db';

export default function TestPrisma() {
  const [connectionStatus, setConnectionStatus] = useState('Testing connection...');
  const [error, setError] = useState(null);

  useEffect(() => {
    async function testConnection() {
      try {
        // Simple query to test the connection
        const result = await prisma.$queryRaw`SELECT 1 as test`;
        setConnectionStatus('Prisma connection successful');
        console.log('Database connection result:', result);
      } catch (err) {
        setError(err.message);
        setConnectionStatus('Prisma connection failed');
        console.error('Database connection error:', err);
      }
    }

    testConnection();
  }, []);

  return (
    <div className="container" style={{ padding: '20px' }}>
      <h1>Prisma Connection Test</h1>
      <div>
        <p>Status: {connectionStatus}</p>
        {error && (
          <div style={{ color: 'red', marginTop: '20px' }}>
            <h3>Error Details:</h3>
            <pre>{error}</pre>
          </div>
        )}
      </div>
    </div>
  );
} 