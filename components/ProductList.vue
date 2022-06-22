<template>
  <div>
    <div class="product__list df sm:fcc fcs ma sm:wmx100p wmx70p ovxa">
      <div v-for="(i,idx) in productList" :key="idx" class="mx-6x w20x" @click="filterDrink(i.type, idx)">
        <div class="tac product__list__item fic" :class="{product__list__act: selected === idx}">
          <img class="product__list__item__img w-100p" :src="i.img" :alt="i.name">
        </div>
        <div class="product__list__name tac cg6">
          <h6>
            {{ i.name }}
          </h6>
        </div>
      </div>
    </div>
    <div class="fcc">
      <ProductItem :productItemCoffee="productItemCoffee" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductList',
  props: ['notShowAll'],
  data () {
    return {
      productItemCoffee: [],
      selected: null,
      productList: [
        {
          img: '/img/productList/ca-phe.png',
          name: 'Cà Phê',
          type: 'coffee'
        },
        {
          img: '/img/productList/tra-trai-cay-tra-sua.png',
          name: 'Trà Trái Cây - Trà Sữa',
          type: 'tea'
        },
        {
          img: '/img/productList/hi-tea.png',
          name: 'Hi Tea - Healthy',
          type: 'hiTea'
        },
        {
          img: '/img/productList/da-xa.png',
          name: 'Đá Xay - ChoCo - Matcha',
          type: 'choco'
        },
        {
          img: '/img/productList/ca-phe-goi-ca-phe-uong-lien.png',
          name: 'Thưởng thức tại nhà',
          type: 'pack'
        },
        {
          img: '/img/productList/banh-snack.png',
          name: 'Bánh - Snack',
          type: 'snack'
        }
      ]
    }
  },
  created () {
    this.filterDrink('coffee', 0)
  },
  methods: {
    async filterDrink (drink = '', idx = null) {
      this.selected = idx
      const dataDrink = await fetch('https://605a1350b11aba001745d80e.mockapi.io/drink')
      const dataDrinkJson = await dataDrink.json()
      let clonedataDrink = [...dataDrinkJson]
      if (drink !== '') {
        clonedataDrink = clonedataDrink.filter(e => e.type === drink)
      }
      if (this.notShowAll) {
        clonedataDrink = clonedataDrink.length > 12 ? clonedataDrink.splice(0, 12) : clonedataDrink
      }
      this.productItemCoffee = clonedataDrink
    }
  }
}
</script>
<style lang="scss">
.product__list__item{
  width: 88px;
  height: 88px;
  padding: 16px;
  flex-shrink: 0;
  overflow: hidden;
  border-radius: 50%;
  background-color: #FFF2DA;
  &__img{
    height: 100%;
    object-fit: contain;
  }
}
.product__list__act{
  background-color: #ffe7ba;
  padding: 12px;
}
</style>
