import { prisma } from "@/config";

async function getBookingByUserId(userId: number) {
  return prisma.booking.findFirst({
    where: {
      userId
    }, include: {
      Room: true
    }
  });
}

async function getRoomByRoomId(roomId: number) {
  return prisma.room.findFirst({
    where: {
      id: roomId
    }
  });
}

async function getBookedRoomQTDByRoomId(roomId: number) {
  return prisma.booking.findMany ({
    where: {
      roomId
    }
  });
}

async function getNewBookingId(roomId: number) {
  return prisma.booking.findFirst({
    where: {
      roomId
    }
  });
}

async function postBooking(roomId: number, userId: number) {
  return prisma.booking.create({
    data: {
      userId,
      roomId
    }
  });
}

async function updateBookingByRoomId(bookingId: number, roomId: number) {
  return prisma.booking.update({
    where: {
      id: bookingId
    }, data: {
      roomId
    }
  });
}

async function getBookingByBookingId(bookingId: number) {
  return prisma.booking.findFirst({
    where: {
      id: bookingId
    }
  });
}

const bookingRepository = {
  getBookingByUserId,
  postBooking,
  getRoomByRoomId,
  updateBookingByRoomId,
  getBookedRoomQTDByRoomId,
  getNewBookingId,
  getBookingByBookingId
};

export default bookingRepository;
