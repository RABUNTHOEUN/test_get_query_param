<script setup>
import { useRoute } from "#imports";
import { useDeviceStore } from "@/stores/device.store";

const route = useRoute();
const deviceStore = useDeviceStore();

// 1️⃣ Sync query params
watch(
  () => route.query,
  async (query) => {
    deviceStore.setFromQuery(query);

    // 2️⃣ Fetch list after params ready
    await deviceStore.fetchList();
  },
  { immediate: true }
);
</script>

<template>
  <div style="padding: 20px">
    <h1>Database List</h1>

    <p><b>DB:</b> {{ deviceStore.db }}</p>
    <p><b>Device:</b> {{ deviceStore.deviceId }}</p>
    <p><b>Basic Token:</b> {{ deviceStore.basicToken }}</p>

    <hr />

    <p v-if="deviceStore.loading">Loading...</p>

    <ul v-else>
      <li v-for="item in deviceStore.list" :key="item.id">
        {{ item.name }}
      </li>
    </ul>

    <p v-if="!deviceStore.list?.length && !deviceStore.loading">
      No data found
    </p>
  </div>
</template>
