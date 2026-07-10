import type { ApiRequest, ApiResponse } from './_types';
import { getAdminDb } from './_firebaseAdmin';
import { verifyRecaptcha } from './_recaptcha';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { email, website, recaptchaToken } = (req.body ?? {}) as {
    email?: string;
    website?: string;
    recaptchaToken?: string;
  };

  // Honeypot: si el campo trampa viene lleno, es un bot. Respondemos éxito falso sin escribir nada.
  if (website) {
    res.status(200).json({ ok: true });
    return;
  }

  if (typeof email !== 'string' || email.length > 100 || !EMAIL_REGEX.test(email)) {
    res.status(400).json({ error: 'Correo inválido' });
    return;
  }

  const recaptchaOk = await verifyRecaptcha(recaptchaToken, req);
  if (!recaptchaOk) {
    res.status(403).json({ error: 'Verificación de seguridad fallida' });
    return;
  }

  try {
    const db = getAdminDb();
    await db.collection('whitelist').add({
      email: email.toLowerCase().trim(),
      date: new Date(),
      source: 'landing_fixed',
    });
    res.status(200).json({ ok: true });
  } catch (err) {
    console.error('join error', err);
    res.status(500).json({ error: 'Error al guardar' });
  }
}
