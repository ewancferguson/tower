<script setup>
import { eventService } from '@/services/TowerEventService';
import Pop from '@/utils/Pop';
import { onMounted } from 'vue';

onMounted(() => {

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
  <p></p>
</template>

<style scoped lang="scss"></style>