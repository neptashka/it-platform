<template>
  <v-dialog v-model="show" persistent max-width="850">
    <v-card>
      <v-card-title class="form-title__container pa-1">
        <v-spacer />
        <span class="job-form__header">
          Професійні дані
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
                  Вакансія
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
              </v-flex >
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
              <v-flex align-self-center xs2 mb-5>
                <label class="job-form__label">
                  Детально про досвід роботи
                </label>
              </v-flex>
              <v-flex xs10 mt-2>
                <v-textarea
                  :rules="jobNameRule"
                  v-model="form.description"
                  outline
                  name="input-7-4"
                ></v-textarea>
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
import { mapGetters, mapActions } from 'vuex'
import { addJobData } from '../../modules/databaseManager/profileQueries'

export default {
  name: 'JobDataModel',
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
        description: ''
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
    ...mapGetters(['user', 'jobData'])
  },
  methods: {
    ...mapActions(['updateJobData']),
    saveProfData() {
      const profData = {
        ...this.form,
        itSpecialistId: this.user.userId
      }
      addJobData(profData)
      this.$toasted.show(`Інформація збережена`, {
        theme: 'toasted-primary',
        type: 'success',
        position: 'top-center',
        duration: 3000
      })
      this.show = false
    }
  }
}
</script>

<style>
.theme--light.v-text-field--outline > .v-input__control > .v-input__slot {
  border: 1px solid #b3b3b3 !important;
}
.job-form .container {
  padding: 0 50px 0 50px !important;
}
.job-form .v-text-field--box input,
.v-text-field--full-width input,
.v-text-f {
  margin-top: 0 !important;
}
.job-form .theme--light.v-chip {
  background-color: #4ad59e;
  color: #fff;
}
.job-form__label {
  transform: translate(0, -40px);
}
.v-card__title {
  font-size: 20px;
  font-weight: bold;
  display: flex;
  justify-content: center;
}
.form__buttons {
  width: 100%;
  display: flex;
  justify-content: center;
}
.hob-form .v-text-field.v-text-field--enclosed .v-text-field__details {
  margin-bottom: 0 !important;
}
.form-title__container {
  display: flex;
}

/* Text Input styles*/
.v-text-field--box .v-input__slot,
.v-text-field--outline .v-input__slot {
  min-height: 26px !important;
}
.v-input__control {
  min-height: 50px;
}
.job-form__field {
  height: 68px;
}
/* Select input styles*/
.v-select__selections {
  padding-top: 10px !important;
  min-height: 50px !important;
}
.v-select .v-input__slot {
  margin-bottom: 0;
}
</style>
