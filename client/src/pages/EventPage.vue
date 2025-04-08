<script setup>
import { AppState } from '@/AppState';
import CommentForm from '@/components/CommentForm.vue';
import CommentList from '@/components/CommentList.vue';
import { commentService } from '@/services/CommentServices';
import { ticketService } from '@/services/TicketService';
import { eventService } from '@/services/TowerEventService';
import Pop from '@/utils/Pop';
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const account = computed(() => AppState.account);
const event = computed(() => AppState.activeEvent);
const ticketProfiles = computed(() => AppState.ticketProfiles);
const hasTicket = computed(() =>
  ticketProfiles.value.some(
    (ticketProfile) => ticketProfile.accountId == account.value?.id
  )
);
const comments = computed(() => AppState.comments);

const showAllProfiles = ref(false);

const visibleTicketProfiles = computed(() => {
  return showAllProfiles.value
    ? ticketProfiles.value
    : ticketProfiles.value.slice(0, 5);
});

onMounted(() => {
  getEventById();
  getTicketProfiles();
  getCommentsByEventId();
});

async function getEventById() {
  try {
    const eventId = route.params.eventId;
    await eventService.getEventById(eventId);
  } catch (error) {
    Pop.error(error);
  }
}

async function getTicketProfiles() {
  try {
    const eventId = route.params.eventId;
    await ticketService.getTicketProfiles(eventId);
  } catch (error) {
    Pop.error(error);
  }
}

async function cancelEvent() {
  try {
    const yes = await Pop.confirm(
      `Are you sure that you want to ${event.value.isCanceled ? 'remove cancel' : 'cancel'} the ${event.value.name} album?`,
      'Yes I am sure!'
    );

    if (!yes) return;

    const eventId = route.params.eventId;
    await eventService.cancelEvent(eventId);
  } catch (error) {
    Pop.error(error);
  }
}

async function createTicket() {
  try {
    const eventData = { eventId: route.params.eventId };
    await ticketService.createTicket(eventData);
  } catch (error) {
    Pop.error(error);
  }
}

async function getCommentsByEventId() {
  try {
    const eventId = route.params.eventId;
    await commentService.getCommentsByEventId(eventId);
  } catch (error) {
    Pop.error(error);
  }
}
</script>

<template>
  <div v-if="event" class="container">
    <section class="row mt-5">
      <div class="col-12">
        <img class="shadow cover-img rounded" :src="event.coverImg" alt="Event Cover Image" />
      </div>
    </section>

    <section class="row mt-4">
      <div class="col-12 col-md-8">
        <div class="mb-3 d-flex align-items-center">
          <h1 class="h3">{{ event.name }}</h1>
          <span class="ms-2 p-2 rounded-pill bg-primary text-light">{{ event.type }}</span>
          <span v-if="event.isCanceled" class="ms-2 p-2 rounded-pill bg-danger text-light">Cancelled</span>
        </div>
        <p class="fs-5">{{ event.description }}</p>
        <h4 class="mt-3">Date and Time</h4>
        <p class="fs-5">
          <span class="mdi mdi-calendar-clock"></span>
          {{ event.startDate.toLocaleString() }}
        </p>
        <h4>Location</h4>
        <p class="fs-5">
          <span class="mdi mdi-map-marker"></span> {{ event.location }}
        </p>
      </div>

      <div class="col-12 col-md-4">
        <section class="row mb-4 justify-content-center">
          <button v-if="event.creatorId == account?.id" @click="cancelEvent" class="btn btn-outline-danger w-75">
            {{ event.isCanceled ? 'Remove Cancellation' : 'Cancel Event' }}
          </button>
        </section>

        <section class="row justify-content-center">
          <div class="btn-table rounded w-100">
            <div class="p-3" v-if="account">
              <h5 class="text-center">Grab a ticket before this event sells out!</h5>
              <p class="text-center">
                There are {{ event.capacity - ticketProfiles.length }} tickets available.
              </p>
              <p v-if="hasTicket" class="text-success text-center fw-bold">
                You are already attending!
              </p>
              <button v-if="event.isCanceled || ticketProfiles.length >= event.capacity" class="btn btn-danger w-100"
                disabled>
                <i class="d-block mdi mdi-alpha-x"></i>
                Unavailable
              </button>
              <button v-else @click="createTicket()" class="btn btn-primary w-100">
                <i class="d-block mdi mdi-account-plus"></i>
                Grab Ticket
              </button>
            </div>
          </div>

          <h3 class="mt-5">Attending</h3>
          <div class="btn-table rounded mt-2 w-100">
            <div v-if="ticketProfiles.length == 0" class="p-3 text-center">
              <p class="text-center">No one is attending yet.</p>
            </div>
            <div v-else v-for="ticketProfile in visibleTicketProfiles" :key="ticketProfile.id"
              class="d-flex align-items-center mb-3">
              <img class="pfp me-3" :src="ticketProfile.profile.picture" :alt="ticketProfile.profile.name"
                :title="ticketProfile.profile.name" />
              <p class="fw-bold mb-0">{{ ticketProfile.profile.name }}</p>
            </div>

            <div v-if="ticketProfiles.length > 5" class="text-center mt-2">
              <button class="btn btn-link" @click="showAllProfiles = !showAllProfiles">
                {{ showAllProfiles ? 'Show Less' : 'Show More' }}
              </button>
            </div>
          </div>
        </section>
      </div>
    </section>
  </div>

  <div class="container mt-5">
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

.btn-table {
  background-color: #a8c9fc;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.pfp {
  height: 2.5rem;
  width: 2.5rem;
  object-fit: cover;
  border-radius: 50%;
  border: 2px solid white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

@media (max-width: 767px) {
  .cover-img {
    height: 18rem;
  }

  .fs-5 {
    font-size: 1rem;
  }

  .h3 {
    font-size: 1.5rem;
  }

  .btn-table {
    margin: 0 1rem;
  }

  .btn {
    width: 100%;
  }

  .row {
    margin-top: 1.25rem;
    padding: 0 1rem;
  }

  .fw-bold {
    font-size: 0.95rem;
  }
}
</style>
