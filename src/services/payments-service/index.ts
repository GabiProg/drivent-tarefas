import paymentRepository from "@/repositories/payments-repository";
import { notFoundError } from "@/errors";

async function getPaymentById(ticketId: number) {
  const paymentInfo = await paymentRepository.getPaymentById(ticketId);
  return paymentInfo;
}

const paymentService = { getPaymentById };

export default paymentService;
