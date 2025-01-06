import { Request, Response, NextFunction } from 'express';

export function validatePaymentRequest(req: Request, res: Response, next: NextFunction) {
  const { amount, phone } = req.body;

  if (!amount || typeof amount !== 'number' || amount <= 0) {
    return res.status(400).json({ error: 'Montant invalide' });
  }

  if (!phone || !/^[0-9]{9}$/.test(phone)) {
    return res.status(400).json({ error: 'Numéro de téléphone invalide' });
  }

  next();
}