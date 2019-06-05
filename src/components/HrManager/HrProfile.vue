<template>
  <div class="dev-profile">
    <div class="dev-profile__container">
      <div class="dev-profile__header">
        <p class="dev-profile__header--text">
          Профіль HR-менеджера
        </p>
      </div>
      <h1>{{hrContact}}</h1>
      <!--<v-alert-->
      <!--class="alert"-->
      <!--v-model="personalDataALert"-->
      <!--dismissible-->
      <!--type="warning">-->
      <!--Ви не заповнили контактні дані. Для цього натисніть кнопку "Контактні дані" та заповніть всі поля.-->
      <!--</v-alert>-->
      <!--<v-alert-->
      <!--v-if="!jobData"-->
      <!--class="alert"-->
      <!--v-model="jobDataAlert"-->
      <!--dismissible-->
      <!--type="warning">-->
      <!--Ви не заповнили професійні дані. Для цього натисніть кнопку "Профейсійні дані" та заповніть всі поля.-->
      <!--</v-alert>-->
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'HrProfile',
  computed: {
    ...mapGetters(['hrContact'])
  }
}
</script>

<style scoped>

</style>
