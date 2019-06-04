<template>
  <div class="aside-filter-panel">
    <div class="filter__section">
      <p class="filter--header">
        Мови програмування
      </p>
      <div class="filter__chips">
        <div
          v-for="language in programLanguages">
          <div
            class="chip"
            :class="chooseClassForLang(language)"
            @click="selectedLang(language)">
            {{ language }}
          </div>
        </div>
      </div>
    </div>
    <div class="filter__section">
      <p class="filter--header">
        Міста
      </p>
      <div class="filter__chips">
        <div
          v-for="city in citiesToWork">
          <div
            class="chip"
            :class="chooseClassForCity(city)"
            @click="selectedCity(city)">
            {{ city }}
          </div>
        </div>
      </div>
    </div>
    <div class="filter__section">
      <p class="filter--header">
        Досвід роботи
      </p>
      <div class="filter--header">
        <v-select
          solo
          :items="yearsWorked"
        ></v-select>
      </div>
    </div>
  </div>
</template>

<script>
import { languages, cities } from '../../constants/filters'
import { mapGetters, mapActions } from 'vuex'
import { jobExperience } from '../../constants/filters'
import Vue from 'vue'

export default {
  name: 'AsideFilterPanel',
  data() {
    return {
      programLanguages: languages,
      citiesToWork: cities,
      yearsWorked: jobExperience
    }
  },
  methods: {
    chooseClassForLang(element) {
      return this.languagesFilters[element]
        ? 'active-class'
        : 'passive-class'
    },
    selectedLang(element) {
      Vue.set(this.languagesFilters, element, !this.languagesFilters[element])
      this.updateFilters()
    },
    chooseClassForCity(element) {
      return this.citiesFilters[element]
        ? 'active-class'
        : 'passive-class'
    },
    selectedCity(element) {
      Vue.set(this.citiesFilters, element, !this.citiesFilters[element])
      this.updateFilters()
    },
    updateFilters() {
      const filters = {
        cities: this.citiesFilters,
        languages: this.languagesFilters
      }
      this.updateFilteredVacancies({
        filters,
        vacancies: this.vacancies
      })
    },
    ...mapActions([
      'updateLanguagesFilters',
      'updateCitiesFilters',
      'updateFilteredVacancies'
    ])
  },
  computed: {
    ...mapGetters([
      'citiesFilters',
      'languagesFilters',
      'vacancies'
    ])
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
  margin-top: 20px;
  width: 80%;
  border-bottom: 1px solid #707070;
  padding-bottom: 20px;
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
.active-class {
  background-image: linear-gradient(to top right, #54e38e, #41c7af);
}
.passive-class {
  background-color: #e6e6e6;
}
.aside-filter-panel {
  height: calc(100% - 60px);
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
</style>
