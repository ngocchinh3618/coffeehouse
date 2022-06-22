<template>
  <div class="news__item df fw">
    <div v-for="(i,idx) in news" :key="idx" class=" c12 lg:c3 sm:c6">
      <div class="news__item__card bdrmd my-4x">
        <div class="h-200 sm:h-160 lg:h160">
        <img class="bdrtmd ofcv h100p w100p" :src="i.src" :alt="i.name">
      </div>
      <div class="p3x">
        <h3 class="news__item__title h12x">
          {{ i.name }}
        </h3>
        <div class="df fce">
          <b-button class="bgor3a cs1a mt1x" small rounded @click="$router.push(`/news/${i.id}`)">
            <span class="py1x px2x">ĐỌC TIẾP</span>
          </b-button>
        </div>
      </div>
      </div>
    </div>
    <div v-for="(i,idx) in news2" :key="idx" class=" c12 lg:c3 sm:c6">
      <div class="news__item__card bdrmd my-4x">
        <div class="h-200 sm:h-160 lg:h160">
        <img class="bdrtmd ofcv h100p w100p" :src="i.src" :alt="i.name">
      </div>
      <div class="p3x">
        <h3 class="news__item__title h12x">
          {{ i.name }}
        </h3>
        <div class="df fce">
          <b-button class="bgor3a cs1a mt1x" small rounded @click="$router.push(`/news/${i.id}`)">
            <span class="py1x px2x">ĐỌC TIẾP</span>
          </b-button>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NewsItem',
  data () {
    return {
      news2: []
    }
  },
  props: ['notShowAll', 'news'],
  async fetch () {
    const data = await fetch('https://605a1350b11aba001745d80e.mockapi.io/news')
    const dataJson = await data.json()
    let clonedataNews = [...dataJson]
    clonedataNews = clonedataNews.length > 8 ? clonedataNews.splice(0, 8) : clonedataNews
    if (this.notShowAll) {
      this.news2 = clonedataNews
    }
  }
}
</script>

<style lang="scss">
.news__item__card{
  box-shadow: 0px 10px 20px rgba(0,0,0,0.1);
};
.news__item__title{
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
