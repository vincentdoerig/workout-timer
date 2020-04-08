<template>
  <div class="container mx-auto my-0">
    <div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 class="text-4xl font-extrabold text-center my-8">
        Workout Timer
      </h1>
      <!-- <h2 class="subtitle">
        An awesome timer for calisthenics.
      </h2> -->
    </div>
    <timer />
  </div>
</template>

<script lang="ts">
// eslint-disable-next-line import/no-extraneous-dependencies
import { Component, Vue } from 'nuxt-property-decorator';
import Timer from '@/components/Timer.vue';
@Component({
  components: {
    Timer,
  },
})
export default class Home extends Vue {}
</script>
