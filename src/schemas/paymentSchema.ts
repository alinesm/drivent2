import { PaymentInput } from '@/protocols';
import Joi from 'joi';

export const paymentSchema = Joi.object<PaymentInput>({
  ticketId: Joi.number().greater(0).required(),
  cardData: Joi.object({
    issuer: Joi.string(),
    number: Joi.number().greater(0),
    name: Joi.string(),
    expirationDate: Joi.date(),
    cvv: Joi.number().greater(0),
  }).required(),
});
