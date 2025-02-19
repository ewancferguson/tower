<script setup>
import { AppState } from '@/AppState';
import EventCard from '@/components/EventCard.vue';
import { eventService } from '@/services/TowerEventService';
import Pop from '@/utils/Pop';
import { computed, onMounted, ref } from 'vue';

const activeFilterCategory = ref('all')

const categories = ['concert', 'convention', 'digital', 'sport']

const events = computed(() => {
  if (activeFilterCategory.value == 'all') return AppState.events
  return AppState.events.filter(event => event.type == activeFilterCategory.value)
})
const account = computed(() => AppState.account)
onMounted(() => {
  getEvents()
})

async function getEvents() {
  try {
    await eventService.getEvents()
  } catch (error) {
    Pop.error(error);
  }
}
</script>

<template>
  <div class="container my-5">
    <div class="row text-center mb-5">
      <h2 class="fw-bold">Welcome to Tower</h2>
      <p class="text-muted mb-4 mx-auto" style="max-width: 800px;">
        Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin
        literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney
        College in Virginia, discovered the undoubtable source of Lorem Ipsum through a passage in classical literature.
      </p>
      <div class="d-flex justify-content-center gap-3">
        <button v-if="account" data-bs-toggle="modal" data-bs-target="#eventModal"
          class="btn btn-success text-light rounded-pill px-4">
          Create Event
        </button>
      </div>
    </div>

    <section class="d-flex flex-wrap justify-content-center gap-2 gap-md-3 mb-4">
      <button @click="activeFilterCategory = 'all'" class="sort-button">All Events</button>
      <button v-for="category in categories" :key="category" @click="activeFilterCategory = category"
        class="sort-button">
        {{ category }}
      </button>
    </section>

    <section class="row justify-content-center">
      <h2 class="fw-bold text-center mb-4 w-100">Browse Events</h2>
      <div v-for="event in events" :key="event.id"
        class="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center mb-4">
        <EventCard :event-prop="event" />
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.container {
  max-width: 1200px;
  padding: 0 15px;
}

.cursor-pointer {
  cursor: pointer;
}

.category-button {
  background-color: #6c757d;
  color: white;
  transition: background-color 0.3s, transform 0.3s ease-in-out;
}

.category-button:hover {
  background-color: #5a6268;
  transform: scale(1.05);
}

.sort-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 30px;
  font-weight: bold;
  text-transform: capitalize;
  transition: background-color 0.3s, transform 0.3s ease-in-out;
  font-size: 1rem;
}

.sort-button:hover {
  background-color: #0056b3;
  transform: scale(1.05);
}

.sort-button:focus {
  outline: none;
}

@media (max-width: 768px) {
  .category-button {
    flex: 0 0 45%;
  }

  .sort-button {
    padding: 8px 16px;
    font-size: 0.9rem;
  }

  .col-sm-6 {
    flex: 0 0 50%;
  }
}

@media (max-width: 576px) {
  .sort-button {
    width: 100%;
    padding: 10px;
    font-size: 0.85rem;
  }

  .col-12 {
    flex: 0 0 100%;
  }

  .rounded-pill {
    padding-left: 10px;
    padding-right: 10px;
  }

  .mb-4 {
    margin-bottom: 1rem;
  }
}
</style>
