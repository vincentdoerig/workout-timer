<template>
  <section>
    <main class="flex flex-col items-center justify-center my-4">
      <div>
        <h2
          class="text-center text-teal-900 sm:text-lg md:text-2xl lg:text-3xl dark:text-teal-200 small-caps"
        >
          Elapsed
        </h2>
        <div class="font-mono stopwatch">
          {{ formattedElapsedTime }}
        </div>
      </div>
      <div>
        <h2
          class="text-center text-teal-900 sm:text-md md:text-xl lg:text-2xl dark:text-teal-200 small-caps"
        >
          Rest
        </h2>
        <div class="font-mono countdown">
          {{ formattedBreakTime }}
        </div>
      </div>
      <div
        class="flex flex-row flex-wrap items-start w-full mt-4 justify-evenly"
      >
        <div class="flex flex-col items-start">
          <button
            class="flex px-5 py-4 text-lg font-medium leading-6 text-black transition duration-150 ease-in-out border border-teal-600 rounded-md dark:border-teal-400 dark:text-white hover:bg-gray-200 dark-hover:bg-gray-800 focus:outline-none focus:bg-gray-400 dark-focus:bg-black"
            @click="startStop"
          >
            <svg
              v-if="stopWatch.state === 'running'"
              class="w-6 h-6 mr-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <svg
              v-else
              class="w-6 h-6 mr-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                d="M14.7519 11.1679L11.5547 9.03647C10.8901 8.59343 10 9.06982 10 9.86852V14.1315C10 14.9302 10.8901 15.4066 11.5547 14.9635L14.7519 12.8321C15.3457 12.4362 15.3457 11.5638 14.7519 11.1679Z"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <p>
              {{
                stopWatch.state === 'paused'
                  ? !stopWatch.time
                    ? 'Start'
                    : 'Resume'
                  : 'Pause'
              }}
            </p>
          </button>
          <button
            v-if="stopWatch.state === 'paused' && stopWatch.time > 0"
            class="flex px-2 py-1 mt-4 mr-4 text-sm leading-8 text-black transition duration-150 ease-in-out border border-teal-600 rounded-md dark:border-teal-400 dark:text-white hover:bg-gray-200 dark-hover:bg-gray-800 focus:outline-none focus:bg-gray-400 dark-focus:bg-black"
            @click="resetSW"
          >
            <svg
              fill="currentColor"
              viewBox="0 0 20 20"
              class="w-4 h-4 mt-2 mr-3"
            >
              <path
                fill-rule="evenodd"
                d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                clip-rule="evenodd"
              ></path>
            </svg>
            Reset
          </button>
        </div>

        <div class="flex flex-col items-start">
          <button
            class="flex px-5 py-4 text-lg font-medium leading-6 text-black transition duration-150 ease-in-out border border-teal-600 rounded-md dark:border-teal-400 dark:text-white hover:bg-gray-200 dark-hover:bg-gray-800 focus:outline-none focus:bg-gray-400 dark-focus:bg-black"
            @click="startStopBreak"
          >
            <svg
              stroke="currentColor"
              viewBox="0 0 528 528"
              class="w-6 h-6 mr-3"
            >
              <path
                d="M145.61 464h220.78c19.8 0 35.55-16.29 33.42-35.06C386.06
              308 304 310 304 256s83.11-51
              95.8-172.94c2-18.78-13.61-35.06-33.41-35.06H145.61c-19.8
              0-35.37 16.28-33.41 35.06C124.89 205 208 201 208 256s-82.06
              52-95.8 172.94c-2.14 18.77 13.61 35.06 33.41 35.06z"
                fill="white"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="32"
              />
              <path
                d="M343.3 432H169.13c-15.6 0-20-18-9.06-29.16C186.55 376 240
              356.78 240 326V224c0-19.85-38-35-61.51-67.2-3.88-5.31-3.49-12.8
              6.37-12.8h142.73c8.41 0 10.23 7.43 6.4 12.75C310.82 189 272 204.05
              272 224v102c0 30.53 55.71 47 80.4 76.87 9.95 12.04 6.47 29.13-9.1 29.13z"
              />
            </svg>
            <p v-if="countDown.state === 'running'">
              Pause Break
            </p>
            <p v-else>
              <span v-if="countDown.timeLeft > 0">Resume Break</span>
              <span v-else
                >Start Break
                <span class="text-sm">({{ countDown.breakLength }}s)</span>
              </span>
            </p>
          </button>
          <button
            v-if="countDown.state === 'paused' && countDown.timeLeft > 0"
            class="flex px-2 py-1 mt-4 mr-4 text-sm leading-8 text-black transition duration-150 ease-in-out border border-teal-600 rounded-md dark:border-teal-400 dark:text-white hover:bg-gray-200 dark-hover:bg-gray-800 focus:outline-none focus:bg-gray-400 dark-focus:bg-black"
            @click="resetCD"
          >
            <svg
              viewBox="0 0 512 512"
              class="w-4 h-4 mt-2 mr-3"
              stroke="currentColor"
            >
              <path
                d="M320 146s24.36-12-64-12a160 160 0 10160 160"
                fill="none"
                stroke-linecap="round"
                stroke-miterlimit="10"
                stroke-width="32"
              />
              <path
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="32"
                d="M256 58l80 80-80 80"
              />
            </svg>
            Reset Break
          </button>
        </div>
      </div>
    </main>
    <section>
      <button
        class="fixed bottom-0 right-0 px-4 py-3 mb-4 mr-64 border border-teal-400 rounded-lg md:mr-4 md:mb-64 hover:bg-gray-200 dark-hover:bg-gray-800 focus:outline-none focus:bg-gray-400 dark-focus:bg-black"
        title="Open about"
        @click="isAboutModalVisible = !isAboutModalVisible"
      >
        <svg fill="currentColor" viewBox="0 0 20 20" class="w-8 h-8 cog">
          <path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>
      <button
        class="fixed bottom-0 right-0 px-4 py-3 mb-4 mr-32 border border-teal-400 rounded-lg md:mr-4 md:mb-32 hover:bg-gray-200 dark-hover:bg-gray-800 focus:outline-none focus:bg-gray-400 dark-focus:bg-black"
        :title="muted ? 'Click to unmute' : 'Click to mute'"
        @click="toggleSound"
      >
        <svg
          v-if="muted"
          fill="currentColor"
          viewBox="0 0 20 20"
          class="w-8 h-8"
        >
          <path
            fill-rule="evenodd"
            d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>

        <svg v-else fill="currentColor" viewBox="0 0 20 20" class="w-8 h-8">
          <path
            fill-rule="evenodd"
            d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>
      <button
        class="fixed bottom-0 right-0 px-4 py-3 mb-4 mr-4 border border-teal-400 rounded-lg hover:bg-gray-200 dark-hover:bg-gray-800 focus:outline-none focus:bg-gray-400 dark-focus:bg-black"
        title="Open settings"
        @click="isModalVisible = !isModalVisible"
      >
        <svg fill="currentColor" viewBox="0 0 20 20" class="w-8 h-8 cog">
          <path
            fill-rule="evenodd"
            d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0
          01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061
          2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0
          01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0
          012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0
          012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0
          01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0
          01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532
          1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>
    </section>
    <AboutModal
      :is-open="isAboutModalVisible"
      @close="isAboutModalVisible = false"
    />
    <SettingsModal :is-open="isModalVisible" @close="isModalVisible = false" />
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { mapGetters, mapState, mapMutations } from 'vuex';
import { Howl } from 'howler';
import SettingsModal from '@/components/SettingsModal.vue';
import AboutModal from '@/components/AboutModal.vue';
import { StopWatch, CountDown } from '../types/timer';

