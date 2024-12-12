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


onMounted(() => {
  getEvents()
})


async function getEvents() {
  try {
    await eventService.getEvents()
  }
  catch (error) {
    Pop.error(error);
  }
}
</script>

<template>
  <div class="container">
    <div class="row justify-content-end mb-3">
      <div class="col">
        <button data-bs-toggle="modal" data-bs-target="#eventModal" class="btn btn-primary rounded">Create
          Event</button>
      </div>
    </div>
    <section class="row justify-content-between">
      <div @click="activeFilterCategory = category" role="button" v-for="category in categories" :key="category"
        class="col-md-2 text-center rounded-pill bg-primary text-light selectable shadow">
        <p>{{ category }}</p>
      </div>
    </section>
    <section class="row">
      <h2>Browse Events</h2>
      <div v-for="event in events" :key="event.id" class="col-md-3">
        <EventCard :event-prop="event" />
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss"></style>