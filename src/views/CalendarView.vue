<template>
  <div>
    <router-link to="/">back</router-link>
    <br />
    <Calendar />
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";

export default {
  name: "CalendarView",
  components: {
    Calendar: defineAsyncComponent(() => import("calendar/Calendar")),
  },
};
</script>
