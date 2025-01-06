import express from 'express';
import { validatePaymentRequest } from '../middleware/validation';
import { OrangeMoneyService, WaveService } from '../services/payment';

const router = express.Router();

router.post('/orange/payment', validatePaymentRequest, async (req, res) => {
  try {
    const { amount, phone } = req.body;
    const payment = await OrangeMoneyService.initiatePayment({ amount, phone });
    res.json(payment);
  } catch (error) {
    res.status(400).json({ error: 'Erreur de paiement Orange Money' });
  }
});

router.post('/wave/payment', validatePaymentRequest, async (req, res) => {
  try {
    const { amount, phone } = req.body;
    const payment = await WaveService.initiatePayment({ amount, phone });
    res.json(payment);
  } catch (error) {
    res.status(400).json({ error: 'Erreur de paiement Wave' });
  }
});

export default router;