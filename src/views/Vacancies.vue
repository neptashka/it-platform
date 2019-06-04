<template>
  <div class="vacancies">
    <Header header-color="#000"></Header>
    <VacancyContent></VacancyContent>
  </div>
</template>

<script>
import Header from '../components/Fixed/Header'
import VacancyContent from '../components/Vacancies/VacancyContent'

export default {
  name: 'Vacancies',
  components: {
    Header,
    VacancyContent
  }
}
</script>

<style scoped>
.vacancies {
  width: 100%;
  height: 100%;
}
</style>
