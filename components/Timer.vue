<template>
  <main>
    <section class="flex flex-col justify-center items-center my-4">
      <div>
        <h2 class="sm:text-lg md:text-2xl text-teal-200 text-center small-caps">
          Elapsed
        </h2>
        <div class="font-mono stopwatch">
          {{ formattedElapsedTime }}
        </div>
      </div>
      <div>
        <h2 class="sm:text-md md:text-xl text-teal-200 text-center small-caps">
          Rest
        </h2>
        <div class="font-mono countdown my-2">
          {{ formattedBreakTime }}
        </div>
      </div>
      <div
        class="flex flex-row flex-wrap justify-evenly
      items-start w-full mt-4"
      >
        <button
          class="flex rounded-md border border-teal-400 px-5 py-4 text-lg
          leading-6 font-medium text-white hover:bg-gray-800 transition
          ease-in-out duration-150"
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
            class="flex rounded-md border border-teal-400 px-5 py-4 text-lg
          leading-6 font-medium text-white hover:bg-gray-800 transition ease-in-out duration-150"
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
            class="flex mr-4 rounded-md border border-teal-400 px-2 py-1 text-sm
          leading-8 text-white hover:bg-gray-800 transition ease-in-out duration-150 mt-4"
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
    </section>
    <div v-if="debug" class="font-mono ml-2">
      time: {{ swState.time / 1000 }} <br />
      break time left: {{ cdState.timeLeft }}
    </div>
    <button
      class="fixed bottom-0 right-0 border border-teal-400 px-4 py-3
      rounded-lg mr-4 mb-4 hover:bg-gray-800"
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
    <transition name="slide">
      <aside
        v-if="settingsModalOpen"
        class="absolute bottom-0 left-0 w-full bg-gray-600 text-white
        rounded-t-md max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pb-6 overflow-hidden"
      >
        <h2 class="text-2xl font-bold mb-2 mt-1">Settings</h2>

        <div>
          <label
            for="break"
            class="block text-sm leading-5 font-medium text-gray-200"
            >Break time</label
          >
          <div class="mt-1 relative">
            <input
              id="break"
              v-model="cdState.breakLength"
              class="sm:text-sm sm:leading-5 bg-gray-800 w-32 pr-16 pl-2 py-1 rounded"
              placeholder="90"
              type="number"
              @keyup.enter="toggleSettings"
            />
            <div
              class="absolute inset-y-0 ml-12 pl-6 flex items-center pointer-events-none"
            >
              <span class="text-gray-400 text-sm leading-5">
                seconds
              </span>
            </div>
          </div>
          <div class="my-4">
            <label for="debug">Debug mode</label>
            <input
              id="debug"
              type="checkbox"
              name="debug"
              class="text-sm leading-5 font-medium text-gray-200"
              @click="debug = !debug"
            />
          </div>
        </div>
        <button
          class="mt-4 sm:ml-4 sm:mt-0 w-full sm:w-auto inline-flex
          items-center justify-center px-6 py-3 border border-transparent
          text-base leading-6 font-semibold rounded-md text-white
          bg-green-500 shadow-sm hover:bg-green-700
          focus:outline-none focus:bg-green-700 transition ease-in-out duration-150"
          @click="toggleSettings"
        >
          Save
        </button>
      </aside>
    </transition>
  </main>
</template>

<script lang="ts">
// eslint-disable-next-line import/no-extraneous-dependencies
import { Component, Vue, Watch } from 'nuxt-property-decorator';

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

  debug: boolean = false;

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

  // mounted(): void {
  //   // prettier-ignore
  //   if (localStorage.getItem('sw-time')){
  // this.time = Number(JSON.parse(localStorage.getItem('sw-time')))
  // };
  // }

  // destroy(): void {
  //   localStorage.setItem('sw-time', JSON.stringify(this.time));
  // }

  toggleSettings(): void {
    this.settingsModalOpen = !this.settingsModalOpen;
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
    // prettier-ignore eslint-ignore
    this.cdState.state = 'running';
    this.cdState.timer = setInterval(() => {
      this.cdState.timeLeft -= 1;
      if (this.cdState.timeLeft <= 0) this.stopCD(); // countdown finished
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
  font-size: 10vw;
}
.countdown {
  font-size: 8vw;
}
.small-caps {
  font-feature-settings: 'smcp';
}
@media (min-width: 768px) {
  .small-caps {
    margin-bottom: -1.5rem;
  }
}
/* removes the arrows next to the number input */
input[type='number'] {
  -moz-appearance: textfield;
}
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
/* Settings Modal Transition */
.slide-enter-active,
.slide-leave-active {
  transition: height 0.25s ease-in-out;
  height: 190px;
}

.slide-enter,
.slide-leave-to {
  height: 0;
}
</style>
