<template>
  <v-carousel
    hide-delimiters>
    <v-carousel-item
      v-for="(item, i) in items"
      :active-class="item.class"
      :key="i"
      reverse-transition="fade"
      transition="fade"
    >
      <Header :header-color="item.color"></Header>
      <v-sheet
        class="slider"
        :color="item.color">
        <h1
            class="slider__title">
          {{ item.title }}
        </h1>
        <a @click="$router.push(`/${item.link}`)">
          <img
              class="slider__image"
              :src="loadImage(item.path)"
              alt="IT-specialist image"/>
        </a>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
import Header from '../Fixed/Header'

export default {
  name: 'slider',
  data() {
    return {
      items: [
        {
          title: 'Find vacancies for IT specialists',
          path: 'images/slider/vacancies.svg',
          link: 'login',
          color: 'rgb(36, 55, 87)'
        },
        {
          title: `Find IT specialists, if you're a HR-manager`,
          path: 'images/slider/specialists.svg',
          link: 'register',
          color: 'rgb(25, 155, 251)'
        },
        {
          title: `Check out all companies and their vacancies`,
          path: 'images/slider/it-companies.svg',
          link: '',
          color: 'rgb(254, 96, 93)'
        }
      ]
    }
  },
  components: {
    Header
  },
  methods: {
    loadImage(path) {
      const requireImageAsset = require.context('@', true, /\.png|svg$/)
      if (path) {
        return requireImageAsset(`./${path}`)
      }
    }
  }
}
</script>

<style scoped>
.slider {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}
.slider__title {
  font-size: 24px;
  color: #fff;
}
.slider__image {
  height: 400px;
}
</style>
