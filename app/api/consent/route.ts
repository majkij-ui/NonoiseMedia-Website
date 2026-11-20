import { NextResponse } from 'next/server';
import { CONSENT_COOKIE, CONSENT_MAX_AGE_SECONDS } from '@/lib/consent';

/**
 * Re-sets the consent cookie from an HTTP response.
 *
 * The banner already writes the cookie in the browser, but Safari deletes
 * script-written cookies after 7 days (24 hours on a landing reached from an
 * ad click), so visitors would be asked again and again. A cookie set by a
 * response from this host is not capped.
 *
 * Stores nothing and identifies nobody: the body is two booleans, and the
 * value is rebuilt here so nothing from the request reaches the header.
 * Not HttpOnly on purpose: the page reads it before GTM loads.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 });
  }

  const { analytics, ads } = (body ?? {}) as Record<string, unknown>;
  if (typeof analytics !== 'boolean' || typeof ads !== 'boolean') {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 });
  }

  const value = `v1.a${analytics ? 1 : 0}.m${ads ? 1 : 0}.t${Math.floor(Date.now() / 1000)}`;
  const forwardedProto = request.headers.get('x-forwarded-proto');
  const isHttps = forwardedProto
    ? forwardedProto.split(',')[0].trim() === 'https'
    : new URL(request.url).protocol === 'https:';

  const response = new NextResponse(null, { status: 204 });
  response.cookies.set({
    name: CONSENT_COOKIE,
    value,
    path: '/',
    maxAge: CONSENT_MAX_AGE_SECONDS,
    sameSite: 'lax',
    secure: isHttps,
    httpOnly: false,
  });
  response.headers.set('Cache-Control', 'no-store');
  return response;
}
