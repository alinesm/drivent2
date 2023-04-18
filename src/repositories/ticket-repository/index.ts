import { prisma } from '@/config';

async function getTicketsType() {
  return prisma.ticketType.findMany();
}

async function findTicketById(ticketId: number) {
  return await prisma.ticket.findFirst({ where: { id: ticketId } });
}

async function findTicketTypeById(ticketTypeId: number) {
  return await prisma.ticketType.findFirst({ where: { id: ticketTypeId } });
}

async function getTickets(userId: number) {
  const userTickets = await prisma.ticket.findFirst({
    where: { Enrollment: { userId } },
    select: {
      id: true,
      status: true,
      ticketTypeId: true,
      enrollmentId: true,
      createdAt: true,
      updatedAt: true,
      TicketType: {
        select: {
          id: true,
          name: true,
          price: true,
          isRemote: true,
          includesHotel: true,
          createdAt: true,
          updatedAt: true,
        },
      },
    },
  });

  return userTickets;
}

async function findUserRegister(userId: number) {
  const isRegistered = await prisma.user.findUnique({
    where: { id: userId },
  });
  if (isRegistered) {
    return true;
  }
}

async function findUserEnrollment(userId: number) {
  const { id: enrollmentId } = await prisma.enrollment.findUnique({
    where: { userId },
  });
  return enrollmentId;
}

async function createTicket(ticketTypeId: any, enrollmentId: number) {
  const ticketCreated = await prisma.ticket.create({
    data: {
      ticketTypeId: ticketTypeId,
      enrollmentId,
      status: 'RESERVED',
    },
  });

  if (ticketCreated) {
    return await prisma.ticket.findFirst({
      where: { Enrollment: { id: enrollmentId } },
      select: {
        id: true,
        status: true,
        ticketTypeId: true,
        enrollmentId: true,
        createdAt: true,
        updatedAt: true,
        TicketType: {
          select: {
            id: true,
            name: true,
            price: true,
            isRemote: true,
            includesHotel: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });
  }
}

async function updateTicketById(ticketId: number) {
  return await prisma.ticket.update({
    where: { id: ticketId },
    data: {
      status: 'PAID',
    },
  });
}

const ticketsRepository = {
  updateTicketById,
  findTicketTypeById,
  getTicketsType,
  getTickets,
  findUserRegister,
  findUserEnrollment,
  createTicket,
  findTicketById,
};

export default ticketsRepository;
