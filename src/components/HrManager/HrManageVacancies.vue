<template>
  <div class="vacancy-form__container">
    <v-alert
      class="alert"
      v-model="vacancyAlert"
      dismissible
      outline
      type="warning"
    >
      Ви ще не створили жодної вакансії!
    </v-alert>
    <v-expansion-panel v-if="vacanciesAre()">
      <v-expansion-panel-content v-for="(vacancy, i) in hrVacancies" :key="i">
        <template slot="header">
          <v-card
            clas="vacancy-form"
            :color="cardColors[i % cardColors.length]"
          >
            <v-container>
              <v-layout column>
                <v-layout row>
                  <v-flex xs12>
                    <v-layout column>
                      <p
                        class="vacancy-form--white-text form--bold vacancy-form--margin-left"
                      >
                        {{ vacancy.title }}
                      </p>
                      <p
                        class="vacancy-form--white-text vacancy-form--margin-left"
                      >
                        {{ vacancy.requirements }}
                      </p>
                      <div
                        class="vacancy-form--white-text form__english vacancy-form--margin-left"
                      >
                        <p>
                          <span class="form--bold">English: </span
                          >{{ vacancy.English }}
                        </p>
                      </div>
                      <div class="form__chips">
                        <v-chip
                          class="active-chip"
                          v-for="(chip, i) in vacancy.languages"
                          :key="i"
                        >
                          {{ chip }}
                        </v-chip>
                      </div>
                    </v-layout>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <div class="form__location vacancy-form--margin-top">
                    <v-icon class="location__icon" color="#fff">
                      location_on
                    </v-icon>
                    <span class="location__text vacancy-form--white-text">
                      {{ vacancy.city }}
                    </span>
                  </div>
                  <div class="form-vacancy__button-container">
                    <v-btn flat icon small color="white">
                      <v-icon>delete</v-icon>
                    </v-btn>
                  </div>
                </v-layout>
              </v-layout>
            </v-container>
          </v-card>
        </template>
        <div
          v-if="vacancy.contact"
          v-for="hrContact in vacancy.contact"
          class="vacancies__contacts"
        >
          <v-card class="form" color="#fff">
            <v-container>
              <div class="horizontal-container">
                <div class="form__avatar">
                  <v-avatar size="60">
                    <img :src="hrContact.image" alt="" />
                  </v-avatar>
                  <span class="form--text bold">
                    {{ hrContact.fullName }}
                  </span>
                </div>
                <div class="form__text-content">
                  <div class="form__title">
                    <span class="form--text form--header bold">
                      {{ hrContact.title }}
                    </span>
                  </div>
                  <p class="form--text form__requirmentes">
                    {{ hrContact.description }}
                  </p>
                </div>
              </div>
              <div class="text-horizontal form--text">
                <p>
                  <span class="bold">Досвід роботи:</span>
                  {{ hrContact.experience }}
                </p>
              </div>
              <div class="text-horizontal form--text">
                <p>
                  <span class="bold">Номер телефону:</span>
                  {{ hrContact.phone }}
                </p>
              </div>
              <div class="text-horizontal form--text">
                <p>
                  <span class="bold"> Резюме:</span
                  ><a class="link" href="https://firebasestorage.googleapis.com/v0/b/it-platform-ca5c8.appspot.com/o/cv%2F2017_%D0%B5%D0%BA%D0%BE%D0%BD%D0%BE%D0%BC%D1%96%D1%87%D0%BD%D0%B0-%D1%87%D0%B0%D1%81%D1%82%D0%B8%D0%BD%D0%B0.docx?alt=media&token=8ec83762-894b-422d-ab01-5fd1ffa2d64e">{{ hrContact.cv }}</a>
                </p>
              </div>
              <div class="text-horizontal form--text">
                <p><span class="bold"> Skype:</span> {{ hrContact.skype }}</p>
              </div>
              <div class="form__footer">
                <div class="form__location">
                  <v-icon class="location__icon" color="#000">
                    location_on
                  </v-icon>
                  <span class="location__text form--text">
                    {{ hrContact.city }}
                  </span>
                </div>
                <div class="form__status-choser">
                  <v-select
                    :items="statusArray"
                    color="teal"
                    class="status-select"
                    item-text="status"
                    item-value="color"
                  >
                  </v-select>
                </div>
              </div>
            </v-container>
          </v-card>
        </div>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { storageService } from '../../main'
