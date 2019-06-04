<template>
  <v-dialog
    v-model="show"
    persistent
    height="80%"
    width="60%">
    <v-card>
      <v-card-title class="form-title__container">
        <span
          class="job-form__header">
          Професійні дані
        </span>
        <v-btn
          flat
          fab
          color="#4AD59E"
          @click.stop="show = false"
          class="form-title__icon-close">
          <v-icon>
            close
          </v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-form
          ref="form"
          lazy-validation
          v-model="validForm"
          class="job-form">
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex
                align-self-center
                xs2>
                <label
                  class="job-form__label">
                  Вакансія
                </label>
              </v-flex>
              <v-flex xs10>
                <v-text-field
                  required
                  rows="2"
                  color="#4AD59E"
                  single-line
                  outline>
                </v-text-field>
              </v-flex>
              <v-flex align-self-center xs2>
                <label
                  class="job-form__label">
                  Навички
                </label>
              </v-flex>
              <v-flex xs10>
                <v-select
                  rows="2"
                  v-model="skillsModel"
                  color="#4AD59E"
                  :items="languageArray"
                  deletable-chips
                  chips
                  multiple
                  outline
                ></v-select>
              </v-flex>
              <v-flex align-self-center xs2>
                <label
                  class="job-form__label">
                  Досвід роботи
                </label>
              </v-flex>
              <v-flex xs10>
                <v-select
                  v-model="experienceModel"
                  color="#4AD59E"
                  :items="jobArray"
                  outline
                ></v-select>
              </v-flex>
              <v-flex align-self-center xs2>
                <label
                  class="job-form__label">
                  Детально про досвід роботи
                </label>
              </v-flex>
              <v-flex xs10>
                <v-textarea
                  outline
                  name="input-7-4"
                ></v-textarea>
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
      </v-card-text>
      <v-card-actions class="form__buttons">
        <v-btn
          class="green-button"
          flat>
          Надіслати
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { languages, jobExperience } from '../../constants/filters'

export default {
  name: 'JobDataModel',
  props: ['visible'],
  data() {
    return {
      skillsModel: null,
      experienceModel: null,
      languageArray: languages,
      jobArray: jobExperience,
      validForm: false
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
.job-form .v-text-field--box input, .v-text-field--full-width input, .v-text-f{
  margin-top: 0 !important;
}
.job-form .theme--light.v-chip {
  background-color: #4AD59E;
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
.form-title__container{
  display: flex;
}
.form-title__icon-close {
  transform: translate(330px, 0);
}
.job-form__header {
  transform: translate(60px, 0);
}
</style>
