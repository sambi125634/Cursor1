'use client';
import { useEffect, useState } from 'react';

type Svc = {
  id: string;
  name: string;
  description?: string;
  durationMin: number;
  price: string;
};

export default function ServicesPage() {
  const [data, setData] = useState<Svc[]>([]);
  const [loading, setLoading] = useState(true);
  const base = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';

  useEffect(() => {
    fetch(`${base}/services`, { headers: { 'x-tenant': 'salon-aurora' } })
      .then((r) => r.json())
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  return (
    <main style={{ padding: 24 }}>
      <h2>Usługi</h2>
      {loading ? <p>Ładowanie…</p> : null}
      <ul>
        {data.map((s) => (
          <li key={s.id}>
            <strong>{s.name}</strong> — {s.durationMin} min — {s.price} PLN
          </li>
        ))}
      </ul>
    </main>
  );
}

