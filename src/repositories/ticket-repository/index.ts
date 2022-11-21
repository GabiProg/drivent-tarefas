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

async function getTicketTypeId(ticketTypeId: number) {
  const getStatus = await prisma.ticket.findFirst({
    where: {
      ticketTypeId
    }
  });
  return getStatus;
}

async function getJustTicket(id: number) {
  return prisma.ticket.findUnique({
    where: {
      id: id
    }
  });
}

async function inserTicketType(ticketTypeId: number, enrollmentId: number) {
  await prisma.ticket.create({
    data: {
      status: TicketStatus.RESERVED,
      enrollmentId: enrollmentId,
      ticketTypeId: ticketTypeId,
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

const ticketsRepository = { listTicketsTypes, listALLTickets, inserTicketType, getStatusByUserId, getTicketTypeId, getJustTicket };

export default ticketsRepository;
