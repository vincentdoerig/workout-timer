<template>
  <div class="container">
    <div>
      <logo />
      <div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-4xl font-extrabold">
          Workout Timer
        </h1>
        <h2 class="subtitle">
          An awesome timer for calisthenics.
        </h2>
      </div>
      <timer />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Timer from '~/components/Timer.vue';
import Logo from '~/components/Logo.vue';

export default Vue.extend({
  components: {
    Timer,
    Logo,
  },
});
</script>
