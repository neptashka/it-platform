<template>
  <div class="aside-filter-panel">
    <div class="filter__section">
      <p class="filter--header">
        Мови програмування
      </p>
      <div class="filter__chips">
        <div v-for="(language, index) in programLanguages" :key="index">
          <div
            :class="chooseClassForLang(language)"
            @click="selectedLang(language)"
            class="chip"
          >
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
        <div v-for="city in citiesToWork">
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
    <div class="filter__section-last">
      <p class="filter--header">
        Досвід роботи
      </p>
      <v-select outline v-model="experience" :items="yearsWorked"></v-select>
    </div>
  </div> </template
>a

<script>
import { languages, cities } from '../../constants/filters'
import { jobExperience } from '../../constants/filters'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'AnnouncementFilter',
  data() {
    return {
      programLanguages: languages,
      citiesToWork: cities,
      yearsWorked: jobExperience,
      experience: null,
      languagesFilters: [],
      citiesFilters: []
    }
  },
  methods: {
    updateFilters() {
      const filters = {
        cities: this.citiesFilters,
        languages: this.languagesFilters,
        jobExperience: this.experience
      }
      this.updateFilteredRequests({
        filters,
        vacancies: this.requests
      })
    },
    chooseClassForLang(element) {
      const index = this.languagesFilters.indexOf(element)
      return index > -1 ? 'active-class' : 'passive-class'
    },
    selectedLang(element) {
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
    selectedCity(element) {
      const index = this.citiesFilters.indexOf(element)
      if (index > -1) {
        this.citiesFilters.splice(index, 1)
      } else {
        this.citiesFilters.push(element)
      }
      this.updateFilters()
    },
    ...mapActions(['updateFilteredRequests'])
  },
  computed: {
    ...mapGetters(['requests', 'filteredRequests'])
  },
  watch: {
    experience() {
      this.updateFilters()
    }
  }
}
</script>

<style scoped>
.container-filters {
  height: 100%;
  background-color: red;
}
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
.filter__section-last {
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
  background-color: #e6e6e6;
}
.active-class {
  background-image: linear-gradient(to top right, #54e38e, #41c7af);
}
.passive-class {
  background-color: #e6e6e6;
}
.aside-filter-panel {
  height: calc(100vh - 60px);
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
.filter__section p {
  margin-bottom: 8px;
}
</style>
