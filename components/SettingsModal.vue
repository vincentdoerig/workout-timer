<template>
  <div>
    <transition
      enter-active-class="duration-300 ease-out"
      enter-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="duration-200 ease-in"
      leave-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="isOpen" class="fixed inset-0 transition-opacity">
        <div
          class="absolute inset-0 bg-gray-700 opacity-75 dark:bg-gray-500"
        ></div>
      </div>
    </transition>

    <transition
      enter-active-class="duration-300 ease-out"
      enter-class="translate-y-4 opacity-0 sm:translate-y-0 sm:scale-95"
      enter-to-class="translate-y-0 opacity-100 sm:scale-100"
      leave-active-class="duration-200 ease-in"
      leave-class="translate-y-0 opacity-100 sm:scale-100"
      leave-to-class="translate-y-4 opacity-0 sm:translate-y-0 sm:scale-95"
    >
      <div
        v-if="isOpen"
        class="fixed inset-x-0 bottom-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center"
      >
        <div
          v-click-outside="cancelSettings"
          class="px-4 pt-5 pb-4 overflow-hidden transition-all transform bg-gray-100 rounded-lg shadow-xl dark:bg-gray-900 sm:max-w-lg lg:max-w-xl sm:w-full sm:p-6"
        >
          <div class="sm:flex sm:items-start">
            <div
              class="items-center justify-center flex-shrink-0 hidden w-12 h-12 mx-auto bg-gray-200 rounded-full dark:bg-gray-800 sm:flex sm:mx-0 sm:h-10 sm:w-10"
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
            <div class="mt-0 sm:ml-4 lg:ml-8">
              <div class="sm:flex sm:flex-row">
                <div>
                  <h3
                    class="text-xl font-medium leading-6 text-gray-900 dark:text-gray-100"
                  >
                    Settings
                  </h3>
                  <div class="mt-2">
                    <div>
                      <label
                        for="break"
                        class="block text-sm font-medium leading-5 text-gray-800 dark:text-gray-200"
                        >Break time</label
                      >
                      <div class="mt-1">
                        <div class="relative">
                          <input
                            id="break"
                            v-model="breakLengthSetting"
                            class="w-32 py-1 pl-2 pr-16 text-gray-900 bg-gray-200 rounded appearance-none focus:shadow-outline sm:text-sm sm:leading-5"
                            :class="error ? 'border border-red-500' : ''"
                            placeholder="90"
                            pattern="[0-9]*"
                            type="text"
                            @keyup.enter="toggleSettings"
                          />
                          <div
                            class="absolute inset-y-0 flex items-center pl-6 ml-12 pointer-events-none"
                          >
                            <span
                              class="text-sm leading-5 text-gray-700 dark:text-gray-800"
                            >
                              seconds
                            </span>
                          </div>
                        </div>
                        <p v-if="error" class="text-xs italic text-red-500">
                          Please choose a valid break time.
                        </p>
                      </div>
                      <div class="my-4">
                        <label for="title" class="inline-flex items-center">
                          <input
                            id="title"
                            type="checkbox"
                            name="title"
                            class="text-teal-500 form-checkbox"
                            :checked="showTitle"
                            @click="toggleSiteTitle"
                          /><span
                            class="ml-2 text-base leading-6 text-gray-800 dark:text-gray-200"
                            >Show title</span
                          ></label
                        >
                      </div>
                      <theme-switcher />
                    </div>
                  </div>
                </div>
                <div class="hidden text-sm sm:ml-8 lg:ml-16 sm:block">
                  <h3
                    class="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100"
                  >
                    Keyboard Shortcuts
                  </h3>
                  <div class="my-2 text-gray-800 dark:text-gray-200">
                    <div class="leading-7">
                      Start/pause:
                      <kbd
                        class="px-2 py-1 font-mono text-xs bg-gray-400 rounded-sm shadow-sm dark:bg-gray-600 dark:text-white"
                        >space</kbd
                      >
                      or
                      <kbd
                        class="px-2 py-1 font-mono text-xs bg-gray-400 rounded-sm shadow-sm dark:bg-gray-600 dark:text-white"
                        >enter</kbd
                      >
                      or
                      <kbd
                        class="px-2 py-1 font-mono text-xs bg-gray-400 rounded-sm shadow-sm dark:bg-gray-600 dark:text-white"
                        >s</kbd
                      >
                    </div>
                    <div class="leading-7">
                      Start/pause break:
                      <kbd
                        class="px-2 py-1 font-mono text-xs bg-gray-400 rounded-sm shadow-sm dark:bg-gray-600 dark:text-white"
                        >b</kbd
                      >
                    </div>
                    <div class="leading-7">
                      Reset timer:
                      <kbd
                        class="px-2 py-1 font-mono text-xs bg-gray-400 rounded-sm shadow-sm dark:bg-gray-600 dark:text-white"
                        >r</kbd
                      >
                    </div>
                    <div class="leading-7">
                      Toggle sound:
                      <kbd
                        class="px-2 py-1 font-mono text-xs bg-gray-400 rounded-sm shadow-sm dark:bg-gray-600 dark:text-white"
                        >m</kbd
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
            <span class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
              <button
                type="button"
                class="inline-flex justify-center w-full px-4 py-2 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-teal-600 border border-transparent rounded-md shadow-sm hover:bg-teal-500 focus:outline-none focus:border-teal-700 focus:shadow-outline sm:text-sm sm:leading-5"
                @click="toggleSettings"
              >
                Save
              </button>
            </span>
            <span
              class="flex w-full mt-3 rounded-md shadow-sm sm:mt-0 sm:w-auto"
            >
              <button
                type="button"
                class="inline-flex justify-center w-full px-4 py-2 text-base font-medium leading-6 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline sm:text-sm sm:leading-5"
                @click="cancelSettings"
              >
                Cancel
              </button>
            </span>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import vClickOutside from 'v-click-outside';
