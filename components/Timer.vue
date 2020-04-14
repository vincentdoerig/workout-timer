<template>
  <section>
    <main class="flex flex-col justify-center items-center my-4">
      <div>
        <h2
          class="sm:text-lg md:text-2xl lg:text-3xl text-teal-200 text-center small-caps"
        >
          Elapsed
        </h2>
        <div class="font-mono stopwatch">
          {{ formattedElapsedTime }}
        </div>
      </div>
      <div>
        <h2
          class="sm:text-md md:text-xl lg:text-2xl text-teal-200 text-center small-caps"
        >
          Rest
        </h2>
        <div class="font-mono countdown">
          {{ formattedBreakTime }}
        </div>
      </div>
      <div
        class="flex flex-row flex-wrap justify-evenly items-start w-full mt-4"
      >
        <button
          class="flex rounded-md border border-teal-400 px-5 py-4 text-lg leading-6 font-medium text-white hover:bg-gray-800 transition ease-in-out duration-150 focus:outline-none focus:bg-black"
          @click="startStop"
        >
          <svg
            v-if="swState.state === 'running'"
            stroke="currentColor"
            viewBox="0 0 512 528"
            class="mr-3 h-6 w-6"
          >
            <path
              d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z"
              fill="none"
              stroke-miterlimit="10"
              stroke-width="32"
            />
            <path
              stroke-linecap="round"
              stroke-miterlimit="10"
              stroke-width="32"
              d="M208 192v128M304 192v128"
            />
          </svg>
          <svg
            v-else
            stroke="currentColor"
            viewBox="0 0 512 528"
            class="mr-3 h-6 w-6"
          >
            <path
              d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z"
              fill="none"
              stroke="currentColor"
              stroke-miterlimit="10"
              stroke-width="32"
            />
            <path
              d="M216.32 334.44l114.45-69.14a10.89 10.89 0
              000-18.6l-114.45-69.14a10.78 10.78 0 00-16.32
              9.31v138.26a10.78 10.78 0 0016.32 9.31z"
              fill="currentColor"
            />
          </svg>
          <p>
            {{
              swState.state === 'paused'
                ? !swState.time
                  ? 'Start'
                  : 'Resume'
                : 'Pause'
            }}
          </p>
        </button>
        <div class="flex flex-col items-start">
          <button
            class="flex rounded-md border border-teal-400 px-5 py-4 text-lg leading-6 font-medium text-white hover:bg-gray-800 transition ease-in-out duration-150 focus:outline-none focus:bg-black"
            @click="startStopBreak"
          >
            <svg
              stroke="currentColor"
              viewBox="0 0 528 528"
              class="mr-3 h-6 w-6"
            >
              <path
                d="M145.61 464h220.78c19.8 0 35.55-16.29 33.42-35.06C386.06
              308 304 310 304 256s83.11-51
              95.8-172.94c2-18.78-13.61-35.06-33.41-35.06H145.61c-19.8
              0-35.37 16.28-33.41 35.06C124.89 205 208 201 208 256s-82.06
              52-95.8 172.94c-2.14 18.77 13.61 35.06 33.41 35.06z"
                fill="currentColor"
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
            <p v-if="cdState.state === 'running'">
              Pause Break
            </p>
            <p v-else>
              <span v-if="cdState.timeLeft > 0">Resume Break</span>
              <span v-else
                >Start Break
                <span class="text-sm">({{ cdState.breakLength }}s)</span>
              </span>
            </p>
          </button>
          <button
            v-if="cdState.state === 'paused' && cdState.timeLeft > 0"
            class="flex mr-4 rounded-md border border-teal-400 px-2 py-1 text-sm leading-8 text-white hover:bg-gray-800 transition ease-in-out duration-150 mt-4 focus:outline-none focus:bg-black"
            @click="resetCD"
          >
            <svg
              viewBox="0 0 512 512"
              class="mr-3 mt-2 h-4 w-4"
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
        class="fixed bottom-0 right-0 border border-teal-400 px-4 py-3 rounded-lg mr-32 mb-4 md:mr-4 md:mb-32 hover:bg-gray-800 focus:outline-none focus:bg-black"
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
        class="fixed bottom-0 right-0 border border-teal-400 px-4 py-3 rounded-lg mr-4 mb-4 hover:bg-gray-800 focus:outline-none focus:bg-black"
        title="Open settings"
        @click="toggleSettings"
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
    <transition
      enter-active-class="ease-out duration-300"
      enter-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="ease-in duration-200"
      leave-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="settingsModalOpen" class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
    </transition>

    <transition
      enter-active-class="ease-out duration-300"
      enter-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      enter-to-class="opacity-100 translate-y-0 sm:scale-100"
      leave-active-class="ease-in duration-200"
      leave-class="opacity-100 translate-y-0 sm:scale-100"
      leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    >
      <div
        v-if="settingsModalOpen"
        class="fixed bottom-0 inset-x-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center"
      >
        <div
          class="bg-white rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full sm:p-6"
        >
          <div class="sm:flex sm:items-start">
            <div
              class="hidden sm:flex mx-auto flex-shrink-0 items-center justify-center h-12 w-12 rounded-full bg-gray-200 sm:mx-0 sm:h-10 sm:w-10"
            >
              <svg
                fill="currentColor"
                viewBox="0 0 20 20"
                class="w-6 h-6 text-gray-600"
              >
                <path
                  fill-rule="evenodd"
                  d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            <div class="mt-0 sm:ml-4">
              <h3 class="text-xl leading-6 font-medium text-gray-900">
                Settings
              </h3>
              <div class="mt-2">
                <div>
                  <label
                    for="break"
                    class="block text-sm leading-5 font-medium text-gray-800"
                    >Break time</label
                  >
                  <div class="mt-1">
                    <div class="relative">
                      <input
                        id="break"
                        v-model.lazy="cdState.breakLength"
                        class="appearance-none focus:shadow-outline sm:text-sm sm:leading-5 bg-gray-200 text-gray-900 w-32 pr-16 pl-2 py-1 rounded"
                        :class="error ? 'border border-red-500' : ''"
                        placeholder="90"
                        pattern="[0-9]*"
                        type="text"
                        @keyup.enter="toggleSettings"
                      />
                      <div
                        class="absolute inset-y-0 ml-12 pl-6 flex items-center pointer-events-none"
                      >
                        <span class="text-gray-700 text-sm leading-5">
                          seconds
                        </span>
                      </div>
                    </div>
                    <p v-if="error" class="text-red-500 text-xs italic">
                      Please choose a valid break time.
                    </p>
                  </div>
                  <div class="my-4">
                    <label for="title" class="inline-flex items-center">
                      <input
                        id="title"
                        type="checkbox"
                        name="title"
                        class="form-checkbox text-teal-500"
                        @click="$emit('showTitle')"
                      /><span class="text-base leading-6 text-gray-800 ml-2"
                        >Show Title</span
                      ></label
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
            <span class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
              <button
                type="button"
                class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-teal-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-teal-500 focus:outline-none focus:border-teal-700 focus:shadow-outline transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                @click="toggleSettings"
              >
                Save
              </button>
            </span>
            <span
              class="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto"
            >
              <button
                type="button"
                class="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                @click="cancelSettings"
              >
                Cancel
              </button>
            </span>
          </div>
        </div>
      </div>
    </transition>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator';
