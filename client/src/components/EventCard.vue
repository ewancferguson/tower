<script setup>
import { Event } from '@/models/TowerEvent';

defineProps({
  eventProp: { type: Event, required: true }
})
</script>

<template>
  <div class="card mb-3" style="width: 18rem;">
    <img :src="eventProp.coverImg" class="card-img-top card-img" alt="...">
    <div class="card-body">
      <h5>{{ eventProp.name }}</h5>
      <p>{{ eventProp.location }}</p>
      <p>{{ eventProp.startDate.toLocaleString() }}</p>
      <div class="d-flex justify-content-end align-center">
        <span>{{ eventProp.creator.name }}</span><img class="profile-pic ms-3" :src="eventProp.creator.picture" alt="">
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