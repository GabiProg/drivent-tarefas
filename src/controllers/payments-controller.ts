import { Request, Response } from "express";
import httpStatus from "http-status";
import paymentService from "@/services/payments-service";
import { AuthenticatedRequest } from "@/middlewares";

export async function getPaymentById(req: Request, res: Response) {
  const ID = req.query.ticketId;
  const ticketId = Number(ID);
  try {
    const ticket = await paymentService.getPaymentById(ticketId);
    return res.status(httpStatus.OK).send(ticket);
  } catch (error) {
    return res.sendStatus(httpStatus.CONFLICT);
  }
}
