<template>
  <div class="login__container">
    <p class="login__header">Вхід в систему</p>
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
.login__container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.login__form {
  width: 40%;
  max-width: 510px;
  margin-top: 10px;
}
.login__header {
  text-align: center;
  font-size: 20px;
  color: #000;
}
</style>
