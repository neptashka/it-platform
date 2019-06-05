<template>
  <v-card v-if="request" class="form" :color="color">
    <div class="form__text-content">
      <div class="form__title">
        <span class="form--text form--header">
          {{ request.title }}
        </span>
      </div>
      <p class="form--text form__requirmentes">
        {{ request.description }}
      </p>
    </div>
    <div class="form__chips">
      <v-chip class="active-chip" v-for="chip in request.languages">
        {{ chip }}
      </v-chip>
    </div>
    <div class="form__footer">
      <div class="form__location">
        <v-icon class="location__icon" color="#fff">
          location_on
        </v-icon>
        <span class="location__text form--text">
          {{ request.city }}
        </span>
      </div>
      <div class="form__button-container">
        <v-btn
          v-if="shouldDelete"
          dark
          small
          flat
          color="#000"
          class="form__view-button">
          Видалити
        </v-btn>
        <v-btn
          v-else
          dark
          small
          flat
          color="#000"
          class="form__view-button">
          Обрати
        </v-btn>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  name: 'AnnouncementForm',
  props: {
    request: {
      city: String,
      description: String,
      experience: String,
      itSpecialistId: String,
      languages: Array,
      title: String
    },
    shouldDelete: Boolean,
    color: String
  }
}
</script>

<style scoped>
.form {
  width: 100%;
  height: 100%;
  padding: 10px 20px 10px 20px;
  display: flex;
  flex-direction: column;
}
.form--text {
  color: #fff;
}
.form__text-content {
  margin-left: 10px;
  height: 100%;
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
.form__chips {
  width: 100%;
}
.active-chip {
  background-image: linear-gradient(to top right, #54e38e, #41c7af);
}
</style>
