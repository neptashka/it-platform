<template>
  <div class="vacancy-content">
    <AsideFilterPanel></AsideFilterPanel>
    <VacancyForm></VacancyForm>
  </div>
</template>

<script>
import { getAllVacancies } from '../../modules/databaseManager/vacanciesQueries'
import AsideFilterPanel from './AsideFilterPanel'
import VacancyForm from './VacancyForm'
import { mapGetters } from 'vuex'

export default {
  name: 'VacancyContent',
  components: {
    AsideFilterPanel,
    VacancyForm
  },
  computed: {
    ...mapGetters(['vacancies'])
  },
  created() {
    getAllVacancies()
  }
}
</script>

<style scoped>
.vacancy-content {
  width: 100%;
  height: 100%;
  display: flex;
}
</style>
