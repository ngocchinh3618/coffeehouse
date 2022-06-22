<template>
  <div>
    <b-card class="p4x">
      <h1 class="py4x">{{newsDetailData.name}}</h1>
      <p class="lh175p" v-html="newsDetailData.decriptions"></p>
      <div class="wmx800 hmx800 mt4x">
        <img :src="newsDetailData.src" :alt="newsDetailData.name">
      </div>
      <p class="lh175p" v-html="newsDetailData.detail"></p>
    </b-card>
  </div>
</template>

<script>
export default {
  name: 'NewsDetail',
  data () {
    return {
      newsDetailData: {}
    }
  },
  async fetch () {
    const data = await fetch(`https://605a1350b11aba001745d80e.mockapi.io/news?id=${this.$route.params.id}`)
    const dataJson = await data.json()
    this.newsDetailData = dataJson[0]
    console.log(this.newsDetailData)
  }
  // methods: {
  // }
}
</script>

<style>

</style>
