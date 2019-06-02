<template>
  <div class="vacancies">
    <h1>Vacancies</h1>
  </div>
</template>

<script>
import { getVacancies } from '../../modules/databaseManager/vacanciesQueries'
import { mapGetters } from 'vuex'

export default {
  name: 'VacancyContent',
  mounted() {
    getVacancies()
  },
  computed: {
    ...mapGetters
  }
}
</script>

<style scoped>
.vacancies {
  width: 100%;
  height: 100%;
}
</style>
