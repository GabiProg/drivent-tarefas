import { Router } from "express";
import { getPaymentById } from "@/controllers/payments-controller";
import { authenticateToken } from "@/middlewares";

const paymentsRoutes = Router();

paymentsRoutes
  .all("/*", authenticateToken)
  .get("/payments?ticketId", getPaymentById)
  .post("/payments/process");

export default paymentsRoutes;
