<template>
  <div />
</template>

<script>

export default {
  layout: 'full',
  data () {
    return {
      show: false
    }
  },
  created () {
    this.show = true
  },
  mounted () {
    if (process.browser && window.location.port === '8083') {
      this.$router.push({ path: '/blog' })
    } else {
      this.$router.push({ path: '/PublishedArticles' })
    }
  }

}
</script>
