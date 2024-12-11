<script setup>
import { AppState } from '@/AppState';
import EventCard from '@/components/EventCard.vue';
import { eventService } from '@/services/TowerEventService';
import Pop from '@/utils/Pop';
import { computed, onMounted } from 'vue';



const events = computed(() => AppState.events)


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
    <section class="row">
      <div v-for="event in events" :key="event.id" class="col-md-3">
        <EventCard :event-prop="event" />
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss"></style>