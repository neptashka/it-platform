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
import { mapGetters, mapActions } from 'vuex'
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
  },
  methods: {
    ...mapActions([
      'updateFilteredVacancies'
    ])
  },
  // mounted() {
  //   //why?
  //   getVacancies()
  //   const filters = {
  //     cities: this.citiesFilters,
  //     languages: this.languagesFilters
  //   }
  //   console.log('VACANCIES FORM', this.vacancies)
  //   const updatedVacancyParam = {
  //     filters,
  //     vacancies: this.vacancies
  //   }
  //   this.updateFilteredVacancies(updatedVacancyParam)
  //   console.log('CREATED', this.filteredVacancies)
  // }
}
</script>

<style scoped>
.vacancy-form {
  width: 100%;
  height: calc(100% - 60px);
  overflow-y: auto;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.announcement {
  height: 150px;
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
