<template>
  <div>
    <div>
      <div class="df fic fcc">
        <SharedTitle
          :dataShareTitle="{
            icon: 'cooking',
            title: 'Sản phẩm từ nhà'
          }"
        />
      </div>
      <div>
        <ProductList :notShowAll="true" />
        <div class="tac my12x cor3">
          <nuxt-link to="/product">
            Xem tất cả
            <b-icon name="arrow-right" />
          </nuxt-link>
        </div>
      </div>
    </div>
    <div>
      <div class="df fic fcc">
        <SharedTitle
          :dataShareTitle="{
            icon: 'package',
            title: 'Tin Tức'
          }"
        />
      </div>
      <NewsItem :notShowAll="true"/>
      <div class="tac my12x cor3">
        <nuxt-link to="/news">
          Xem tất cả
          <b-icon name="arrow-right" />
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  created () {
    this.$nuxt.$emit('show-carousel', true)
  }
}
</script>

<style lang="scss">
  .carousel-wrapper {
    .VueCarousel-slide {
      text-align: center;
    }
}
</style>
