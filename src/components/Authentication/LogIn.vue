<template>
  <div class="login">
    <Form class="login__form" formType="logIn"></Form>
  </div>
</template>

<script>
import Form from './Form'

export default {
  name: 'LogIn',
  components: {
    Form
  }
}
</script>

<style scoped>
.login__form {
  width: 40%;
  max-width: 510px;
}
</style>
