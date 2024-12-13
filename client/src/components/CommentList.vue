<script setup>
import { AppState } from '@/AppState';
import { Comment } from '@/models/Comment';
import { commentService } from '@/services/CommentServices';
import Pop from '@/utils/Pop';
import { computed } from 'vue';

const account = computed(() => AppState.account)

defineProps({
  commentProp: { type: Comment, required: true }
})



async function deleteComment(commentId) {
  try {
    const yes = await Pop.confirm(`Are you sure that you want to delete comment`)

    if (!yes) return
    await commentService.deleteComment(commentId)

  }
  catch (error) {
    Pop.error(error);
  }
}

</script>


<template>
  <div>
    <img class="comment-pfp" :src="commentProp.creator.picture" alt="">
    <h6>{{ commentProp.creator.name }}</h6>
    <p>{{ commentProp.body }}</p>
    <span @click="deleteComment(commentProp.id)" v-if="account?.id == commentProp.creator.id"
      class="selectable mdi mdi-delete text-danger"></span>
  </div>
</template>


<style lang="scss" scoped>
.comment-pfp {
  height: 4em;
  border-radius: 50%;
  object-fit: cover;
}
</style>