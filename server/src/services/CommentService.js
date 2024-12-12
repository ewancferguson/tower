import { dbContext } from "../db/DbContext"
import { Forbidden } from "../utils/Errors";

class CommentService {
  async deleteComment(commentId, userId) {
    const commentToDelete = await dbContext.Comments.findById(commentId)

    if (commentToDelete == null) {
      throw new Error("Invalid Id");
    }
    if (commentToDelete.creatorId != userId) {
      throw new Forbidden('NOT IN MY HOUSE')
    }
    await commentToDelete.deleteOne()
    return 'comment gone'
  }
  async getCommentsByEvent(eventId) {
    const comments = await dbContext.Comments.find({ eventId: eventId }).populate('creator')
    return comments
  }
  async createComment(commentData) {
    const comment = await dbContext.Comments.create(commentData)
    await comment.populate('creator')
    return comment
  }

}


export const commentService = new CommentService()