<template>
  <div>
    <h3 class="text-base leading-6 text-gray-800">
      Theme
    </h3>
    <div class="flex flex-row">
      <input
        id="dark-mode"
        name="form-input push_notifications"
        type="radio"
        class="hidden"
        @click="$colorMode.preference = 'dark'"
      />
      <label for="dark-mode" class="hover:shadow-md cursor-pointer">
        <p class="sr-only">Dark mode</p>
        <div
          class="w-8 h-8 bg-gray-800 rounded border-2 "
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
        class="ml-3 hover:shadow-md cursor-pointer
"
      >
        <p class="sr-only">Light mode</p>
        <div
          class="w-8 h-8 bg-gray-200 rounded border-2 "
          :class="
            $colorMode.value === 'light' ? 'border-teal-700 border-3' : ''
          "
        ></div>
      </label>
    </div>
  </div>
</template>
