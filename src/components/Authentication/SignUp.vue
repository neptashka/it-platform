<template>
  <div class="authentication">
    <Form></Form>
  </div>
</template>

<script>
import Form from './Form'

export default {
  name: 'SignUp',
  components: {
    Form
  }
}
</script>

<style>
.authentication {
  background-color: #f8f8f8;
  height: 100%;
  width: 100%;
}
</style>
