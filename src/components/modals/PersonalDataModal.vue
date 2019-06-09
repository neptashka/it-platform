<template>
  <v-dialog v-model="show" persistent max-width="850">
    <v-card>
      <v-card-title class="form-title__container pa-1">
        <v-spacer />
        <span class="job-form__header">
          Персональні дані
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
                  Повне ім'я
                </label>
              </v-flex>
              <v-flex xs10 my-2 class="job-form__field">
                <v-text-field
                  v-model="form.fullName"
                  :rules="jobNameRule"
                  :value="personalData ? personalData.fullName : ''"
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
                  Номер телефону
                </label>
              </v-flex>
              <v-flex xs10 mt-2>
                <v-text-field
                  v-model="form.phone"
                  :rules="jobPhoneRule"
                  :value="personalData ? personalData.phone : ''"
                  required
                  color="#4AD59E"
                  single-line
                  outline
                  height="50"
                  clearable
                >
                </v-text-field>
              </v-flex>
              <v-flex align-self-center xs2 mt-1 mb-4>
                <label class="job-form__label">
                  Електронна пошта
                </label>
              </v-flex>
              <v-flex xs10>
                <v-text-field
                  v-model="form.email"
                  :rules="jobEmailRule"
                  :value="personalData ? personalData.email : ''"
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
                  Скайп
                </label>
              </v-flex>
              <v-flex xs10 mt-2>
                <v-text-field
                  v-model="form.skype"
                  :value="
                    personalData && personalData.skype ? personalData.skype : ''
                  "
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
                  Посилання на резюме
                </label>
              </v-flex>
              <v-flex xs10 mt-2>
                <v-text-field
                  label="Select Image"
                  @click="pickFile"
                  v-model="form.cv"
                  prepend-icon="attach_file"
                ></v-text-field>
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
      <input
        type="file"
        style="display: none"
        ref="image"
        accept=".doc,.docx,.pdf"
        @change="onFilePicked"
      />
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { addPesonalData } from '../../modules/databaseManager/profileQueries'
import { storageRef } from '../../main'

export default {
  name: 'PersonalDataModal',
  props: ['visible'],
  data() {
    return {
      validForm: false,
      form: {
        fullName: '',
        phone: '',
        email: '',
        skype: '',
        cv: ''
      },
      jobTitle: '',
      jobNameRule: [v => !!v || `Це поле є обов'язковим`],
      jobPhoneRule: [
        v =>
          /^(\+\d{1,3}[- ]?)?\d{10}$/.test(v) ||
          'Некоректний телефон',
        v => !!v || `Це поле є обов'язковим`
      ],
      jobEmailRule: [
        v => !!v || `Це поле є обов'язковим`,
        v => /.+@.+/.test(v) || 'Е-мейл має бути коректний'
      ]
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
    ...mapGetters(['user', 'personalData', 'itSpecialist'])
  },
  methods: {
    ...mapActions(['updatePersonalData']),
    saveProfData() {
      const profData = {
        ...this.form,
        image: this.itSpecialist.image
      }
      const id = this.user.userId
      addPesonalData(profData, id)
      this.$toasted.show(`Інформація збережена`, {
        theme: 'toasted-primary',
        type: 'success',
        position: 'top-center',
        duration: 3000
      })
      this.show = false
    },
    pickFile() {
      this.$refs.image.click()
    },
    onFilePicked(e) {
      let selectedFile
      const files = e.target.files
      if (files[0] !== undefined) {
        selectedFile = files[0]
        this.form.cv = selectedFile.name
      }
      const uploadTask = storageRef
        .child(`cv/${this.form.cv}`)
        .put(selectedFile)
      uploadTask.on(
        'state_changed',
        snapshot => {},
        error => {
          // Handle unsuccessful uploads
          console.log(error)
        },
        () => {
          // Do something once upload is complete
          console.log('success')
        }
      )
    }
  }
}
</script>

<style scoped></style>
<style>
.job-form .v-text-field {
  margin-top: 0 !important;
  padding-top: 0 !important;
}
</style>