import { Howl } from 'howler';
const beepWav = require('@/static/sounds/beep.wav');
const bongWav = require('@/static/sounds/bong.wav');
const bongMp3 = require('@/static/sounds/bong.mp3');

interface stopWatch {
  timer: any;
  time: number;
  state: string;
}
interface countdown {
  timer: any;
  timeLeft: number;
  state: string;
  breakLength: number;
}

@Component
export default class Timer extends Vue {
  settingsModalOpen: boolean = false;

  swState: stopWatch = {
    timer: null,
    time: 0,
    state: 'paused',
  };

  cdState: countdown = {
    timer: null,
    timeLeft: 0,
    state: 'paused',
    breakLength: 90,
  };

  muted: boolean = true;

  error: boolean = false;

  get formattedElapsedTime(): string {
    const date: Date = new Date(0);
    date.setSeconds(this.swState.time);
    const utc: string = date.toUTCString();
    return utc.substring(utc.indexOf(':') - 2, 25);
  }

  get formattedBreakTime(): string {
    const date: Date = new Date(0);
    date.setSeconds(this.cdState.timeLeft);
    const utc: string = date.toUTCString();
    return utc.substring(utc.indexOf(':') + 1, 25);
  }

  get bothRunning(): boolean {
    // eslint-disable-next-line prettier/prettier
    if (this.swState.state === 'running' && this.cdState.state === 'running')
      return true;
    return false;
  }

