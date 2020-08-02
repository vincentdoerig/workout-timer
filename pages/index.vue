<template>
  <div
    :class="[bothRunning === true ? 'bg-green-300 dark:bg-green-700' : '']"
    class="min-h-screen py-4"
  >
    <div class="container mx-auto my-0 rounded">
      <div class="px-4 mx-auto max-w-8xl sm:px-6 lg:px-8">
        <h1 v-if="showTitle" class="mb-8 text-4xl font-extrabold text-center">
          Workout Timer
        </h1>
        <!-- <h2 class="subtitle">
        An awesome timer for calisthenics.
      </h2> -->
      </div>
      <timer @showTitle="toggleTitle" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { mapGetters } from 'vuex';
import Timer from '@/components/Timer.vue';
@Component({
  components: {
    Timer,
  },
  computed: {
    ...mapGetters('timer', ['bothRunning']),
  },
})
export default class Home extends Vue {
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
