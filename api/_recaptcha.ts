import type { ApiRequest } from './_types';

export async function verifyRecaptcha(token: unknown, req: ApiRequest): Promise<boolean> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  // Si aún no se configuró la clave secreta, no bloqueamos envíos (permite desplegar
  // el resto de la protección — honeypot y validación — antes de tener reCAPTCHA listo).
  if (!secret) return true;
  if (typeof token !== 'string' || !token) return false;

  const params = new URLSearchParams({ secret, response: token });
  const forwardedFor = req.headers['x-forwarded-for'];
  const ip = Array.isArray(forwardedFor) ? forwardedFor[0] : forwardedFor?.split(',')[0]?.trim();
  if (ip) params.append('remoteip', ip);

  const resp = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  });
  const data = (await resp.json()) as { success: boolean; score?: number };
  return data.success === true && (typeof data.score !== 'number' || data.score >= 0.5);
}