  get bothPaused(): boolean {
    // eslint-disable-next-line prettier/prettier
    if (this.swState.state === 'paused' && this.cdState.state === 'paused')
      return true;
    return false;
  }

  @Watch('cdState.state')
  isOnBreak() {
    this.$emit('break');
  }

  mounted(): void {
    if (localStorage.muted) this.muted = localStorage.muted === 'true';
    if (localStorage.breakLength)
      this.cdState.breakLength = parseInt(localStorage.breakLength);
  }

  toggleSettings(): void {
    if (
      isNaN(this.cdState.breakLength) ||
      this.cdState.breakLength < 1 ||
      this.cdState.breakLength > 3600
    ) {
      // return an error if the input isn't a number, and not bigger than 3600 (1 hour --> max countdown value)
      this.error = true;
      return;
    }
    this.error = false;
    this.settingsModalOpen = !this.settingsModalOpen;
    if (!this.settingsModalOpen)
      // only save when settings are closed
      localStorage.setItem('breakLength', this.cdState.breakLength.toString());
  }

  cancelSettings(): void {
    this.cdState.breakLength = parseInt(localStorage.breakLength) || 90;
    this.settingsModalOpen = !this.settingsModalOpen;
  }

  toggleSound(): void {
    this.muted = !this.muted;
    localStorage.setItem('muted', this.muted.toString());
  }

  startStop(): void {
    // initial state --> start timer
    if (!this.swState.timer || this.swState.state === 'paused') {
      this.startSW();
      if (this.cdState.timeLeft > 0) this.startCDRecursion();
    } else {
      // stop (pause) all timers
      this.stopSW();
      if (this.cdState.timer) this.stopCD();
    }
  }

  startStopBreak(): void {
    if (this.cdState.timeLeft > 0) {
      // break timer already running
      if (this.bothPaused) {
        // both timers paused => continue stopwatch and countdown
        this.startSW();
        this.startCDRecursion();
      } else if (this.cdState.state === 'running') {
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

  startSW(): void {
    this.swState.state = 'running';
    this.swState.timer = setInterval(() => {
      this.swState.time += 1;
      document.title = this.formattedElapsedTime;
    }, 1000);
  }

  stopSW(): void {
    this.swState.state = 'paused';
    clearInterval(this.swState.timer);
    document.title = `${document.title} (stopped)`;
  }

  resetSW(): void {
    this.swState.time = 0;
    this.swState.state = 'paused';
    this.swState.timer = null;
  }

  startCD(): void {
    this.cdState.timeLeft = this.cdState.breakLength;
    this.startCDRecursion();
  }

  startCDRecursion(): void {
    this.cdState.state = 'running';
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
    this.cdState.timer = setInterval(() => {
      this.cdState.timeLeft -= 1;
      if (
        !this.muted &&
        this.cdState.timeLeft <= 5 &&
        this.cdState.timeLeft > 0
      )
        beep.play();

      if (this.cdState.timeLeft <= 0) {
        // countdown finished
        this.stopCD();
        if (!this.muted) endSound.play();
      }
    }, 1000);
  }

  stopCD(): void {
    this.cdState.state = 'paused';
    clearTimeout(this.cdState.timer);
  }

  resetCD(): void {
    this.cdState.timeLeft = 0;
    this.cdState.state = 'paused';
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
