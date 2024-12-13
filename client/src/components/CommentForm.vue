<script setup>
import { commentService } from '@/services/CommentServices';
import Pop from '@/utils/Pop';
import { ref } from 'vue';
import { useRoute } from 'vue-router';


const route = useRoute()

const editableCommentData = ref({
  body: '',
  eventId: route.params.eventId
})

async function createComment() {
  try {
    await commentService.createComment(editableCommentData.value)
  }
  catch (error) {
    Pop.error(error);
  }
}



</script>


<template>
  <form @submit.prevent="createComment()">
    <div class="mb-3">
      <label for="body" class="form-label">Leave a comment!</label>
      <textarea v-model="editableCommentData.body" class="form-control" id="body" rows="3"></textarea>
    </div>
    <button type="submit" class="btn btn-primary">Post<span class="mdi mdi-plus"></span></button>
  </form>
</template>


<style lang="scss" scoped></style>