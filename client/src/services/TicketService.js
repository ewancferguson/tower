import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { AppState } from "@/AppState.js"
import { Ticket } from "@/models/Ticket.js"

class TicketService {
  async createTicket(eventData) {
    const response = await api.post('api/tickets', eventData)
    const ticket = new Ticket(response.data)
    AppState.ticketProfiles.push(ticket)
  }
  async getTicketProfiles(eventId) {
    const response = await api.get(`api/events/${eventId}/tickets`)
    logger.log('heller', response.data)
    const tickets = response.data.map(ticketPOJO => new Ticket(ticketPOJO))
    AppState.ticketProfiles = tickets
  }
  async deleteTicket(ticketId) {
    const response = await api.delete(`api/tickets/${ticketId}`)
    logger.log(response.data)
    const ticketIndex = AppState.tickets.findIndex(ticket => ticket.id == ticketId)
    AppState.tickets.splice(ticketIndex, 1)
  }
  async getMyTickets() {
    const response = await api.get('account/tickets')
    logger.log(response.data)
    const tickets = response.data.map(ticketPOJO => new Ticket(ticketPOJO))
    logger.log(tickets)
    AppState.tickets = tickets
  }

}



export const ticketService = new TicketService()