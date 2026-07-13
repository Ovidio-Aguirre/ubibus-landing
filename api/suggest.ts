import type { ApiRequest, ApiResponse } from './_types.js';
import { getAdminDb } from './_firebaseAdmin.js';
import { verifyRecaptcha } from './_recaptcha.js';

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { message, website, recaptchaToken } = (req.body ?? {}) as {
    message?: string;
    website?: string;
    recaptchaToken?: string;
  };

  // Honeypot: si el campo trampa viene lleno, es un bot. Respondemos éxito falso sin escribir nada.
  if (website) {
    res.status(200).json({ ok: true });
    return;
  }

  const trimmed = typeof message === 'string' ? message.trim() : '';
  if (!trimmed || trimmed.length > 1000) {
    res.status(400).json({ error: 'Mensaje inválido' });
    return;
  }

  const recaptchaOk = await verifyRecaptcha(recaptchaToken, req);
  if (!recaptchaOk) {
    res.status(403).json({ error: 'Verificación de seguridad fallida' });
    return;
  }

  try {
    const db = getAdminDb();
    await db.collection('suggestions').add({
      message: trimmed,
      date: new Date(),
      source: 'landing_feedback',
    });
    res.status(200).json({ ok: true });
  } catch (err) {
    console.error('suggest error', err);
    res.status(500).json({ error: 'Error al guardar' });
  }
}
