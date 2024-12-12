import { dbContext } from "../db/DbContext"
import { Forbidden } from "../utils/Errors";

class TicketService {
  async deleteTicket(ticketId, userId) {
    const ticketToDelete = await dbContext.Tickets.findById(ticketId)

    if (ticketToDelete == null) {
      throw new Error("Invalid Id");
    }
    if (ticketToDelete.accountId != userId) {
      throw new Forbidden('NOT IN MY HOUSE')
    }
    await ticketToDelete.deleteOne()
    return 'ticket gone'
  }
  async getTicket(eventId) {
    const tickets = await dbContext.Tickets.find({ eventId: eventId }).populate('profile')
    return tickets
  }
  async getTicketsByAccount(userId) {
    const myTickets = await dbContext.Tickets.find({ accountId: userId }).populate('event')
    return myTickets
  }
  async createTicket(ticketData) {
    const ticket = await dbContext.Tickets.create(ticketData)
    await ticket.populate('profile')
    await ticket.populate('event')
    return ticket
  }
}




export const ticketService = new TicketService()