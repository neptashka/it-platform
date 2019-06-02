const loadImageMixin = {
  methods: {
    loadImage(path) {
      const requireImageAsset = require.context('@', true, /\.png|svg$/)
      if (path) {
        return requireImageAsset(`./${path}`)
      }
    }
  }
}

export default loadImageMixin
