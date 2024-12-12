import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController";
import { commentService } from "../services/CommentService";

export class CommentController extends BaseController {
  constructor() {
    super('api/comments')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createComment)
      .delete('/:commentId', this.deleteComment)
  }


  async createComment(request, response, next) {
    try {
      const commentData = request.body
      commentData.creatorId = request.userInfo.id
      const comment = await commentService.createComment(commentData)
      response.send(comment)
    } catch (error) {
      next(error)
    }
  }


  async deleteComment(request, response, next) {
    try {
      const commentId = request.params.commentId
      const userId = request.userInfo.id
      const message = await commentService.deleteComment(commentId, userId)
      response.send(message)
    } catch (error) {
      next(error)
    }
  }




  /* async deleteTicket(request, response, next) {
      try {
        const ticketId = request.params.ticketId
        const userId = request.userInfo.id
        const message = await ticketService.deleteTicket(ticketId, userId)
        response.send(message)
      } catch (error) {
        next(error)
      }
    } */


}