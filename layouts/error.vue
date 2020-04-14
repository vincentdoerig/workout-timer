<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl mx-auto mt-4">
      <div v-if="statusCode === 404">
        <h1
          class="text-center text-2xl font-bold leading-7 text-white sm:text-3xl sm:leading-9 py-4"
        >
          404 Not Found
        </h1>
        <p class="font-medium text-gray-100">{{ message }}.</p>
        <p class="mt-8">
          <NuxtLink
            class="font-medium text-gray-500 hover:text-gray-200 underline hover:no-underline"
            to="/"
            >Back to the home page.</NuxtLink
          >
        </p>
      </div>
      <div
        v-else
        class="text-center text-2xl font-bold leading-7 text-white sm:text-3xl sm:leading-9 sm:truncate"
      >
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NuxtError',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  computed: {
    statusCode() {
      return (this.error && this.error.statusCode) || 500;
    },
    message() {
      return this.error.message;
    },
  },
  head() {
    return {
      title: `Error - ${this.message}`,
      meta: [
        {
          name: 'viewport',
          content:
            'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no',
        },
      ],
    };
  },
};
</script>
