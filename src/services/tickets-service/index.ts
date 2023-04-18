import { notFoundError } from '@/errors';
import { TicketInput } from '@/protocols';
import ticketsRepository from '@/repositories/ticket-repository';

async function getTicketsType() {
  const ticketsType = await ticketsRepository.getTicketsType();
  console.log(ticketsType);
  return ticketsType;
}

async function getTickets(userId: number) {
  const userIsRegistered = await ticketsRepository.findUserRegister(userId);
  if (!userIsRegistered) throw notFoundError();

  const tickets = await ticketsRepository.getTickets(userId);
  if (!tickets) throw notFoundError();

  return tickets;
}

async function createTicket(userId: number, ticketTypeId: any) {
  const enrollmentId = await ticketsRepository.findUserEnrollment(userId);
  if (!enrollmentId) throw notFoundError();

  const ticketData = await ticketsRepository.createTicket(ticketTypeId, enrollmentId);
  return ticketData;
}

const ticketsService = {
  getTicketsType,
  getTickets,
  createTicket,
};

export default ticketsService;
