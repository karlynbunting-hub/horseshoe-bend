import type { APIRoute } from 'astro';

export const GET: APIRoute = () => {
  const payload = {
    version: '1',
    status: 'ok',
    site: 'horseshoebend.com',
    generated: new Date().toISOString(),
  };

  return new Response(JSON.stringify(payload, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    },
  });
};
