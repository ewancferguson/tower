<script setup>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState.js';
import { ticketService } from '@/services/TicketService.js';
import Pop from '@/utils/Pop.js';
import EventCard from '@/components/EventCard.vue';


const account = computed(() => AppState.account)
const tickets = computed(() => AppState.tickets)

onMounted(() => {
  getMyTickets()
})

async function getMyTickets() {
  try {
    await ticketService.getMyTickets()
  }
  catch (error) {
    Pop.error(error);
  }

}
async function deleteTicket(ticketId) {
  try {
    const yes = await Pop.confirm('Are you sure you want to delete your ticket?')
    if (!yes) return

    await ticketService.deleteTicket(ticketId)
  }
  catch (error) {
    Pop.error(error);
  }
}



</script>

<template>
  <div v-if="account" class="container">
    <section class="row mt-5">
      <div class="col-md-3">
        <img class="pfp" :src="account.picture" alt="">
      </div>
      <div class="col d-flex align-items-center mb-5">
        <h1>{{ account.name }}</h1>
      </div>
    </section>
    <section class="row">
      <h1>Your Tickets</h1>
      <div v-for="ticket in tickets" :key="ticket.id" class="col-md-3">
        <EventCard :event-prop="ticket.event" />
        <button @click="deleteTicket(ticket.id)" class="btn btn-danger mb-3">Stop Watching</button>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.pfp {
  border-radius: 50%;
  height: 15rem;
  object-fit: cover;
}
</style>
