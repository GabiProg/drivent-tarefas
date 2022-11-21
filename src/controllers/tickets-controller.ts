import { Request, Response } from "express";
import httpStatus from "http-status";
import ticketsService from "@/services/ticket-service";
import { AuthenticatedRequest } from "@/middlewares";

export async function listTicketsTypes(req: Request, res: Response) {
  try {
    const types = await ticketsService.listTicketsTypes();
    return res.status(httpStatus.OK).send(types);
  } catch (error) {
    return res.status(httpStatus.OK).send([]);
  }
}

export async function showAllTickets(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;
  try {
    const tickets = await ticketsService.listTicketsParcialInfos(userId);
    return res.status(httpStatus.OK).send(tickets);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function insertTicketTypeId(req: AuthenticatedRequest, res: Response) {
  const ticketTypeId = req.body;
  const userId = req.userId;
  try {
    if (!ticketTypeId) {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
    await ticketsService.insertTicketTypeId(ticketTypeId, userId);
    const newTicketId = await ticketsService.listTicketsParcialInfos(userId);
    return res.status(httpStatus.CREATED).send(newTicketId);
  } catch (error) {
    if (error.name === "RequestError") {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
