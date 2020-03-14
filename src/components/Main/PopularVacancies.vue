<template>
  <div v-if="popularVacancies.length > 0">
    <h1 class="popular-vacancies__title">Популярні вакансії:</h1>
    <div class="popular-vacancies__container">
      <div class="form-vacancy" v-for="(vacancy, index) in popularVacancies" :key="index">
        <v-card
          class="vacancy-card"
          v-if="vacancy"
          :color="cardColors[index % cardColors.length]"
        >
          <div class="horizontal-container">
            <div v-if="vacancy.company" class="form__avatar">
              <v-avatar size="50">
                <img :src="vacancy.company.image" alt="" />
              </v-avatar>
              <span class="form--text form--small-text">
                {{ vacancy.company.name }}
              </span>
            </div>
            <div class="form__text-content">
              <div class="form__title">
                <span class="form--text form--header">
                  {{ vacancy.title }}
                </span>
              </div>
              <p class="form--text form__requirmentes">
                {{ vacancy.requirements }}
              </p>
              <div class="form--text form__english">
                <p>
                  <span class="form--bold">English: </span>{{ vacancy.English }}
                </p>
              </div>
            </div>
          </div>
          <div class="form__footer">
            <div class="form__location">
              <v-icon class="location__icon" color="#fff">
                location_on
              </v-icon>
              <span class="location__text form--text">
                {{ vacancy.city }}
              </span>
            </div>
          </div>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
import { getPopularVacancies } from '../../modules/databaseManager/vacanciesQueries'
import { colors } from '../../constants/vacanciesColors'

export default {
  name: 'PopularVacancies',
  data() {
    return {
      popularVacancies: [],
      cardColors: colors
    }
  },
  mounted() {
    this.getVacancies()
  },
  methods: {
    async getVacancies() {
      this.popularVacancies = await getPopularVacancies()
    }
  }
}
</script>

<style scoped>
.form {
  width: 100%;
  padding: 10px 0 5px 0;
  height: 100%;
}
.form--text {
  color: #fff;
}
.form__avatar {
  min-width: 80px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.horizontal-container {
  width: 100%;
  display: flex;
}
.form__text-content {
  margin-left: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.form--header {
  font-size: 16px;
  font-weight: bold;
}
.form--small-text {
  margin-top: 10px;
  font-size: 12px;
}
.form__footer {
  display: flex;
  width: 100%;
  align-items: flex-end;
  margin-top: 10px;
}
.form__button-container {
  display: flex;
  width: 100%;
  justify-content: flex-end;
  align-items: flex-end;
}
.form__location {
  display: flex;
  margin-left: 10px;
}
.form--bold {
  font-weight: 800;
}
.location__icon {
  width: 18px;
  height: 18px;
}
.location__text {
  font-weight: bold;
  margin-left: 5px;
}
.form__requirmentes {
  margin-top: 10px;
}
.form__title {
  max-height: 19px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.visible-icon {
  visibility: hidden;
  margin-right: 10px;
}
.popular-vacancies__title {
  margin-top: 10px;
  text-align: center;
  font-size: 18px;
}
.popular-vacancies__container {
  margin-top: 10px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 0 30px 30px 30px;
}
.form-vacancy {
  width: 46%;
  margin-top: 10px;
}
.vacancy-card {
  width: 100%;
  padding: 10px 0 5px 0;
  height: 100%;
}
</style>