const beepWav = require('@/static/sounds/beep.wav');
const bongWav = require('@/static/sounds/bong.wav');
const bongMp3 = require('@/static/sounds/bong.mp3');

@Component({
  components: {
    SettingsModal,
    AboutModal,
  },
  methods: {
    ...mapMutations('timer', [
      'setBreakLength',
      'setSW',
      'setCD',
      'increaseSWInterval',
      'setSWInterval',
      'clearSWInterval',
      'decreaseCDInterval',
      'setCDInterval',
      'clearCDInterval',
    ]),
    // ...mapActions('timer', []),
  },
  computed: {
    ...mapGetters('timer', [
      'formattedElapsedTime',
      'formattedBreakTime',
      'bothRunning',
      'bothPaused',
    ]),
    ...mapState('timer', ['stopWatch', 'countDown']),
  },
})
export default class Timer extends Vue {
  muted: boolean = true;
  isModalVisible: boolean = false;
  isAboutModalVisible: boolean = false;

  // State
  stopWatch!: StopWatch;
  countDown!: CountDown;
  // Getters
  formattedElapsedTime!: string;
  bothPaused!: boolean;
  bothRunning!: boolean;
  // Mutations
  setSW!: (payload: { property: string; value: any }) => void;
  setCD!: (payload: { property: string; value: any }) => void;
  increaseSWInterval!: () => void;
  setSWInterval!: (interval: number) => void;
  clearSWInterval!: () => void;
  decreaseCDInterval!: () => void;
  setCDInterval!: (interval: number) => void;
  clearCDInterval!: () => void;

