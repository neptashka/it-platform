<template>
  <div class="aside-filter-panel">
    <div class="filter__section">
      <p class="filter--header">
        Мови програмування
      </p>
      <div class="filter__chips">
        <div
          v-for="(language, index) in programLanguages"
          :key="index">
          <div class="chip">
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
            class="chip">
            {{ city }}
          </div>
        </div>
      </div>
    </div>
    <div class="filter__section-last">
      <p class="filter--header">
        Досвід роботи
      </p>
      <v-select
          outline
          :items="yearsWorked"
      ></v-select>
    </div>
  </div>
</template>a

<script>
import { languages, cities } from '../../constants/filters'
import {jobExperience} from '../../constants/filters'

export default {
  name: 'AnnouncementFilter',
  data() {
    return {
      programLanguages: languages,
      citiesToWork: cities,
      yearsWorked: jobExperience
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
  margin-top: 20px;
  width: 80%;
  border-bottom: 1px solid #707070;
  padding-bottom: 20px;
}
.filter__section-last {
  margin-top: 20px;
  width: 80%;
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
  background-color: #e6e6e6;
}
.active-class {
  background-image: linear-gradient(to top right, #54e38e, #41c7af);
}
.passive-class {
  background-color: #e6e6e6;
}
.aside-filter-panel {
  height: calc(100% - 50px);
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
