import { Router } from "express";
import { listTicketsTypes, showAllTickets, insertTicketTypeId } from "@/controllers";
import { authenticateToken } from "@/middlewares";

const ticketTypesRouter = Router();

ticketTypesRouter
  .all("/*", authenticateToken)
  .get("/types", listTicketsTypes)
  .get("/", showAllTickets)
  .post("/", insertTicketTypeId);

export { ticketTypesRouter };
