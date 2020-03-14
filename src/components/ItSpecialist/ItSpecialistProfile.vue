<template>
  <div v-if="user" class="dev-profile">
    <div class="dev-profile__container">
      <div class="dev-profile__header">
        <p class="dev-profile__header--text">
          Профіль ІТ-спеціаліста
        </p>
      </div>
      <v-alert
        v-if="!personalData"
        class="alert"
        v-model="personalDataAlert"
        dismissible
        outline
        type="warning"
      >
        Ви не заповнили контактні дані. Для цього натисніть кнопку "Контактні
        дані" та заповніть всі поля.
      </v-alert>
      <v-alert
        v-if="!jobData"
        class="alert"
        v-model="jobDataAlert"
        dismissible
        outline
        type="warning"
      >
        Ви не заповнили професійні дані. Для цього натисніть кнопку "Профейсійні
        дані" та заповніть всі поля.
      </v-alert>
      <v-alert
        v-if="isInfoAlert()"
        class="alert"
        :value="true"
        outline
        type="info"
      >
        Ви заповнили всі дані, але ще не надіслали заявку. Натисніть "Надіслати
        дані"
      </v-alert>
      <div v-if="requestSent">
        <EmployeeAnnouncement></EmployeeAnnouncement>
      </div>
      <div v-if="hrManagerRequest" class="vacancies__contacts">
        <v-card class="form" color="#fff">
          <v-container>
            <div class="horizontal-container">
              <div class="form__avatar">
                <v-avatar size="60">
                  <img :src="hrManagerRequest.hrManager.image" alt="" />
                </v-avatar>
                <span class="form--text bold">
                  {{ hrManagerRequest.hrManager.fullName }}
                </span>
              </div>
              <div class="form__text-content">
                <div class="form__title">
                  <span class="form--text form--header bold">
                    {{ hrManagerRequest.vacancy.title }}
                  </span>
                </div>
                <p class="form--text form__requirmentes">
                  {{ hrManagerRequest.vacancy.requirements }}
                </p>
              </div>
            </div>
            <div class="text-horizontal form--text">
              <p>
                <span class="bold">Досвід роботи:</span>
                {{ hrManagerRequest.vacancy.experience }}
              </p>
            </div>
            <div class="text-horizontal form--text">
              <p>
                <span class="bold">Рівень англійської:</span>
                {{ hrManagerRequest.vacancy.English }}
              </p>
            </div>
            <div class="text-horizontal form--text">
              <p>
                <span class="bold">ІТ-компанія:</span>
                {{ hrManagerRequest.vacancy.company.name }}
              </p>
            </div>
            <div class="form__footer">
              <v-btn @click="sendAnswer" flat icon color="green">
                <v-icon>done</v-icon>
              </v-btn>
              <v-btn flat icon color="red">
                <v-icon>delete</v-icon>
              </v-btn>
            </div>
          </v-container>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import EmployeeAnnouncement from '../Empoyee/EmployeeAnnouncement'
import { db } from '../../main'
import { sendContacts } from '../../modules/databaseManager/contactsQueries'

export default {
  name: 'ItSpecialistProfile',
  data() {
    return {
      personalDataAlert: !this.personalData,
      jobDataAlert: !this.jobData,
      hrManagerRequest: null
    }
  },
  components: {
    EmployeeAnnouncement
  },
  computed: {
    ...mapGetters(['jobData', 'personalData', 'requestSent', 'user', 'profile'])
  },
  methods: {
    isInfoAlert() {
      return this.profile === 100 && !this.requestSent
    },
    async getHrRequest() {
      const requestsSnapgots = await db
        .collection('hr-request')
        .where('itSpecialistId', '==', this.user.userId)
        .get()
      let hrs = []
      for (let doc of requestsSnapgots.docs) {
        hrs.push(doc.data())
      }
      this.hrManagerRequest = hrs[0]
      console.log('request', this.hrManagerRequest)
    },
    sendAnswer() {
      const { itSpecialistId } = this.hrManagerRequest
      const vacancyId = this.hrManagerRequest.vacancy.id
      const hrId = this.hrManagerRequest.hrManager.id
      sendContacts({ hrId, itSpecialistId, vacancyId })
      this.$toasted.show('Дані успішно надіслані', {
        theme: 'toasted-primary',
        type: 'success',
        position: 'top-center',
        duration: 3000
      })
    }
  },
  mounted() {
    this.getHrRequest()
  }
}
</script>

<style>
.dev-profile {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
}
.dev-profile__header {
  width: 100%;
  display: flex;
  justify-content: center;
}
.dev-profile__header--text {
  font-size: 18px;
  color: #000;
  font-weight: bold;
}
.dev-profile__container {
  width: 80%;
  margin-top: 20px;
}
.alert {
  margin-top: 10px;
}
</style>

<style scoped>
.bold {
  font-weight: bold;
}

.form__requirmentes {
  margin-top: 10px;
}
.form__title {
  max-height: 19px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.text-horizontal {
  margin-left: 120px;
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
  margin-top: 10px;
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
  justify-content: flex-end;
}
.form--header {
  font-size: 16px;
}
</style>
