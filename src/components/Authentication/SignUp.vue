<template>
  <div
    class="authentication">
    <div class="authentication__buttons">
      <v-btn
        :class="{
          'green-button': !userIsHr,
          'button-round-white': !userIsHr,
          usual: userIsHr
        }"
        @click="chooseDevType()">
        ІТ-спеціаліст
      </v-btn>
      <h1>/</h1>
      <v-btn
        :class="{
          'green-button': userIsHr,
          'button-round-white': userIsHr,
          usual: !userIsHr
        }"
        @click="chooseHrType()">
        HR-менеджер
      </v-btn>
    </div>
    <v-layout
      v-if="!userIsHr"
      row>
      <div class="authentication__container">
        <img
          class="authentication__image"
          src="../../images/sign-up/developer.svg"
          alt="Developer"
        />
      </div>
      <div class="authentication__container authentication--left">
        <Form formType="signUp" :userType="userType"></Form>
      </div>
    </v-layout>
    <v-layout
        v-if="userIsHr"
        row>
      <div class="authentication__container authentication--left">
        <Form formType="signUp" :userType="userType"></Form>
      </div>
      <div class="authentication__container">
        <img
          class="authentication__image"
          src="../../images/sign-up/hr-manager.svg"
          alt="Developer"
        />
      </div>
    </v-layout>
  </div>
</template>

<script>
import Form from './Form'
import { IT_SPECIALIST, HR_MANAGER } from '../../constants/userTypes'

export default {
  name: 'SignUp',
  components: {
    Form
  },
  data() {
    return {
      userType: IT_SPECIALIST
    }
  },
  computed: {
    userIsHr() {
      return this.userType === HR_MANAGER
    }
  },
  methods: {
    chooseDevType() {
      this.userType = IT_SPECIALIST
    },
    chooseHrType() {
      this.userType = HR_MANAGER
    }
  }
}
</script>

<style>
.authentication {
  background-color: #f8f8f8;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}
.authentication__image {
  width: 100%;
  height: 100%;
}
.authentication__container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.authentication--left {
  justify-content: flex-start;
}
.authentication__buttons {
  margin-top: 100px;
  display: flex;
  flex-direction: row;
}
.usual.v-btn:not(.v-btn--depressed):not(.v-btn--flat) {
  box-shadow: none;
}
</style>
