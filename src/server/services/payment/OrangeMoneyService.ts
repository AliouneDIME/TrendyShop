interface PaymentRequest {
  amount: number;
  phone: string;
}

interface PaymentResponse {
  transactionId: string;
  status: 'pending' | 'completed' | 'failed';
  message: string;
}

export class OrangeMoneyService {
  private static API_KEY = process.env.ORANGE_MONEY_API_KEY;
  private static API_URL = process.env.ORANGE_MONEY_API_URL;

  static async initiatePayment({ amount, phone }: PaymentRequest): Promise<PaymentResponse> {
    try {
      const response = await fetch(this.API_URL + '/payment', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          phone,
          currency: 'XOF',
          description: 'Paiement TrendyShop',
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur de paiement Orange Money');
      }

      const data = await response.json();
      return {
        transactionId: data.transactionId,
        status: data.status,
        message: data.message,
      };
    } catch (error) {
      throw new Error('Service Orange Money indisponible');
    }
  }

  static async verifyPayment(transactionId: string): Promise<PaymentResponse> {
    try {
      const response = await fetch(this.API_URL + `/payment/${transactionId}`, {
        headers: {
          'Authorization': `Bearer ${this.API_KEY}`,
        },
      });

      if (!response.ok) {
        throw new Error('Erreur de vérification du paiement');
      }

      const data = await response.json();
      return {
        transactionId: data.transactionId,
        status: data.status,
        message: data.message,
      };
    } catch (error) {
      throw new Error('Erreur de vérification du paiement');
    }
  }
}