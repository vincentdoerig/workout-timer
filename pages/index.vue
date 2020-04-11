<template>
  <div
    :class="[onBreak === true ? 'bg-green-700' : '']"
    class="min-h-screen py-4"
  >
    <div class="container mx-auto my-0 rounded">
      <div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 v-if="showTitle" class="text-4xl font-extrabold text-center mb-8">
          Workout Timer
        </h1>
        <!-- <h2 class="subtitle">
        An awesome timer for calisthenics.
      </h2> -->
      </div>
      <timer @break="onBreak = !onBreak" @showTitle="toggleTitle" />
    </div>
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
export default class Home extends Vue {
  onBreak: boolean = false;
  showTitle: boolean = true;

  mounted(): void {
    if (localStorage.showTitle)
      this.showTitle = localStorage.showTitle === 'true';
  }

  toggleTitle(): void {
    this.showTitle = !this.showTitle;
    localStorage.setItem('showTitle', this.showTitle.toString());
  }
}
</script>
