<template>
  <v-dialog v-model="show" persistent max-width="850">
    <v-card>
      <v-card-title class="form-title__container pa-1">
        <v-spacer />
        <span class="job-form__header">
          Добавити ІТ-компанію
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
            <v-layout row>
              <v-flex align-self-center mb-4 xs2>
                <div>
                  <v-avatar
                    class="add-company__photo"
                    @click="pickFile"
                    size="100"
                  >
                    <img :src="getImage()" alt="" />
                  </v-avatar>
                </div>
              </v-flex>
              <v-flex xs10>
                <v-layout row>
                  <v-flex align-self-center xs2 mb-4>
                    <label class="job-form__label">
                      Назва компанії
                    </label>
                  </v-flex>
                  <v-flex xs10 my-2 class="job-form__field">
                    <v-text-field
                      v-model="form.name"
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
                </v-layout>
                <v-layout row>
                  <v-flex align-self-center xs2 mb-4>
                    <label class="job-form__label">
                      Веб-сайт
                    </label>
                  </v-flex>
                  <v-flex xs10 my-2 class="job-form__field">
                    <v-text-field
                      v-model="form.website"
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
                </v-layout>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex align-self-center xs2 my-2>
                <label class="job-form__label">
                  Міста
                </label>
              </v-flex>
              <v-flex xs10 mt-2>
                <v-select
                  v-model="form.cities"
                  color="#4AD59E"
                  :rules="jobArrayRule"
                  :items="citiesArray"
                  deletable-chips
                  chips
                  multiple
                  outline
                ></v-select>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex align-self-center xs2 mb-5>
                <label class="job-form__label">
                  Про компанію
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
          @click="addVacancy"
          :disabled="!validForm"
          class="green-button button-round-white"
          flat
          round
        >
          Добавити компанію
        </v-btn>
      </v-card-actions>
      <input
        type="file"
        style="display: none"
        ref="image"
        accept="image/*"
        @change="onFilePicked"
      />
    </v-card>
  </v-dialog>
</template>

<script>
import { cities } from '../../constants/filters'
import { mapGetters, mapActions } from 'vuex'
import loadImageMixin from '../../mixins/loadImage'
import { addItCompany, addHrCompany } from '../../modules/databaseManager/hrManagerQueries'

const noAvatar = 'images/profile/add-photo.svg'

export default {
  name: 'AddItCompany',
  props: ['visible'],
  data() {
    return {
      validForm: false,
      form: {
        name: '',
        website: '',
        description: '',
        cities: '',
        image: null
      },
      citiesArray: cities,
      jobNameRule: [v => !!v || `Це поле є обов'язковим`],
      jobArrayRule: [v => (!!v && v.length > 0) || `Це поле є обов'язковим`]
    }
  },
  mixins: [loadImageMixin],
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
    ...mapGetters([
      'selectedItCompany',
      'itCompanies',
      'hrManager',
      'itCompany',
      'user',
      'hrPersonalInfo'
    ])
  },
  mounted() {
    if (this.itCompany) {
      this.form.name = this.itCompany.name
      this.form.website = this.itCompany.website
      this.form.description = this.itCompany.description
      this.form.cities = this.itCompany.cities
      this.form.image = this.itCompany.image
    }
  },
  methods: {
    ...mapActions(['updateItCompany']),
    async saveProfData() {
      this.show = false
    },
    getImage() {
      return this.form.image || this.loadImage(noAvatar)
    },
    onFilePicked(e) {
      const file = e.target.files[0]
      if (file) {
        const fr = new FileReader()
        fr.readAsDataURL(file)
        fr.addEventListener('load', () => {
          this.form.image = fr.result
          this.$forceUpdate()
        })
      }
    },
    pickFile() {
      this.$refs.image.click()
    },
    addVacancy() {
      addItCompany(this.form)
      this.updateItCompany(this.form)
      const hrObj = {
        ...this.hrPersonalInfo,
        company: this.form,
        email: this.user.email
      }
      addHrCompany(hrObj, this.user.userId)
      this.show = false
      this.$toasted.show(`ІТ-компанія успішно створена`, {
        theme: 'toasted-primary',
        type: 'success',
        position: 'top-center',
        duration: 3000
      })
    }
  }
}
</script>

<style scoped>
.add-company__photo:hover {
  cursor: pointer;
}
</style>
