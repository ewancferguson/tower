<script setup>
import { AppState } from '@/AppState';
import EventCard from '@/components/EventCard.vue';
import { eventService } from '@/services/TowerEventService';
import Pop from '@/utils/Pop';
import { computed, onMounted, ref } from 'vue';

const events = computed(() => {
  if (activeFilterCategory.value == 'all') return AppState.events
  return AppState.events.filter(events => events.type == activeFilterCategory.value)
})



const activeFilterCategory = ref('all')

const categories = [
  { name: 'all' },
  { name: 'concert' },
  { name: 'convention' },
  { name: 'sport' },
  { name: 'digital' },
]
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
  <div class="picture-bg">
    <div class="container-fluid bg-hero d-flex flex-column justify-content-center">
      <div class="row p-md-5 mt-md-5 text-bg kanit-regular text-md-start text-center">
        <div class="col-12">
          <h2 class="event-text ubuntu-regular text-light">Event management for people, by people</h2>
        </div>
        <div class="col-md-6 col-12">
          <h4 class="event-text ubuntu-regular text-light">Whatever your interest, from hiking and reading to networking
            and skill sharing, there
            are thousands of people who share it on Tower. Events are happening every day- log in and join the fun.</h4>
        </div>
      </div>
    </div>
  </div>
  <div class="container my-5">

    <h2 class="ubuntu-regular">How Tower Works</h2>
    <section class="row justify-content-evenly">
      <div class="col-md-4 p-3">
        <h3><i class="mdi mdi-magnify text-success"></i> Discover events you're interested in</h3>
        <p>Browse through community hosted events for all the things you love</p>
      </div>
      <div class="col-md-4 p-3 ">
        <h3> <i class="mdi mdi-plus text-success "></i> Start an event to invite your friends</h3>
        <p>Create your own Tower Event, and draw from a community of millions</p>
      </div>
    </section>

    <section class="row align-items-center">
      <div class="col-12">
        <div class="row justify-content-evenly p-3">
          <div @click="activeFilterCategory = category.name" role="button" v-for="category in categories"
            :key="category.name" class="col-md-2 col-4 my-1 text-center mx-2 p-1 kanit-medium">
            <div class="text-capitalize categoryBox p-md-3 p-1">
              <div v-if="category.name == 'all'"><i class="mdi mdi-infinity fs-3"></i></div>
              <div v-if="category.name == 'concert'"><i class="mdi mdi-guitar-electric fs-3"></i></div>
              <div v-if="category.name == 'convention'"><i class="mdi mdi-account-group fs-3"></i></div>
              <div v-if="category.name == 'sport'"><i class="mdi mdi-soccer fs-3"></i></div>
              <div v-if="category.name == 'digital'"><i class="mdi mdi-television fs-3"></i></div>
              <div class="fs-md-5">{{ category.name }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>


    <h2 class="fw-bold mb-4 w-100">Browse Events</h2>
    <section class="row justify-content-center">
      <div v-for="event in events" :key="event.id"
        class="col-12 col-sm-6 col-md-4 col-lg-4 d-flex justify-content-center mb-4">
        <EventCard :event-prop="event" />
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.bg-hero {
  background-image: url('https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fGZvcm1hbCUyMHBhcnR5fGVufDB8fDB8fHwy');
  background-size: cover;
  background-position: center;
  height: 40em;
  opacity: 75%;
}


.event-text {
  text-shadow: 2px 2px 2px black;
  color: #F8F6FF;
}

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

.categoryBox {
  background-color: #F8F6FF;
  transition: 0.2s ease-in-out;
}

.categoryBox:hover {
  background-color: #ceccd4;
  transform: scale(1.1);
}
</style>
