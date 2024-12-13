<script setup>
import { eventService } from '@/services/TowerEventService';
import Pop from '@/utils/Pop';
import { Modal } from 'bootstrap';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

const categories = ['concert', 'convention', 'digital', 'sport']

const editableEventData = ref({
  name: '',
  location: '',
  type: '',
  startDate: '',
  capacity: '',
  coverImg: '',
  description: '',
})



async function createEvent() {
  try {
    if (editableEventData.value.description == '') {

      delete editableEventData.value.description
    }
    const event = await eventService.createEvent(editableEventData.value)
    editableEventData.value = {
      name: '',
      location: '',
      type: '',
      startDate: '',
      capacity: '',
      coverImg: '',
      description: '',
    }
    Modal.getInstance('#eventModal').hide()
    router.push({ name: 'Event', params: { eventId: event.id } })
  }
  catch (error) {
    Pop.error(error);
  }
}




</script>

<template>
  <form @submit.prevent="createEvent()">
    <div class="mb-3">
      <label for="name" class="form-label">Name</label>
      <input v-model="editableEventData.name" type="text" class="form-control" id="name">
    </div>
    <div class="mb-3">
      <label for="location" class="form-label">Location</label>
      <input v-model="editableEventData.location" type="text" class="form-control" id="location">
    </div>
    <div class="mb-3">
      <label for="Select Type" class="form-label">Type</label>
      <select v-model="editableEventData.type" class="form-select" aria-label="Select Type">
        <option selected>Select Type</option>
        <option v-for="category in categories" :key="category" :value="category" class="text-capitalize">
          {{ category }}
        </option>
      </select>
    </div>
    <div class="mb-3">
      <label for="date" class="form-label">Start Date</label>
      <input v-model="editableEventData.startDate" type="date" class="form-control" id="date">
    </div>
    <div class="mb-3">
      <label for="capacity" class="form-label">Capacity</label>
      <input v-model="editableEventData.capacity" type="number" class="form-control" id="capacity">
    </div>
    <div class="mb-3">
      <label for="imageUrl" class="form-label">Image Url</label>
      <input v-model="editableEventData.coverImg" type="url" class="form-control" id="imageUrl">
    </div>
    <div class="mb-3">
      <label for="description" class="form-label">Description</label>
      <textarea v-model="editableEventData.description" class="form-control" id="description" rows="3"></textarea>
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
  </form>
</template>

<style scoped lang="scss"></style>