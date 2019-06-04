<template>
  <div class="dev-profile">
    <div class="dev-profile__container">
      <div class="dev-profile__header">
        <p class="dev-profile__header--text">
          Профіль ІТ-спеціаліста
        </p>
      </div>
      <v-alert
        class="alert"
        v-model="personalDataALert"
        dismissible
        type="warning">
        Ви не заповнили контактні дані. Для натисніть кнопку "Контактні дані" та заповніть всі поля.
      </v-alert>
      <v-alert
        class="alert"
        v-model="jobDataAlert"
        dismissible
        type="warning">
        Ви  не заповнили професійні дані. Для натисніть кнопку "Профейсійні дані" та заповніть всі поля.
      </v-alert>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'ItSpecialistProfile',
  data() {
    return {
      personalDataALert: !this.personalData,
      jobDataAlert: !this.jobData
    }
  },
  computed: {
    ...mapGetters([
      'jobData',
      'personalData'
    ])
  }
}
</script>

<style scoped>
.dev-profile {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
}
.dev-profile__header {
  width: 100%;
  display: flex;
  justify-content: center;
}
.dev-profile__header--text {
  font-size: 18px;
  color: #000;
  font-weight: bold;
}
.dev-profile__container {
  width: 80%;
  margin-top: 20px;
}
.alert{
  margin-top: 10px;
}
</style>
