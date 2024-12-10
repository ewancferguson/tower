import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController";
import { towerEventService } from "../services/TowerEventService";

export class TowerEventController extends BaseController {
  constructor() {
    super('api/events')
    this.router
      .get('', this.getAllEvents)
      .get('/:eventId', this.getEventById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createEvent)
  }

  /**
   * Creates a new album from request body and returns the album
   * @param {import("express").Request} request
   * @param {import("express").Response} response
   * @param {import("express").NextFunction} next
   */


  async createEvent(request, response, next) {
    try {
      const eventData = request.body
      eventData.creatorId = request.userInfo.id
      const event = await towerEventService.createEvent(eventData)
      response.send(event)
    }
    catch (error) {
      next(error);
    }

  }

  async getAllEvents(request, response, next) {
    try {
      const events = await towerEventService.getAllEvents()
      response.send(events)
    } catch (error) {
      next(error)
    }
  }

  async getEventById(request, response, next) {
    try {

      const eventId = request.params.eventId
      const event = await towerEventService.getEventById(eventId)
      response.send(event)
    }
    catch (error) {
      next(error)
    }
  }
}