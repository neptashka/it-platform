<template>
  <div class="main-container">
    <div class="scroll-container">
      <div class="slider">
        <slider> </slider>
      </div>
      <PopularVacancies> </PopularVacancies>
    </div>
    </div>
</template>

<script>
import Slider from '../components/Main/Slider'
import PopularVacancies from '../components/Main/PopularVacancies'

export default {
  components: {
    Slider,
    PopularVacancies
  }
}
</script>

<style>
.main-container {
  height: 100%;
  width: 100%;
  overflow: hidden;
  position: relative;
}
.slider {
  height: 500px;
  width: 100%;
}
.scroll-container {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: -17px; /* Increase/Decrease this value for cross-browser compatibility */
  overflow-y: scroll;
}
</style>
