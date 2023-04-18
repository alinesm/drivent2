import { notFoundError, unauthorizedError } from '@/errors';
import enrollmentRepository from '@/repositories/enrollment-repository';
import paymentsRepository from '@/repositories/payments-repository';
import { PaymentInput } from '@/protocols';
import ticketsRepository from '@/repositories/ticket-repository';

async function findPayments(userId: number, ticketId: number) {
  const ticket = await ticketsRepository.findTicketById(ticketId);

  if (!ticket) throw notFoundError();

  const enrollment = await enrollmentRepository.findEnrollmentById(ticket.enrollmentId);

  if (!enrollment) throw notFoundError();

  if (enrollment.userId !== userId) throw unauthorizedError();

  return await paymentsRepository.findPayments(ticketId);
}

async function createPayment(userId: number, paymentInfo: PaymentInput) {
  const ticket = await ticketsRepository.findTicketById(paymentInfo.ticketId);
  if (!ticket) throw notFoundError();

  const enrollment = await enrollmentRepository.findEnrollmentById(ticket.enrollmentId);

  if (!enrollment) throw notFoundError();

  if (enrollment.userId !== userId) throw unauthorizedError();

  const ticketType = await ticketsRepository.findTicketTypeById(ticket.ticketTypeId);

  await ticketsRepository.updateTicketById(paymentInfo.ticketId);

  return await paymentsRepository.createPayment(paymentInfo, ticketType.price);
}

const paymentsService = {
  findPayments,
  createPayment,
};

export default paymentsService;
