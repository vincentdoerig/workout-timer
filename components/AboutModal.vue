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
          v-click-outside="closeModal"
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
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            <div class="mt-0 sm:ml-4 lg:ml-8">
              <div>
                <div>
                  <h3
                    class="text-xl font-medium leading-6 text-gray-900 dark:text-gray-100"
                  >
                    About
                  </h3>
                  <div class="my-4 space-y-3 text-gray-800 dark:text-gray-200">
                    <p>
                      Thank you for using gymtimer.io! If you appreciate this
                      app you can support the creator
                      <a
                        href="https://ko-fi.com/vincentdoerig"
                        class="underline dark-hover:text-white hover:text-black"
                        >here</a
                      >
                      or share it with anyone you think would enjoy.
                    </p>
                    <p>
                      The source code for this website is open source and
                      available on
                      <a
                        href="https://github.com/vincentdoerig/workout-timer"
                        class="underline dark-hover:text-white hover:text-black"
                        >GitHub</a
                      >. It is built with Nuxt.js, TypeScript and Tailwind CSS.
                    </p>
                    <p>
                      Made by
                      <a
                        href="https://doerig.dev"
                        class="underline dark-hover:text-white hover:text-black"
                      >
                        Vincent</a
                      >.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
            <span
              class="flex w-full mt-3 rounded-md shadow-sm sm:mt-0 sm:w-auto"
            >
              <button
                type="button"
                class="inline-flex justify-center w-full px-4 py-2 text-base font-medium leading-6 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline sm:text-sm sm:leading-5"
                @click="closeModal"
              >
                Close
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

@Component({
  directives: {
    clickOutside: vClickOutside.directive,
  },
})
export default class AboutModal extends Vue {
  @Prop({ type: Boolean, required: true, default: false }) isOpen!: boolean;

  closeModal(): void {
    this.$emit('close');
  }
}
</script>
