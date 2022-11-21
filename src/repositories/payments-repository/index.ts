import { prisma } from "@/config";

async function getPaymentById(ticketId: number) {
  return await prisma.payment.findFirst({
    where: {
      ticketId,
    },
  });
}

const paymentRepository = { getPaymentById };

export default paymentRepository;
