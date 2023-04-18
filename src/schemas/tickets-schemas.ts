import joi from 'joi';
import { TicketInput } from '@/protocols';

export const ticketInput = joi.object<TicketInput>({
  ticketTypeId: joi.number().positive().greater(0).required(),
});
