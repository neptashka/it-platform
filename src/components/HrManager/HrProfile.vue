<template>
  <div class="dev-profile">
    <div class="dev-profile__container">
      <div class="dev-profile__header">
        <p class="dev-profile__header--text">
          Профіль HR-менеджера
        </p>
      </div>
      <v-alert
        class="alert"
        v-model="itCompanyAlert"
        dismissible
        outline
        type="warning"
      >
        Ви не заповнили інформацію про ІТ-компанію. Для цього або виберіть
        ІТ-компанію із списку існуючих, або створіть нову.
      </v-alert>
      <v-alert
        class="alert"
        v-model="vacancyAlert"
        dismissible
        outline
        type="warning"
      >
        Ви ще не створили жодної вакансії!
      </v-alert>
      <v-card v-if="sentVacancy" class="form" color="#7AE8C1">
        <div class="horizontal-container">
          <div class="form__avatar">
            <v-avatar size="50">
              <img :src="sentVacancy.company.image" alt="" />
            </v-avatar>
            <span class="form--text form--small-text">
              {{ sentVacancy.company.name }}
            </span>
          </div>
          <div class="form__text-content">
            <div class="form__title">
              <span class="form--text form--header">
                {{ sentVacancy.title }}
              </span>
            </div>
            <p class="form--text form__requirmentes">
              {{ sentVacancy.requirements }}
            </p>
          </div>
        </div>
        <div class="form__footer">
          <div class="form__location">
            <v-icon class="location__icon" color="#fff">
              location_on
            </v-icon>
            <span class="location__text form--text">
              {{ sentVacancy.city }}
            </span>
          </div>
          <div class="form__button-container">
            <v-btn
              dark
              small
              flat
              color="#000"
              class="form__view-button"
            >
              Видалити
            </v-btn>
          </div>
        </div>
      </v-card>
      <div v-if="hrContact">
        <p class="contact__header">Надіслані контакти</p>
        <v-card class="form" color="#fff">
          <div class="horizontal-container">
            <div class="form__avatar">
              <v-avatar size="50">
                <img :src="hrContact.image" alt="" />
              </v-avatar>
              <span class="form--text form--small-text bold">
                {{ hrContact.fullName }}
              </span>
            </div>
            <div class="form__text-content">
              <div class="form__title">
                <span class="form--text form--header">
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
              <span class="bold">Номер телефону:</span> {{ hrContact.phone }}
            </p>
          </div>
          <div class="text-horizontal form--text">
            <p>
              <span class="bold"> Резюме:</span
              ><a :href="getCvUrl()">{{ hrContact.cv }}</a>
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
          </div>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { storageService } from '../../main'

export default {
  name: 'HrProfile',
  data() {
    return {
      itCompanyAlert: !this.selectedItCompany,
      vacancyAlert: !this.sentVacancy
    }
  },
  computed: {
    ...mapGetters([
      'hrContact',
      'selectedItCompany',
      'hrProgress',
      'sentVacancy'
    ])
  },
  methods: {
    async getCvUrl() {
      const pathReference = storageService.ref(`cv/${this.hrContact.cv}`)
      const cvUrl = await pathReference.getDownloadURL().then(function(url) {
        return url
      })
      return cvUrl
    },
    isInfoAlert() {
      return this.hrProgress === 60 && !this.sentVacancy
    },
    calculateProgress() {
      let progress = 20
      if (this.selectedItCompany) progress += 40
      if (this.sentVacancy) progress += 40
      this.updateHrProgress(progress)
    },
    ...mapActions(['updateHrProgress'])
  },
  watch: {
    selectedItCompany(value) {
      this.itCompanyAlert = !value
      this.calculateProgress()
    },
    sentVacancy(value) {
      this.vacancyAlert = !value
      this.calculateProgress()
    }
  },
  mounted() {
    this.itCompanyAlert = !this.selectedItCompany
    this.vacancyAlert = !this.sentVacancy
  }
}
</script>

<style scoped>
.bold {
  font-weight: 700;
}
.form {
  width: 100%;
  padding: 10px 0 5px 0;
}
.text-horizontal {
  margin-left: 113px;
  font-size: 14px;
}
.form--text {
  color: #000;
}
.form__avatar {
  min-width: 100px;
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
.contact__header {
  text-align: center;
  margin-bottom: 10px;
  font-size: 20px;
}
</style>
