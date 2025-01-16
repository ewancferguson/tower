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
    <div class="row mb-3">
      <h2 class="text-center mt-4">Welcome To Tower</h2>
      <h6 class="text-center mb-4">Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a
        piece
        of classical Latin
        literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney
        College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and
        going through the cites of the word in classical literature, discovered the undoubtable source. </h6>
      <div class="col">
        <section class="row justify-content-between">
          <div class="col-md-3">
            <button data-bs-toggle="modal" data-bs-target="#eventModal"
              class="btn btn-success text-light rounded">Create
              Event</button>
          </div>
          <div @click="getEvents()" class="col-md-2 text-center rounded-pill bg-warning text-light selectable shadow">
            <p>All Events</p>
          </div>
        </section>
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