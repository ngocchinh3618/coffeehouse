<template>
  <div class="store__main__wrap">
    <ul class="store__main__list df fw fcsb">
      <li v-for="(i,idx) in dataStoreItem" :key="idx" class="store__main__item df my4x py2x px6x md:mr-2x">
        <div class="wmn100 hmn100">
          <img class="bdrsm w100 h100" :src="i.img" :alt="i.trademark">
        </div>
        <div class="store__info ml-3x">
          <p class="fw7 cg6a fsxs lh175p">
            {{ i.trademark }}
          </p>
          <p class="lh175ps">
            {{ i.address }}
          </p>
          <p class="cg5a lh175p">
            {{ i.distance }}
          </p>
          <div class="store__link lh175p cor3a">
            <span class="store__link__map mr8x">
              {{ i.map }}
            </span>
            <span>
              {{ i.detail }}
            </span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'StoreItem',
  props: {
    dataStoreItem: {
      type: Array,
      default: () => []
    }
  }
}
</script>
<style lang="scss">
@media (min-width: 992px) {
  .store__main__item{
    width: calc(50% - 20px) !important;
  }
}
.store__main__item{
  box-shadow: 0 10px 20px rgba(0,0,0,.1);
    width: 100%;
}
.store__link__map::after{
  content: "";
    position: absolute;
    height: 15px;
    width: 0.6px;
    background: #fa8c16;
    transform: translate(14px,36%);
}
</style>
