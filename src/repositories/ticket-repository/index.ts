import { prisma } from "@/config";
import { TicketStatus } from "@prisma/client";

async function listTicketsTypes() {
  return await prisma.ticketType.findMany();
}

async function listALLTickets(enrollmentId: number) {
  const getId = await prisma.ticket.findFirst({
    where: {
      enrollmentId
    },
    include: { TicketType: true }
  });
  return getId;
}

async function getStatusByUserId(enrollmentId: number) {
  const getStatus = await prisma.ticket.findFirst({
    where: {
      enrollmentId
    }
  });
  return getStatus;
}

async function inserTicketType(ticketTypeId: number, enrollmentId: number) {
  await prisma.ticket.create({
    data: {
      status: TicketStatus.RESERVED,
      enrollmentId,
      ticketTypeId,
    }
  });

  const ticketInfo = await prisma.ticket.findFirst({
    where: {
      enrollmentId
    },
    include: { TicketType: true }
  });
  return ticketInfo;
}

const ticketsRepository = { listTicketsTypes, listALLTickets, inserTicketType, getStatusByUserId };

export default ticketsRepository;
