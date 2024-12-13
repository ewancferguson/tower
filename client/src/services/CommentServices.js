import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { Comment } from "@/models/Comment.js"
import { AppState } from "@/AppState.js"

class CommentService {
  async deleteComment(commentId) {
    const response = await api.delete(`api/comments/${commentId}`)
    logger.log(response.data)
    const commentIndex = AppState.comments.findIndex(comment => comment.id == commentId)
    AppState.comments.splice(commentIndex, 1)

  }
  async createComment(commentData) {
    const response = await api.post('api/comments', commentData)
    const comment = new Comment(response.data)
    AppState.comments.push(comment)


  }
  async getCommentsByEventId(eventId) {
    const response = await api.get(`api/events/${eventId}/comments`)
    logger.log('sup playa', response.data)
    const comments = response.data.map(commentPOJO => new Comment(commentPOJO))
    AppState.comments = comments
  }

}

export const commentService = new CommentService()