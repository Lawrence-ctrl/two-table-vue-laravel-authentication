<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar color="success " dark flat>
            <v-toolbar-title>Enter Email Rest Code</v-toolbar-title>
            <v-spacer/>
          </v-toolbar>
          <v-form ref="codeForm">
            <div v-if="serverError" class="text-center errorscss">
              <v-alert icon="mdi-shield-lock-outline" prominent text type="error">{{ serverError }}</v-alert>
            </div>
            <v-card-text>
              <v-text-field
                label="Enter Code*"
                :rules="codeRules"
                name="text"
                v-model="code"
                clearable
                prepend-icon="person"
                type="text"
              />
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn type="submit" :loading="loading" @click.prevent="reset()" color="success">Send</v-btn>
              <v-btn type="submit" @click.prevent="cancel()" color="success">back</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "admin-fillcode",
  data() {
    return {
      loading: false,
      code: "",
      codeRules: [v => !!v || "This field is required"],
      serverError: ""
    };
  },
  methods: {
    ...mapActions(["adminFillCode"]),
    reset() {
      if (this.$refs.codeForm.validate()) {
        this.loading = true;
        this.adminFillCode({
          code: this.code
        })
          .then(response => {
            if (response.status === 200) {
                this.$router.push({path: '/admin/resetform', query: { token: this.code }})
              this.loading = false;
              this.serverError = "";
            }
          })
          .catch(error => {
            this.serverError = error.response.data.error;
            this.loading = false;
          });
      }
    },
    cancel() {
        this.$router.push({ path: '/admin/forgot'});
    }
  }
};
</script>
<style scoped>
.errorscss {
  margin: 1rem;
}
i.v-icon.notranslate.v-alert__icon.mdi.mdi-shield-lock-outline.theme--dark.error--text {
  font-size: 5px;
}
div.v-alert.v-sheet.theme--dark.v-alert--prominent.v-alert--text.error--text {
  margin: 0;
  padding: 0;
}
</style>