import ThemeSwitcher from '@/components/ThemeSwitcher.vue';
import { mapState, mapMutations } from 'vuex';
import { CountDown } from '../types/timer';

@Component({
  components: {
    ThemeSwitcher,
  },
  methods: {
    ...mapMutations('timer', ['setBreakLength']),
    ...mapMutations('settings', ['toggleTitle', 'setTitle']),
  },
  computed: {
    ...mapState('timer', ['countDown']),
    ...mapState('settings', ['showTitle']),
  },
  directives: {
    clickOutside: vClickOutside.directive,
  },
})
export default class SettingsModal extends Vue {
  @Prop({ required: true, default: false }) isOpen!: boolean;

  breakLengthSetting: number = 90;
  error: boolean = false;

  countDown!: CountDown;
  showTitle!: boolean;
  setBreakLength!: (numbreakLength: number) => void;
  toggleTitle!: () => void;
  setTitle!: (value: boolean) => void;

  mounted(): void {
    if (localStorage.breakLength) {
      const breakLength: number = parseInt(localStorage.breakLength);
      this.breakLengthSetting = breakLength;
      this.setBreakLength(breakLength);
    }
    if (localStorage.showTitle)
      this.setTitle(localStorage.showTitle === 'true');
  }

  toggleSettings(): void {
    if (
      isNaN(this.breakLengthSetting) ||
      this.breakLengthSetting < 1 ||
      this.breakLengthSetting > 3600
    ) {
      // return an error if the input isn't a number, and not bigger than 3600 (1 hour --> max countdown value)
      this.error = true;
      return;
    }
    this.error = false;
    // only save when settings are closed
    localStorage.setItem('breakLength', this.breakLengthSetting.toString());
    // set the setting to the actual break length value
    this.setBreakLength(Number(this.breakLengthSetting));
    this.$emit('close');
  }

  cancelSettings(): void {
    this.breakLengthSetting = this.countDown.breakLength;
    this.$emit('close');
  }

  toggleSiteTitle(): void {
    this.toggleTitle();
    localStorage.setItem('showTitle', this.showTitle.toString());
  }
}
</script>
