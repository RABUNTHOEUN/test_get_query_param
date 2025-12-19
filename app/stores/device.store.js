import { defineStore } from "pinia";

export const useDeviceStore = defineStore("device", {
  state: () => ({
    db: null,
    deviceId: null,
    basicToken: null,
    list: [],          // ✅ store list here
    loading: false,
  }),

  actions: {
    setFromQuery(query) {
      this.db = query.db ?? null;
      this.deviceId = query.deviceId ?? null;
      this.basicToken = query.basicToken ?? null;
    },

    async fetchList() {
      if (!this.db || !this.deviceId || !this.basicToken) return;

      this.loading = true;

      try {
        const data = await $fetch("/api/database/list", {
          method: "POST",
          headers: {
            Authorization: `Basic ${this.basicToken}`,
            oc_device_id: this.deviceId,
          },
          body: {
            Codes: [{ database_code: this.db }],
          },
        });

        this.list = data;
      } catch (err) {
        console.error("FETCH LIST ERROR:", err);
      } finally {
        this.loading = false;
      }
    },
  },
});
