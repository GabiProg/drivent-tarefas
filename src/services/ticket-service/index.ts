import ticketsRepository from "@/repositories/ticket-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import { notFoundError, invalidDataError, requestError } from "@/errors";
import { string } from "joi";
import httpStatus from "http-status";

async function listTicketsTypes() {
  const types = await ticketsRepository.listTicketsTypes();

  if (!types) {
    const empty: [] = [];
    return empty;
  }

  return types;
}

async function listTicketsParcialInfos(userId: number) {
  const enroll = await enrollmentRepository.findWithAddressByUserId(userId);
  const ticketInfo = await ticketsRepository.listALLTickets(enroll.id);
  if (!enroll || !ticketInfo) throw notFoundError();
  return ticketInfo;
}

async function insertTicketTypeId(userId: number, ticketTypeId: number) {
  if (!ticketTypeId) throw invalidDataError([]);

  const enroll = await enrollmentRepository.findWithAddressByUserId(userId);
  //const statusInfo = await ticketsRepository.getStatusByUserId(userId);
  const sendTicketId = await ticketsRepository.inserTicketType(ticketTypeId, enroll.id);

  return sendTicketId;
}
const ticketsService = { listTicketsTypes, listTicketsParcialInfos, insertTicketTypeId };

export default ticketsService;
