<template>
  <div class="app-container bgg2">
    <app-header />
    <div v-if="showCarousel === true" class="md:pb2x md:pt5x md:px20x pt10x pb5x px5x mt10x md:mt20x carousel__background">
      <client-only>
        <div class="carousel-wrapper">
          <carousel v-bind="options">
            <slide v-for="i in dataArr" :key="i" class="img-wrapper">
              <img class="ma w100p" :src="`/img/slide/${i}`">
            </slide>
          </carousel>
        </div>
      </client-only>
    </div>
    <div class="app-body px-2x md:wmx960 lg:wmx1200 xl:wmx1200 ma">
      <Nuxt />
    </div>
    <app-footer />
  </div>
</template>

<script>
export default {
  name: 'LayoutDefault',
  data () {
    return {
      showCarousel: true,
      options: {
        loop: true,
        perPage: 1,
        paginationEnabled: true,
        autoplay: true,
        autoplayTimeout: 2000
      },
      dataArr: [
        '1653320203_banner-web.jpeg',
        '1653325967_web-cu.jpeg',
        '1654013040_banner-web.jpeg',
        '1654013221_banner-web-3.jpeg',
        '1654013393_banner-web.jpeg',
        '1654448385_banner-web.jpeg'
      ]
    }
  },
  created () {
    this.$nuxt.$on('show-carousel', ($event) => {
      this.showCarousel = $event
      return $event
    })
  }
}
</script>
<style lang="scss">
  html,body {
    font-family: -apple-system, BlinkMacSystemFont, Roboto, "Segoe UI", "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  }
  .page-container{
    margin: auto;
    padding: 0 24px !important;
  }
  .carousel-wrapper {
    .VueCarousel-slide {
      text-align: center;
    }
  }
  .VueCarousel-pagination {
    margin-top: -20px
  }
  .VueCarousel-dot {
    background-color: rgba(239,239,239,0.4) !important;
    border-radius: 0 !important;
    width: 35px !important;
    height: 3px !important;
    padding: 2px !important;
    margin-top: 10px !important;
  }
  .VueCarousel-dot--active {
    background-color: white !important;
  }
  .VueCarousel-dot[data-v-438fd353]:focus {
    outline: none !important;
  }
  .carousel__background {
    background-image: radial-gradient(100% 501.4% at 100% 100%,#ffb141 0%,#fb8d17 100%) !important;
  }
</style>
