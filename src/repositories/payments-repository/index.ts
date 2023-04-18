import { prisma } from '@/config';
import { PaymentInput } from '@/protocols';

async function findPayments(ticketId: number) {
  return prisma.payment.findFirst({ where: { ticketId } });
}

async function createPayment(paymentInfo: PaymentInput, value: number) {
  return await prisma.payment.create({
    data: {
      ticketId: paymentInfo.ticketId,
      cardIssuer: paymentInfo.cardData.issuer,
      cardLastDigits: String(paymentInfo.cardData.number).slice(-4),
      value: value,
    },
  });
}

const paymentsRepository = {
  findPayments,
  createPayment,
};

export default paymentsRepository;