import { colors } from '../../constants/vacanciesColors'
import { status } from '../../constants/status'

export default {
  name: 'HrManageVacancies',
  data() {
    return {
      vacancyAlert: false,
      cardColors: colors,
      statusArray: status,
      statusModel: null
    }
  },
  computed: {
    ...mapGetters(['hrContact', 'hrProgress', 'sentVacancy', 'hrVacancies'])
  },
  methods: {
    async getCvUrl(contactCv) {
      const pathReference = storageService.ref(`cv/${contactCv}`)
      const cvUrl = await pathReference.getDownloadURL()
      console.log('CV URL', cvUrl)
      return cvUrl
      // then(function(url) {
      //   return url
      // })
      // return cvUrl
    },
    isInfoAlert() {
      return this.hrProgress === 60 && !this.sentVacancy
    },
    vacanciesAre() {
      return !!this.hrVacancies.length > 0
    }
  },
  watch: {
    hrVacancies(value) {
      if (value && value.length > 0) this.vacancyAlert = !value
      if (
        value.some(
          vacancy => vacancy['contact'] && vacancy['contact'].length > 0
        )
      )
        this.$forceUpdate()
    }
  },
  mounted() {
    this.vacancyAlert = !!(this.hrVacancies.length === 0)
  }
}
</script>

<style scoped>
.vacancy-form--white-text {
  color: #ffffff;
}
.bold {
  font-weight: bold;
}
.vacancy-form__text--center {
  margin-top: 10px;
}
.form__location {
  display: flex;
  margin-left: 10px;
}
.location__icon {
  width: 18px;
  height: 18px;
}
.location__text {
  font-weight: bold;
  margin-left: 5px;
  color: #fff;
}
.link {
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
.contact__header {
  text-align: center;
  margin-bottom: 10px;
  font-size: 20px;
}
.active-chip {
  background-color: white;
  opacity: 0.8;
}
.form-vacancy__button-container {
  display: flex;
  width: 100%;
  justify-content: flex-end;
  align-items: flex-end;
}
.tag {
  width: 24px;
  height: 24px;
  border-radius: 100%;
  background-color: green;
}
.form--bold {
  font-weight: 800;
}
.vacancy-form__container {
  height: calc(100vh - 130px);
  width: 100%;
  overflow-y: auto;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.text-horizontal {
  margin-left: 120px;
}
.vacancy-form__container::-webkit-scrollbar {
  width: 10px;
}
.vacancy-form__container::-webkit-scrollbar-track {
  background: #fffdfc;
}
.vacancy-form__container::-webkit-scrollbar-thumb {
  background: #d5d5d5;
  border-radius: 15px;
}
.vacancy-form__container::-webkit-scrollbar-thumb:hover {
  background: #d5d5d5;
}
.vacancy-form--margin-left {
  margin-left: 10px;
}
.vacancy-form--margin-top {
  margin-top: 10px;
}
.horizontal-container {
  width: 100%;
  display: flex;
}
.form--text {
  color: #000;
  margin-top: 5px;
}
.form__avatar {
  min-width: 110px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.form--small-text {
  margin-top: 10px;
  font-size: 12px;
}
.vacancies__contacts {
  margin: 5px 48px 5px 25px;
}
.form__text-content {
  margin-left: 10px;
  height: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
}
.form__status-choser {
  display: flex;
  justify-content: flex-end;
  margin-right: 20px;
  width: 100%;
}
.form__footer {
  display: flex;
}
.form--header {
  font-size: 16px;
}
</style>

<style>
.component-container {
  width: 100%;
  height: 100%;
}
.vacancy-form .container {
  padding: 10px !important;
}
.vacancy-form__container .v-alert {
  width: 100%;
}
.status-select.v-select {
  height: 30px;
  max-width: 140px;
  font-size: 14px;
  transform: translate(0, -42px);
}
.status-select .v-input__icon {
  margin-top: 13px;
}
</style>
