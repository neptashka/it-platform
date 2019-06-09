<template>
  <v-dialog v-model="show" persistent max-width="850">
    <v-card>
      <v-card-title class="form-title__container pa-1">
        <v-spacer />
        <span class="job-form__header">
          Добавити вакансію
        </span>
        <v-spacer />
        <v-btn
          flat
          fab
          small
          color="#4AD59E"
          @click.stop="show = false"
          class="form-title__icon-close"
        >
          <v-icon>
            close
          </v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text class="pa-1">
        <v-form
          ref="form"
          lazy-validation
          :rules="jobNameRule"
          v-model="validForm"
          class="job-form"
        >
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex align-self-center xs2 mt-1>
                <label class="job-form__label">
                  Назва вакансії
                </label>
              </v-flex>
              <v-flex xs10 my-2 class="job-form__field">
                <v-text-field
                  v-model="form.title"
                  :rules="jobNameRule"
                  required
                  color="#4AD59E"
                  single-line
                  outline
                  height="50"
                  clearable
                >
                </v-text-field>
              </v-flex>
              <v-flex align-self-center xs2 mb-5>
                <label class="job-form__label">
                  Вимоги
                </label>
              </v-flex>
              <v-flex xs10 mt-2>
                <v-textarea
                  :rules="jobNameRule"
                  v-model="form.requirements"
                  outline
                  name="input-7-4"
                ></v-textarea>
              </v-flex>
              <v-flex align-self-center xs2 my-2>
                <label class="job-form__label">
                  Навички
                </label>
              </v-flex>
              <v-flex xs10 mt-2>
                <v-select
                  v-model="form.languages"
                  color="#4AD59E"
                  :rules="jobArrayRule"
                  :items="languageArray"
                  deletable-chips
                  chips
                  multiple
                  outline
                ></v-select>
              </v-flex>
              <v-flex align-self-center xs2 mt-1 mb-4>
                <label class="job-form__label">
                  Досвід роботи
                </label>
              </v-flex>
              <v-flex xs10>
                <v-select
                  v-model="form.experience"
                  color="#4AD59E"
                  :rules="jobNameRule"
                  :items="jobArray"
                  outline
                ></v-select>
              </v-flex>
              <v-flex align-self-center xs2 mt-1 mb-4>
                <label class="job-form__label">
                  Місто
                </label>
              </v-flex>
              <v-flex xs10>
                <v-select
                  v-model="form.city"
                  color="#4AD59E"
                  :rules="jobArrayRule"
                  :items="citiesArray"
                  outline
                ></v-select>
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
      </v-card-text>
      <v-card-actions class="form__buttons pt-0">
        <v-btn
          @click="saveProfData"
          :disabled="!validForm"
          class="green-button button-round-white"
          flat
          round
        >
          Зберегти
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { languages, jobExperience, cities } from '../../constants/filters'
import { mapGetters } from 'vuex'
import { addVacancyToDb } from '../../modules/databaseManager/vacanciesQueries'

export default {
  name: 'AddVacancy',
  props: ['visible'],
  data() {
    return {
      languageArray: languages,
      jobArray: jobExperience,
      citiesArray: cities,
      validForm: false,
      form: {
        title: '',
        languages: [],
        experience: '',
        requirements: ''
      },
      jobNameRule: [v => !!v || `Це поле є обов'язковим`],
      jobArrayRule: [v => (!!v && v.length > 0) || `Це поле є обов'язковим`]
    }
  },
  computed: {
    show: {
      get() {
        return this.visible
      },
      set(value) {
        if (!value) {
          this.$emit('close')
        }
      }
    },
    ...mapGetters(['selectedItCompany', 'itCompanies'])
  },
  methods: {
    saveProfData() {
      const company = this.itCompanies.find(el => el.companyName === this.selectedItCompany)
      const obj = { ...this.form, companyId: company.id }
      addVacancyToDb(obj)
      if(this.profile !== 100) {
        this.$toasted.show('Вакансію успішно створено!', {
          theme: 'toasted-primary',
          type: 'warning',
          position: 'top-center',
          duration: 3000
        })
      }
      this.show = false
    }
  }
}
</script>

<style scoped></style>