  mounted(): void {
    if (localStorage.muted) this.muted = localStorage.muted === 'true';
    window.addEventListener('keydown', this.handleShortcut);
  }

  destroyed(): void {
    window.removeEventListener('keydown', this.handleShortcut);
  }

  startStop(): void {
    // initial state --> start timer
    if (!this.stopWatch.timer || this.stopWatch.state === 'paused') {
      this.startSW();
      if (this.countDown.timeLeft > 0) this.startCDRecursion();
    } else {
      // stop (pause) all timers
      this.stopSW();
      if (this.countDown.timer) this.stopCD();
    }
  }

  startSW(): void {
    this.setSW({ property: 'state', value: 'running' });
    this.startCountingUp();
  }

  stopSW(): void {
    this.setSW({ property: 'state', value: 'paused' });
    this.clearSWInterval();
    document.title = `${document.title} (stopped)`;
  }

  resetSW(): void {
    if (this.stopWatch.state === 'running') this.startStop();
    this.setSW({ property: 'time', value: 0 });
    this.setSW({ property: 'state', value: 'paused' });
    this.setSW({ property: 'timer', value: null });
    document.title = 'Gym Timer';
  }

  startCountingUp(): void {
    const interval = window.setInterval(() => {
      this.increaseSWInterval();
      document.title = this.formattedElapsedTime;
    }, 1000);
    this.setSW({ property: 'timer', value: interval });
  }

  startStopBreak(): void {
    if (this.countDown.timeLeft > 0) {
      // break timer already running
      if (this.bothPaused) {
        // both timers paused => continue stopwatch and countdown
        this.startSW();
        this.startCDRecursion();
      } else if (this.countDown.state === 'running') {
        this.stopCD();
      } else {
        this.startCDRecursion();
      }
    } else if (this.bothPaused) {
      this.startSW();
      this.startCD();
    } else if (this.bothRunning) {
      this.stopCD();
    } else {
      this.startCD();
    }
  }

  handleShortcut(e: KeyboardEvent): void {
    if (
      !this.isModalVisible &&
      !this.isAboutModalVisible &&
      (e.keyCode === 32 || e.key === 's' || e.key === 'Enter')
    )
      this.startStop();
    if (e.key === 'b') this.startStopBreak();
    if (e.key === 'm') this.toggleSound();
    if (e.key === 'r') this.resetSW();
    if (e.key === 'Escape' && this.isModalVisible) this.isModalVisible = false; // TODO this should also undo breakLengthSetting
    if (e.key === 'Escape' && this.isAboutModalVisible)
      this.isAboutModalVisible = false;
  }

  toggleSound(): void {
    this.muted = !this.muted;
    localStorage.setItem('muted', this.muted.toString());
  }

  startCD(): void {
    this.setCD({ property: 'timeLeft', value: this.countDown.breakLength });
    this.startCDRecursion();
  }

  startCDRecursion(): void {
    this.setCD({ property: 'state', value: 'running' });
    const endSound = new Howl({
      src: [bongMp3, bongWav],
      // volume: 0.5,
      autoplay: false,
    });
    const beep = new Howl({
      src: beepWav,
      // volume: 0.5,
      autoplay: false,
    });
    const interval = setInterval(() => {
      this.decreaseCDInterval();
      if (
        !this.muted &&
        this.countDown.timeLeft <= 5 &&
        this.countDown.timeLeft > 0
      )
        beep.play();

      if (this.countDown.timeLeft <= 0) {
        // countdown finished
        this.stopCD();
        if (!this.muted) endSound.play();
      }
    }, 1000);
    this.setCD({ property: 'timer', value: interval });
  }

  stopCD(): void {
    this.setCD({ property: 'state', value: 'paused' });
    this.clearCDInterval();
  }

  resetCD(): void {
    this.setCD({ property: 'timeLeft', value: 0 });
    this.setCD({ property: 'state', value: 'paused' });
  }
}
</script>

<style>
.stopwatch {
  font-size: 19.5vw;
  margin: -5vw 0;
}
.countdown {
  font-size: 18vw;
  margin: -4vw 0;
}
.small-caps {
  font-feature-settings: 'smcp';
}
@media (min-width: 768px) {
  .small-caps {
    margin-bottom: -1.5rem;
  }
}
</style>
