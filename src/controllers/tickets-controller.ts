import { Response } from 'express';
import httpStatus from 'http-status';
import ticketsService from '@/services/tickets-service';
import { TicketInput, TicketsType } from '@/protocols';
import { AuthenticatedRequest } from '@/middlewares';

export async function getTicketsType(_req: AuthenticatedRequest, res: Response) {
  try {
    const ticketsType: TicketsType[] = await ticketsService.getTicketsType();
    console.log(ticketsType);
    return res.status(httpStatus.OK).send(ticketsType);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send({});
  }
}

export async function getTickets(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const tickets = await ticketsService.getTickets(userId);
    return res.status(httpStatus.OK).send(tickets);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send({});
  }
}

export async function createTicket(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { ticketTypeId } = req.body;
  try {
    const ticket = await ticketsService.createTicket(userId, ticketTypeId);

    return res.status(httpStatus.CREATED).send(ticket);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send({});
  }
}
