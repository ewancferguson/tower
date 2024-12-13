import { Event } from "@/models/TowerEvent.js"
import { api } from "./AxiosService.js"
import { AppState } from "@/AppState.js"
import { logger } from "@/utils/Logger.js"

class TowerEventService {
  async cancelEvent(eventId) {
    const response = await api.delete(`api/events/${eventId}`)
    const event = new Event(response.data)
    AppState.activeEvent = event
  }
  async createEvent(eventData) {
    const response = await api.post('api/events', eventData)
    logger.log(response.data)
    const event = new Event(response.data)
    AppState.events.push(event)
  }
  async getEventById(eventId) {
    const response = await api.get(`api/events/${eventId}`)
    logger.log(response.data)
    const event = new Event(response.data)
    AppState.activeEvent = event

  }
  async getEvents() {
    const response = await api.get('api/events')
    const events = response.data.map(eventPOJO => new Event(eventPOJO))
    AppState.events = events
  }

}

export const eventService = new TowerEventService()