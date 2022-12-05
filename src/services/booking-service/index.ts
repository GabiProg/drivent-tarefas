import bookingRepository from "@/repositories/booking-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import hotelRepository from "@/repositories/hotels-repository";
import { forbiddenError, notFoundError } from "@/errors";

async function getUserBooking(userId: number) {
  const getUserReservation = await bookingRepository.getBookingByUserId(userId);
  if (!getUserReservation) throw notFoundError();
    
  return getUserReservation;
}

async function postUserBooking(userId: number, roomId: number) {
  const getEnrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!getEnrollment) throw forbiddenError();
    
  const getPaidTicket = await hotelRepository.getPaidTicket(getEnrollment.id);
  if (!getPaidTicket) throw forbiddenError();
    
  const getTicketWithHotel = await hotelRepository.getHotelsList(getPaidTicket.ticketTypeId);
  if (!getTicketWithHotel) {
    throw forbiddenError();
  }
    
  const getBookings =  await bookingRepository.getBookedRoomQTDByRoomId(roomId);

  const getRoom = await bookingRepository.getRoomByRoomId(roomId);
  if (!getRoom) {
    throw notFoundError();
  }

  const roomCapacity = Number(getRoom.capacity);
  const bookingQTD = getBookings.length + 1;
  if (bookingQTD >= roomCapacity) throw forbiddenError();

  await bookingRepository.postBooking(userId, roomId);

  const getNewBooking = await bookingRepository.getNewBookingId(roomId);
  return getNewBooking;
}

async function updateBooking(userId: number, bookingId: number, roomId: number) {
  const getEnrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!getEnrollment) throw forbiddenError();

  const getPaidTicket = await hotelRepository.getPaidTicket(getEnrollment.id);
  if (!getPaidTicket) throw forbiddenError();

  const getUserReservation = await bookingRepository.getBookingByUserId(userId);
  if (!getUserReservation) throw forbiddenError();

  const getExistingBooking = await bookingRepository.getBookingByBookingId(bookingId);
  if (!getExistingBooking) throw notFoundError();

  const getRoom = await bookingRepository.getRoomByRoomId(roomId);
  if (!getRoom) throw notFoundError();
    
  const getBookings =  await bookingRepository.getBookedRoomQTDByRoomId(roomId);

  const roomCapacity = Number(getRoom.capacity);
  const bookingQTD = getBookings.length + 1;
  if (bookingQTD >= roomCapacity) throw forbiddenError();

  await bookingRepository.updateBookingByRoomId(bookingId, roomId);
    
  const getNewBooking = await bookingRepository.getNewBookingId(roomId);
  return getNewBooking;
}

const bookingService = {
  getUserBooking,
  postUserBooking,
  updateBooking
};

export default bookingService;
