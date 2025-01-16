<script setup>
import { Ticket } from '@/models/Ticket';
import { Event } from '@/models/TowerEvent';
import { ticketService } from '@/services/TicketService';
import Pop from '@/utils/Pop';

defineProps({
  eventProp: { type: Ticket, required: true }
});

async function deleteTicket(ticketId) {
  try {
    const yes = await Pop.confirm('Are you sure you want to delete your ticket?');
    if (!yes) return;

    await ticketService.deleteTicket(ticketId);
    Pop.success('Ticket deleted successfully!');
  } catch (error) {
    Pop.error(error);
  }
}
</script>

<template>
  <div class="card mb-3 event-card" style="width: 18rem;">
    <router-link :to="{ name: 'Event', params: { eventId: eventProp.id } }" class="card-link">
      <div>
        <img :src="eventProp.event.coverImg" class="card-img-top card-img" alt="Event cover image">
      </div>
    </router-link>
    <div class="card-body">
      <h5 class="card-title">{{ eventProp.event.name }}</h5>
      <p class="card-text">{{ eventProp.event.location }}</p>
      <p class="card-date">{{ eventProp.event.startDate.toLocaleString() }}</p>
      <div class="d-flex justify-content-between align-items-center">
        <span v-if="eventProp.event.creator" class="creator-name">{{ eventProp.event.creator?.name }}</span>
        <img v-if="eventProp.event.creator" class="profile-pic" :src="eventProp.event.creator?.picture"
          alt="Creator picture">
      </div>
      <button class="btn btn-danger btn-sm mt-3 w-100 delete-btn" @click="deleteTicket(eventProp.id)">
        Delete Ticket
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.event-card {
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
}

.event-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

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

.delete-btn {
  background-color: #dc3545;
  border-color: #dc3545;
  color: #fff;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.delete-btn:hover {
  background-color: #c82333;
  box-shadow: 0 4px 10px rgba(220, 53, 69, 0.4);
}
</style>
