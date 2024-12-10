import { Event } from "@/models/TowerEvent.js"
import { api } from "./AxiosService.js"
import { AppState } from "@/AppState.js"

class TowerEventService {
  async getEvents() {
    const response = await api.get('api/events')
    const events = response.data.map(eventPOJO => new Event(eventPOJO))
    AppState.events = events
  }

}

export const eventService = new TowerEventService()