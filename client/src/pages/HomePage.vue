<script setup>
import { AppState } from '@/AppState';
import EventCard from '@/components/EventCard.vue';
import { eventService } from '@/services/TowerEventService';
import Pop from '@/utils/Pop';
import { computed, onMounted, ref } from 'vue';

const activeFilterCategory = ref('all')

const categories = ['concert', 'convention', 'digital', 'sport']

const events = computed(() => {
  if (activeFilterCategory.value == 'all') return AppState.events
  return AppState.events.filter(event => event.type == activeFilterCategory.value)
})
const account = computed(() => AppState.account)
onMounted(() => {
  getEvents()
})

async function getEvents() {
  try {
    await eventService.getEvents()
  } catch (error) {
    Pop.error(error);
  }
}
</script>

<template>
  <div class="container my-5">
    <div class="row text-center mb-5">
      <h2 class="fw-bold">Welcome to Tower</h2>
      <p class="text-muted mb-4 mx-auto" style="max-width: 800px;">
        Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin
        literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney
        College in Virginia, discovered the undoubtable source of Lorem Ipsum through a passage in classical literature.
      </p>
      <div class="d-flex justify-content-center gap-3">
        <button v-if="account" data-bs-toggle="modal" data-bs-target="#eventModal"
          class="btn btn-success text-light rounded-pill px-4">
          Create Event
        </button>
        <div @click="getEvents()" class="rounded-pill bg-warning text-light cursor-pointer shadow px-4 py-2">
          <p class="mb-0">All Events</p>
        </div>
      </div>
    </div>

    <section class="row justify-content-center mb-4">
      <div v-for="category in categories" :key="category" @click="activeFilterCategory = category"
        class="text-capitalize col-md-2 text-center rounded-pill bg-primary text-light cursor-pointer shadow py-2 mb-3">
        <p class="mb-0">{{ category }}</p>
      </div>
    </section>

    <section class="row">
      <h2 class="fw-bold text-center mb-4">Browse Events</h2>
      <div v-for="event in events" :key="event.id" class="col-md-4 mb-4">
        <EventCard :event-prop="event" />
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.container {
  max-width: 1200px;
}

.cursor-pointer {
  cursor: pointer;
}
</style>
