import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { getTicketsType, getTickets, createTicket } from '@/controllers';
import { ticketInput } from '@/schemas';

const ticketsRouter = Router();

ticketsRouter
  .all('/*', authenticateToken)
  .get('/types', getTicketsType)
  .get('/', getTickets)
  .post('/', validateBody(ticketInput), createTicket);

export { ticketsRouter };
