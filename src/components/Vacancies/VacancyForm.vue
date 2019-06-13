<template>
  <div class="vacancy-form">
    <div
      v-for="(vacancy, index) in filteredVacancies"
      class="announcement">
      <Form :vacancy="vacancy" :color="cardColors[index]"></Form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Form from '../Common/Form'
import { colors } from '../../constants/vacanciesColors'

export default {
  name: 'VacancyForm',
  data() {
    return {
      cardColors: colors
    }
  },
  components: {
    Form
  },
  computed: {
    ...mapGetters([
      'filteredVacancies',
      'vacancies',
      'citiesFilters',
      'languagesFilters'
    ])
  }
}
</script>

<style scoped>
.vacancy-form {
  width: 100%;
  height: calc(100vh - 60px);
  overflow-y: auto;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.announcement {
  width: 80%;
  margin: 20px 0 10px 0;
}
.vacancy-form::-webkit-scrollbar {
  width: 10px;
}
.vacancy-form::-webkit-scrollbar-track {
  background: #fffdfc;
}
.vacancy-form::-webkit-scrollbar-thumb {
  background: #d5d5d5;
  border-radius: 15px;
}
.vacancy-form::-webkit-scrollbar-thumb:hover {
  background: #d5d5d5;
}
</style>
