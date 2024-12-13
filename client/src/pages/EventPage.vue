<script setup>
import { AppState } from '@/AppState';
import CommentForm from '@/components/CommentForm.vue';
import CommentList from '@/components/CommentList.vue';
import { commentService } from '@/services/CommentServices';
import { ticketService } from '@/services/TicketService';
import { eventService } from '@/services/TowerEventService';
import Pop from '@/utils/Pop';
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()

const account = computed(() => AppState.account)
const event = computed(() => AppState.activeEvent)
const ticketProfiles = computed(() => AppState.ticketProfiles)
// TODO use this to render some kind of html that says "You are attending!"
const hasTicket = computed(() => ticketProfiles.value.some(ticketProfile => ticketProfile.accountId == account.value?.id))
const comments = computed(() => AppState.comments)


onMounted(() => {
  getEventById()
  getTicketProfiles()
  getCommentsByEventId()
})



async function getEventById() {
  try {
    const eventId = route.params.eventId
    await eventService.getEventById(eventId)
  }
  catch (error) {
    Pop.error(error);
  }
}

async function getTicketProfiles() {
  try {
    const eventId = route.params.eventId
    await ticketService.getTicketProfiles(eventId)
  }
  catch (error) {
    Pop.error(error);
  }
}



async function cancelEvent() {
  try {
    const yes = await Pop.confirm(`Are you sure that you want to ${event.value.isCanceled ? 'remove cancel' : 'cancel'} the ${event.value.name} album?`, "Yes I am sure!")

    if (!yes) return

    const eventId = route.params.eventId
    await eventService.cancelEvent(eventId)
  }
  catch (error) {
    Pop.error(error);
  }
}

async function createTicket() {
  try {
    const eventData = { eventId: route.params.eventId }
    await ticketService.createTicket(eventData)
  }
  catch (error) {
    Pop.error(error);
  }
}


async function getCommentsByEventId() {
  try {
    const eventId = route.params.eventId
    await commentService.getCommentsByEventId(eventId)
  }
  catch (error) {
    Pop.error(error);
  }
}

</script>

<template>
  <div v-if="event" class="container">
    <section class="row mt-5">
      <div class="col-12">
        <img class="shadow cover-img rounded" :src="event.coverImg" alt="">
      </div>
    </section>
    <section class="row mt-5">
      <div class="col-md-7">
        <div class="mb-3 d-flex align-items-center">
          <h1>{{ event.name }}</h1>
          <span class="ms-2 p-2 rounded-pill bg-primary text-light">{{ event.type }}</span>
          <span v-if="event.isCanceled == true" class="ms-2 p-2 rounded-pill bg-danger text-light">Cancelled</span>
          <span v-if="hasTicket == true" class="ms-2 p-2 rounded-pill border border-primary text-primary">Has
            Ticket</span>
        </div>
        <p class="fs-4">{{ event.description }}</p>
        <h4>Date and Time</h4>
        <p class="fs-4"><span class="mdi mdi-calendar-clock"></span> {{ event.startDate.toLocaleString() }}</p>
        <h4>Location</h4>
        <p class="fs-4"><span class="mdi mdi-map-marker"></span> {{ event.location }}</p>
      </div>
      <div class="col-md-4">
        <section class="row mb-5">
          <button v-if="event.creatorId == account?.id" @click="cancelEvent" class="btn btn-outline-danger">{{
            event.isCanceled ? 'Remove Cancellation' :
              'Cancel Event' }}</button>
        </section>
        <section class="row">
          <section class="col-md-6">
            <div v-if="account">
              <!-- FIXME hide this button if the event is canceled! -->
              <button v-if="event.isCanceled == true || ticketProfiles.length >= event.capacity" class="btn btn-danger"
                disabled>
                <i class="d-block mdi mdi-alpha-x"></i>
                Unavailable
              </button>
              <button v-else @click="createTicket()" class="btn btn-primary">
                <i class="d-block mdi mdi-account-plus"></i>
                Grab Ticket
              </button>
            </div>
          </section>
          <div class="col-md-6">
            <h3>{{ ticketProfiles.length }}/{{ event.capacity }}<span class="mdi mdi-account"></span></h3>
          </div>
          <h3 class="mt-2">
            Attending
          </h3>
          <div v-for="ticketProfile in ticketProfiles" :key="ticketProfile.id" class="col-4 mt-3">
            <img :src="ticketProfile.profile.picture" :title="ticketProfile.profile.name"
              :alt="ticketProfile.profile.name" class="img-fluid rounded">
          </div>
        </section>
      </div>
    </section>
  </div>
  <div class="container">
    <CommentForm />
    <section v-for="comment in comments" :key="comment.id" class="row bg-light border rounded shadow p-3 my-3">
      <CommentList :comment-prop="comment" />
    </section>
  </div>
</template>

<style scoped lang="scss">
.cover-img {
  height: 25rem;
  width: 100%;
  object-fit: cover;
}
</style>