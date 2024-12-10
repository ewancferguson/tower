import { dbContext } from "../db/DbContext"

class TowerEventService {
  async getEventById(eventId) {
    const event = (await dbContext.TowerEvents.findById(eventId)).populate('creator')
    return event
  }
  async getAllEvents() {
    const events = await dbContext.TowerEvents.find().populate('creator')
    return events
  }
  async createEvent(eventData) {
    const event = await dbContext.TowerEvents.create(eventData)
    await event.populate('creator')
    return event
  }
}


export const towerEventService = new TowerEventService()