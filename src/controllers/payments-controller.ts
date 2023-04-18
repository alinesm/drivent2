import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import { Payment } from '@prisma/client';
import { AuthenticatedRequest } from '@/middlewares';
import paymentsService from '@/services/payments-service';
import { invalidDataError } from '@/errors';
import { PaymentInput } from '@/protocols';

export async function findPayments(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req;
  const { ticketId: ticketIdStr } = req.query;
  const ticketId = Number(ticketIdStr);
  if (!ticketId) throw invalidDataError([`error: ticketId is required`]);
  try {
    const payment: Payment = await paymentsService.findPayments(userId, ticketId);
    return res.status(httpStatus.OK).send(payment);
  } catch (error) {
    next(error);
  }
}

export async function createPayment(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req;
  const paymentInfo = req.body as PaymentInput;
  try {
    const payment = await paymentsService.createPayment(userId, paymentInfo);
    return res.status(httpStatus.OK).send(payment);
  } catch (error) {
    next(error);
  }
}
