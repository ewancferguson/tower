import { Error } from "mongoose"
import { dbContext } from "../db/DbContext"
import { Forbidden } from "../utils/Errors"

class TowerEventService {
  async editEvent(eventId, eventData, userId) {
    const eventToEdit = await dbContext.TowerEvents.findById(eventId)
    if (eventToEdit.isCanceled == true) {
      throw new Error("You cant edit a canceled event silly")
    }
    if (eventToEdit.creatorId != userId) {
      throw new Forbidden('NOT IN MY HOUSE')
    }
    eventToEdit.name = eventData.name
    eventToEdit.description = eventData.description
    await eventToEdit.save()
    return eventToEdit
  }
  async cancelEvent(eventId, userId) {
    const eventToCancel = await this.getEventById(eventId)

    if (eventToCancel.creatorId != userId) {
      throw new Forbidden('NOT IN MY HOUSE')
    }


    eventToCancel.isCanceled = !eventToCancel.isCanceled

    await eventToCancel.save()
    return eventToCancel
  }
  async getEventById(eventId) {
    const event = (await dbContext.TowerEvents.findById(eventId))
    await event.populate('creator')
    await event.populate('ticketCount')
    return event
  }
  async getAllEvents() {
    const events = await dbContext.TowerEvents.find().populate('creator').populate('ticketCount')
    return events
  }
  async createEvent(eventData) {
    const event = await dbContext.TowerEvents.create(eventData)
    await event.populate('creator')
    await event.populate('ticketCount')
    return event
  }

}


export const towerEventService = new TowerEventService()