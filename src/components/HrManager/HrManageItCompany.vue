<template>
  <div class="component-container">
    <v-alert
      class="alert"
      v-model="itCompanyAlert"
      dismissible
      outline
      type="warning"
    >
      Ви не заповнили інформацію про ІТ-компанію. Для цього або виберіть
      ІТ-компанію із списку існуючих, або створіть нову.
    </v-alert>
    <v-card v-if="itCompany" color="#061939">
      <v-container>
        <v-layout row>
          <v-flex xs2>
            <v-avatar size="100">
              <img :src="itCompany.image" alt="" />
            </v-avatar>
          </v-flex>
          <v-flex xs10>
            <v-layout column>
              <p class="white-text text-header">{{ itCompany.name }}</p>
              <a class="white-text" :href="itCompany.website">
                {{ itCompany.website }}
              </a>
              <div class="white-text it-company__cities">
                <v-icon class="location__icon" color="#fff">
                  location_on
                </v-icon>
                <span class="location__text form--text">
                  {{ itCompany.cities.join(', ') }}
                </span>
              </div>
            </v-layout>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <p class="white-text form__description">
              {{ itCompany.description }}
            </p>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'HrManageItCompany',
  data() {
    return {
      itCompanyAlert: !this.itCompany
    }
  },
  computed: {
    ...mapGetters(['selectedItCompany', 'itCompany'])
  },
  watch: {
    itCompany(value) {
      if (value) {
        this.itCompanyAlert = !value
      }
    }
  },
  mounted() {
    this.itCompanyAlert = !this.itCompany
  }
}
</script>

<style scoped>
.white-text {
  color: #ffffff;
}
.text-header {
  font-size: 18px;
  font-weight: bold;
}
.form__description {
  margin-top: 20px;
}
.it-company__cities {
  margin-top: 10px;
}
</style>
