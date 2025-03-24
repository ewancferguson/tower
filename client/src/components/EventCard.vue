<script setup>
import { Event } from '@/models/TowerEvent';
import { ticketService } from '@/services/TicketService';
import Pop from '@/utils/Pop';

defineProps({
  eventProp: { type: Event, required: true }
})










</script>

<template>
  <div class="mb-3 event-card" style="width: 20rem;">
    <router-link :to="{ name: 'Event', params: { eventId: eventProp.id } }" class="card-link">
      <div>
        <img :src="eventProp.coverImg" class="card-img-top card-img mb-3" alt="Event cover image">
      </div>
    </router-link>
    <div class="card-body">
      <h5 class="card-title">{{ eventProp.name }}</h5>
      <p class="card-text">{{ eventProp.location }}</p>
      <p class="card-date">{{ eventProp.startDate.toLocaleString() }}</p>
      <div class="d-flex justify-content-between align-items-center">
        <span v-if="eventProp.creator" class="creator-name">{{ eventProp.creator?.name }}</span>
        <img v-if="eventProp.creator" class="profile-pic" :src="eventProp.creator?.picture" alt="Creator picture">
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card-link {
  text-decoration: none;
}

.card-img {
  height: 12rem;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.card-img:hover {
  transform: scale(1.05);
}

.card-title {
  font-size: 1.25rem;
  font-weight: bold;
  color: #333;
}

.card-text {
  color: #666;
  font-size: 0.95rem;
}

.card-date {
  font-size: 0.9rem;
  color: #999;
}

.creator-name {
  font-weight: 500;
  font-size: 0.9rem;
  color: #555;
}

.profile-pic {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  object-fit: cover;
}
</style>