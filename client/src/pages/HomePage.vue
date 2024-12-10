<script setup>
import { AppState } from '@/AppState';
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
  <p>{{ events }}</p>
</template>

<style scoped lang="scss"></style>