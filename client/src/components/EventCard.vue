<script setup>
import { Event } from '@/models/TowerEvent';
import { ticketService } from '@/services/TicketService';
import Pop from '@/utils/Pop';

defineProps({
  eventProp: { type: Event, required: true }
})










</script>

<template>
  <div class="card mb-3" style="width: 18rem;">
    <router-link :to="{ name: 'Event', params: { eventId: eventProp.id } }">
      <div>
        <img :src="eventProp.coverImg" class=" card-img-top card-img" alt="...">
      </div>
    </router-link>
    <div class="card-body">
      <h5>{{ eventProp.name }}</h5>
      <p>{{ eventProp.location }}</p>
      <p>{{ eventProp.startDate.toLocaleString() }}</p>
      <div class="d-flex justify-content-end align-items-center">
        <span v-if="eventProp.creator">{{ eventProp.creator?.name }}</span><img v-if="eventProp.creator"
          class="profile-pic ms-3" :src="eventProp.creator?.picture" alt="">
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card-img {
  height: 12rem;
  object-fit: cover;
}

.profile-pic {
  height: 3rem;
  aspect-ratio: 1/1;
  border-radius: 50%;
  object-fit: cover;
}
</style>