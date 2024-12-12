import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController";
import { towerEventService } from "../services/TowerEventService";
import { ticketService } from "../services/TicketService";
import { commentService } from "../services/CommentService";

export class TowerEventController extends BaseController {
  constructor() {
    super('api/events')
    this.router
      .get('', this.getAllEvents)
      .get('/:eventId', this.getEventById)
      .get('/:eventId/comments', this.getCommentsByEvent)
      .get('/:eventId/tickets', this.getTickets)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createEvent)
      .delete('/:eventId', this.cancelEvent)
      .put('/:eventId', this.editEvent)
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

  async cancelEvent(request, response, next) {
    try {
      const userId = request.userInfo.id
      const eventId = request.params.eventId
      const event = await towerEventService.cancelEvent(eventId, userId)
      response.send(event)
    } catch (error) {
      next(error)
    }
  }

  async editEvent(request, response, next) {
    try {
      const userId = request.userInfo.id
      const eventId = request.params.eventId
      const eventData = request.body
      const event = await towerEventService.editEvent(eventId, eventData, userId)
      response.send(event)
    } catch (error) {
      next(error)
    }
  }


  async getTickets(request, response, next) {
    try {
      const eventId = request.params.eventId
      const tickets = await ticketService.getTicket(eventId)
      response.send(tickets)
    } catch (error) {
      next(error)
    }
  }

  async getCommentsByEvent(request, response, next) {
    try {
      const eventId = request.params.eventId
      const comments = await commentService.getCommentsByEvent(eventId)
      response.send(comments)
    } catch (error) {
      next(error)
    }
  }

}