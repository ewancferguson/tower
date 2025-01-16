<script setup>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState.js';
import { ticketService } from '@/services/TicketService.js';
import Pop from '@/utils/Pop.js';
import EventCard from '@/components/EventCard.vue';
import AccountCard from '@/components/AccountCard.vue';

const account = computed(() => AppState.account);
const tickets = computed(() => AppState.tickets);

onMounted(() => {
  getMyTickets();
});

async function getMyTickets() {
  try {
    await ticketService.getMyTickets();
  } catch (error) {
    Pop.error(error);
  }
}

async function deleteTicket(ticketId) {
  try {
    const yes = await Pop.confirm('Are you sure you want to delete your ticket?');
    if (!yes) return;

    await ticketService.deleteTicket(ticketId);
  } catch (error) {
    Pop.error(error);
  }
}
</script>

<template>
  <div v-if="account" class="container">
    <section class="profile row mt-5">
      <div class="col-md-3 text-center">
        <img class="pfp" :src="account.picture" alt="Profile Picture" />
      </div>
      <div class="col d-flex align-items-center">
        <h1 class="animate-fade-in">{{ account.name }}</h1>
      </div>
    </section>

    <section class="tickets row mt-4">
      <h2 class="col-12 text-center animate-fade-in">Your Tickets</h2>
      <div v-for="ticket in tickets" :key="ticket.id" class="col-md-3">
        <AccountCard :event-prop="ticket" />
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.container {
  animation: fade-in 1s ease;
}

.profile {
  text-align: center;
  animation: slide-down 0.8s ease;
}

.pfp {
  border-radius: 50%;
  height: 15rem;
  width: 15rem;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.pfp:hover {
  transform: scale(1.1);
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
}

h1,
h2 {
  color: #333;
  font-weight: bold;
}

.ticket-card {
  margin-bottom: 2rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.ticket-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

/* Animations */
@keyframes fade-in {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slide-down {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 1s ease;
}

.animate-slide-up {
  animation: slide-up 0.8s ease;
}

.animate-slide-down {
  animation: slide-down 0.8s ease;
}
</style>
