<template>
  <div
    class="authentication">
    <div class="authentication__buttons">
      <v-btn
        :disabled="!userIsHr"
        @click="chooseDevType()">
        ІТ-спеціаліст
      </v-btn>
      <v-btn
        :disabled="userIsHr"
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

export default {
  name: 'SignUp',
  components: {
    Form
  },
  data() {
    return {
      userType: 'IT-specialist'
    }
  },
  computed: {
    userIsHr() {
      return this.userType === 'HR-manager'
    }
  },
  methods: {
    chooseDevType() {
      this.userType = 'IT-specialist'
    },
    chooseHrType() {
      this.userType = 'HR-manager'
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
  display: flex;
  flex-direction: row;
}
</style>
