<template>
  <div>
    <v-app v-if="loggedIn">
      <index-view></index-view>
    </v-app>
    <v-app v-else>
        <unregister></unregister>
    </v-app>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import Login from "./AdminLoginComponent.vue";
import index from "./AdminIndexComponent.vue";
import Unregister from "./AdminUnregisterComponent.vue";
export default {
  name: "admin-master",
  components: {
    login: Login,
    "index-view": index,
    unregister: Unregister
  },
  computed: {
    ...mapGetters({
      loggedIn: "getAdminToken",
    })
  },
  methods: {
    initialize() {},
    ...mapActions([])
  },
  created() {
    this.initialize();
  }
};
</script>
