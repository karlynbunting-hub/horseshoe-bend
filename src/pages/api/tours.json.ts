import type { APIRoute } from 'astro';
import { tours } from '../../data/tours';

export const GET: APIRoute = () => {
  const payload = {
    version: '1',
    generated: new Date().toISOString(),
    count: tours.length,
    tours: tours.map((t) => ({
      id: t.id,
      name: t.name,
      type: t.type,
      price: t.price,
      duration: t.duration,
      seasonality: t.seasonality,
      audience: t.audience,
      href: t.href,
      description: t.description,
    })),
  };

  return new Response(JSON.stringify(payload, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
