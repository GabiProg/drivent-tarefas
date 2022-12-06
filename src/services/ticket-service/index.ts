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
  console.log(userId, ticketTypeId);
  const enroll = await enrollmentRepository.findWithAddressByUserId(userId);
  console.log(enroll);
   
  if (!enroll) throw notFoundError();

  const sendTicketId = await ticketsRepository.inserTicketType(ticketTypeId, enroll.id);
  console.log(sendTicketId);
  return sendTicketId;
}
const ticketsService = { listTicketsTypes, listTicketsParcialInfos, insertTicketTypeId };

export default ticketsService;
