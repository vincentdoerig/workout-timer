<template>
  <div>
    <h3 class="text-base leading-6 text-gray-800">
      Theme
    </h3>
    <div class="flex flex-row mt-2">
      <input
        id="dark-mode"
        name="form-input push_notifications"
        type="radio"
        class="hidden"
        @click="$colorMode.preference = 'dark'"
      />
      <label
        for="dark-mode"
        tabindex="0"
        class="rounded cursor-pointer hover:shadow-md focus:shadow-md focus:shadow-outline"
        @keydown.enter="$colorMode.preference = 'dark'"
        @keydown.space="$colorMode.preference = 'dark'"
      >
        <p class="sr-only">Dark mode</p>
        <div
          class="w-8 h-8 bg-gray-800 border-2 rounded"
          :class="$colorMode.value === 'dark' ? 'border-teal-700 border-3' : ''"
        ></div>
      </label>
      <input
        id="light-mode"
        name="form-input push_notifications"
        type="radio"
        class="hidden"
        @click="$colorMode.preference = 'light'"
      />
      <label
        for="light-mode"
        tabindex="0"
        class="ml-3 rounded cursor-pointer hover:shadow-md focus:shadow-md focus:shadow-outline"
        @keydown.enter="$colorMode.preference = 'light'"
        @keydown.space="$colorMode.preference = 'light'"
      >
        <p class="sr-only">Light mode</p>
        <div
          class="w-8 h-8 bg-gray-200 border-2 rounded"
          :class="
            $colorMode.value === 'light' ? 'border-teal-700 border-3' : ''
          "
        ></div>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ThemeSwitcher',
};
</script>
