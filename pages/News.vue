<template>
  <div class="px4x sm:p0x">
    <SharedTitle
      :dataShareTitle="{
        icon:'document',
        title: 'Tin tức mới nhất',
      }"
    />
    <div class="df ma fcsb cg6 md:wmx560 my6x bd2 py4x md:px20x px2x  bdrmax">
      <div v-for="(i,idx) in newsList" :key="idx" class="news__tab fw6 tsmd p2x bdrmax" :class="{bgor3a:selected === idx, cs1a: selected === idx}" @click="filterNews(i.type, idx)">
        {{ i.name }}
      </div>
    </div>
    <div>
      <NewsItem :news="newsData" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'TchNews',
  data () {
    return {
      selected: null,
      newsData: [],
      newsList: [
        {
          name: 'Ưu đãi đặc biệt',
          type: 'promotions'
        },
        {
          name: 'Cập nhật từ Nhà',
          type: 'updatefromhome'
        },
        {
          name: '#CoffeeLover',
          type: 'coffeelover'
        }
      ]
    }
  },
  created () {
    this.filterNews('promotions', 0)
    this.$nuxt.$emit('show-carousel', false)
  },
  methods: {
    async filterNews (news = '', idx = null) {
      this.selected = idx
      const data = await fetch('https://605a1350b11aba001745d80e.mockapi.io/news')
      const dataJson = await data.json()
      let clonedataNews = [...dataJson]
      if (news !== '') {
        clonedataNews = clonedataNews.filter(e => e.type === news)
      }
      this.newsData = clonedataNews
    }
  }
}
</script>
