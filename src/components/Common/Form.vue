<template>
  <v-card class="form" :color="color">
    <div class="horizontal-container">
      <div class="form__avatar">
        <v-avatar size="50">
          <img :src="vacancy.company.image" alt="" />
        </v-avatar>
        <span class="form--text form--small-text">
          {{ vacancy.company.companyName }}
        </span>
      </div>
      <div class="form__text-content">
        <div class="form__title">
          <span class="form--text form--header">
            {{ vacancy.content.title }}
          </span>
        </div>
        <p class="form--text form__requirmentes">
          {{ vacancy.content.requirments }}
        </p>
      </div>
    </div>
    <div class="form__footer">
      <div class="form__location">
        <v-icon class="location__icon" color="#fff">
          location_on
        </v-icon>
        <span class="location__text form--text">
          {{ vacancy.content.city }}
        </span>
      </div>
      <div class="form__button-container">
        <v-icon v-if="isItSpecialist()" color="#fff" class="visible-icon">
          done
        </v-icon>
        <v-btn
          dark
          small
          flat
          @click="sendContacts"
          v-if="isItSpecialist()"
          color="#000"
          class="form__view-button"
        >
          Обрати
        </v-btn>
      </div>
    </div>
  </v-card>
</template>

<script>
import { IT_SPECIALIST } from '../../constants/userTypes'
import { mapGetters } from 'vuex'

export default {
  name: 'Form',
  props: {
    color: String,
    vacancy: {
      company: Object,
      content: Object,
      hrManager: Object,
      id: String
    }
  },
  computed: {
    ...mapGetters(['user', 'profile'])
  },
  methods: {
    isItSpecialist() {
      return this.user.type === IT_SPECIALIST
    },
    sendContacts() {
      if(this.profile !== 100) {
        this.$toasted.show('Профіль не заповнений на 100%!', {
          theme: 'toasted-primary',
          type: 'warning',
          position: 'top-center',
          duration: 3000
        })
      }
    }
  }
}
</script>

<style scoped>
.form {
  width: 100%;
  height: 100%;
  padding: 10px 0 5px 0;
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
  height: 70%;
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
</style>

<style>
.form__button-container .v-btn {
  background-color: #fff;
  margin: 0 10px;
}
@media only screen and (max-width: 600px) {
  .form__avatar img,
  .form__avatar span {
    display: none;
  }
  .form__avatar {
    min-width: 0 !important;
  }
  .visible-icon {
    visibility: visible !important;
  }
  .form__view-button {
    display: none;
  }
}
</style>
