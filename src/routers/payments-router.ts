import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { createPayment, findPayments } from '@/controllers';
import { paymentSchema } from '@/schemas/paymentSchema';

const paymentsRouter = Router();

paymentsRouter.all('/*', authenticateToken);

paymentsRouter.get('/', findPayments);

paymentsRouter.post('/process', validateBody(paymentSchema), createPayment);

export { paymentsRouter };
