<template>
  <div class="aside-filter-panel">
    <div class="filter__section">
      <p class="filter--header">
        Мови програмування
      </p>
      <div class="filter__chips">
        <div v-for="language in programLanguages">
          <div
            class="chip"
            :class="chooseClassForLang(language)"
            @click="selectedLang(language)"
          >
            {{ language }}
          </div>
        </div>
      </div>
    </div>
    <div class="filter__section-last">
      <p class="filter--header">
        Досвід роботи
      </p>
      <div class="filter--header">
        <v-select v-model="experience" outline :items="yearsWorked"></v-select>
      </div>
    </div>
    <div class="filter__section">
      <p class="filter--header">
        ІТ-компанії
      </p>
      <div class="filter__chips">
        <div v-for="company in companiesArray">
          <div
            class="chip"
            :class="chooseClassForCompany(company)"
            @click="selectedCompany(company)"
          >
            {{ company }}
          </div>
        </div>
      </div>
    </div>
    <div class="filter__section">
      <p class="filter--header">
        Рівень англійської
      </p>
      <div class="filter--header">
        <v-select v-model="English" outline :items="englishList"></v-select>
      </div>
    </div>
    <div class="filter__section">
      <p class="filter--header">
        Міста
      </p>
      <div class="filter__chips">
        <div v-for="(city, index) in citiesToWork" :key="index">
          <div
            class="chip"
            :class="chooseClassForCity(city)"
            @click="selectedCity(city)"
          >
            {{ city }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { languages, cities, english } from '../../constants/filters'
import { mapGetters, mapActions } from 'vuex'
import { jobExperience } from '../../constants/filters'
import { getCompanies } from '../../modules/databaseManager/itCompaniesQuries'

export default {
  name: 'AsideFilterPanel',
  data() {
    return {
      programLanguages: languages,
      citiesToWork: cities,
      yearsWorked: jobExperience,
      englishList: english,
      English: null,
      experience: null,
      citiesFilters: [],
      languagesFilters: [],
      companiesArray: [],
      companiesFilters: []
    }
  },
  methods: {
    chooseClassForLang(element) {
      const index = this.languagesFilters.indexOf(element)
      return index > -1 ? 'active-class' : 'passive-class'
    },
    selectedLang(element) {
      // Vue.set(this.languagesFilters, element, !this.languagesFilters[element])
      const index = this.languagesFilters.indexOf(element)
      if (index > -1) {
        this.languagesFilters.splice(index, 1)
      } else {
        this.languagesFilters.push(element)
      }
      this.updateFilters()
    },
    chooseClassForCity(element) {
      const index = this.citiesFilters.indexOf(element)
      return index > -1 ? 'active-class' : 'passive-class'
    },
    chooseClassForCompany(element) {
      const index = this.companiesFilters.indexOf(element)
      return index > -1 ? 'active-class' : 'passive-class'
    },
    selectedCity(element) {
      // Vue.set(this.citiesFilters, element, !this.citiesFilters[element])
      const index = this.citiesFilters.indexOf(element)
      if (index > -1) {
        this.citiesFilters.splice(index, 1)
      } else {
        this.citiesFilters.push(element)
      }
      this.updateFilters()
    },
    selectedCompany(element) {
      // Vue.set(this.citiesFilters, element, !this.citiesFilters[element])
      const index = this.companiesFilters.indexOf(element)
      if (index > -1) {
        this.companiesFilters.splice(index, 1)
      } else {
        this.companiesFilters.push(element)
      }
      this.updateFilters()
    },
    updateFilters() {
      const filters = {
        cities: this.citiesFilters,
        languages: this.languagesFilters,
        jobExperience: this.experience,
        English: this.English,
        companies: this.companiesFilters
      }
      this.updateFilteredVacancies({
        filters,
        vacancies: this.vacancies
      })
    },
    async getItCompanis() {
      this.companiesArray = await getCompanies()
    },
    ...mapActions(['updateFilteredVacancies'])
  },
  computed: {
    ...mapGetters(['vacancies'])
  },
  mounted() {
    this.getItCompanis()
  },
  watch: {
    experience() {
      this.updateFilters()
    },
    English() {
      this.updateFilters()
    }
  }
}
</script>

<style scoped>
.aside-filter-panel {
  width: 500px;
  height: 100%;
  background-color: #f8f8f8;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
}
.filter__section {
  margin-top: 10px;
  width: 80%;
}
.filter--header {
  font-size: 20px;
  color: #000;
  font-weight: bold;
  text-align: center;
}
.filter__chips {
  display: flex;
  flex-wrap: wrap;
}
.filter__chips:hover {
  cursor: pointer;
}
.chip {
  height: 35px;
  padding: 0 12px;
  border-radius: 10px;
  margin: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 50px;
}
.aside-filter-panel {
  height: calc(100vh - 50px);
  overflow-y: auto;
}
.aside-filter-panel::-webkit-scrollbar {
  width: 10px;
}
.aside-filter-panel::-webkit-scrollbar-track {
  background: #fffdfc;
}
.aside-filter-panel::-webkit-scrollbar-thumb {
  background: #d5d5d5;
  border-radius: 15px;
}
.aside-filter-panel::-webkit-scrollbar-thumb:hover {
  background: #d5d5d5;
}
.filter__section-last {
  margin-top: 10px;
  width: 80%;
}
</style>

<style>
.filter--header .v-messages {
  min-height: 0 !important;
}
.active-class {
  background-image: linear-gradient(to top right, #54e38e, #41c7af);
}
.passive-class {
  background-color: #e6e6e6;
}
</style>
