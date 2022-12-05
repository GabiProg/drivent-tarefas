import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { sendAllBookings, postBooking, updateBooking } from "@/controllers";

const bookingRouter = Router();

bookingRouter.all("/*", authenticateToken)
  .get("", sendAllBookings)
  .post("", postBooking)
  .put("/:bookingId", updateBooking);

export { bookingRouter };
