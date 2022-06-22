<template>
  <div class="content">
    <div class="product__detail df mt10x wmn880 fcc p4x">
      <div class="left-cols wmx400">
        <img class="bdrlg" :src="drink.src" :alt="drink.src">
        <p class="mt4x">
          {{ drink.discription }}
        </p>
      </div>
      <div class="right-cols wmn480 pl15x">
        <div class="product__card">
          <div class="product__card__info">
            <h1 class="product__card__name">
              {{ drink.name }}
            </h1>
            <div class="df fcsb mt4x">
              <span class="product__card__price">
                {{ drink.price }}đ
              </span>
              <div class="product__card__quantity">
                <div class="product__card__decrease">
                  <b-button-icon
                    class="cs1a"
                    :class="{bgg4a: quantity <= 1,bgor3a: quantity > 1}"
                    rounded
                    :disabled="quantity <= 1"
                    name="control-minus"
                    @click="changeQty('-')"
                  />
                  <span class="mx3x">
                    {{ quantity }}
                  </span>
                  <b-button-icon
                    class="cs1a bgor3a"
                    rounded
                    name="control-plus"
                    @click="changeQty('+')"
                  />
                </div>
              </div>
            </div>
            <div class="poduct__card__note mt5x">
              <b-input v-model="inputNote" placeholder="Thêm ghi chú cho món này">
                <template #prefix>
                  <b-icon name="package" class="csa" />
                </template>
              </b-input>
            </div>
            <div class="poduct__card__option mt4x bd1 bdrtsm">
              <div class="poduct__card__title bgg4a p2x bdrtsm">
                <span class="fssm fw6 cg6a">CHỌN SIZE (BẮT BUỘC)</span>
              </div>
              <div class="poduct__card__size df fcsb">
                <b-checkbox-group v-model="checkgroup" :max="1">
                  <div v-for="(i,idx) in dataSize" :key="idx" class="product__card__size__item df fic p1x">
                    <div class="mr3x">
                      <b-checkbox :checked="i.price === 0 ? true : false" fill :label="i.size" @change="onSelectSize($event,i)" />
                    </div>
                    <div>
                      <p>
                        {{ i.size }}
                      </p>
                      <p>
                        +{{ i.price }}đ
                      </p>
                    </div>
                  </div>
                </b-checkbox-group>
              </div>
              <div class="poduct__card__topping">
                <div class="poduct__card__title bgg4a p2x bdrtsm">
                  <span class="fssm fw6 cg6a">CHỌN TOPPING (TÙY CHỌN)</span>
                </div>
                <div class="poduct__card__topping__item df fcsb py4x mx4x bdb1">
                  <div>
                    <p>Kem Phô Mai Macchiato</p>
                    <p>+ 10.000đ</p>
                  </div>
                  <div class="product__card__decrease">
                    <b-button-icon class="cs1a" :class="{vih: quantityTopping <= 0}" rounded name="control-minus" @click="changeQtyTopping('-')" />
                    <span class="mx3x">
                      {{ quantityTopping }}
                    </span>
                    <b-button-icon class="cs1a" rounded name="control-plus" @click="changeQtyTopping('+')" />
                  </div>
                </div>
              </div>
            </div>
            <div class="df fcc mt2x">
              <b-button class="bgor3a w100p cwa" rounded @click="handleBuy">
                {{ sumPrice }}đ - Thêm vào giỏ hàng
              </b-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      inputNote: '',
      drink: {},
      quantity: 1,
      quantityTopping: 0,
      selected: 0,
      checkgroup: [],
      selectedDrink: {},
      dataSize: [
        {
          size: 'Vừa',
          price: 0
        }
      ]
    }
  },
  computed: {
    sumPrice () {
      return (this.drink.price * this.quantity) + (this.quantityTopping * 10000) + (this.selected)
    }
  },
  created () {
    this.getDrinksById()
    this.$nuxt.$emit('show-carousel', false)
  },
  methods: {
    async getDrinksById () {
      const data = await fetch(`https://605a1350b11aba001745d80e.mockapi.io/drink?id=${this.$route.params.id}`)
      const dataJson = await data.json()
      this.drink = dataJson[0]
      this.selectedDrink = dataJson[0]
      this.selectedDrink.size = {
        drinkSize: 'Vừa',
        priceSize: 0
      }
    },
    changeQty (sign) {
      if (sign === '-') {
        this.quantity -= 1
      }
      if (sign === '+') {
        this.quantity += 1
      }
    },
    changeQtyTopping (sign) {
      if (sign === '-') {
        this.quantityTopping -= 1
        if (this.quantityTopping < 0) {
          this.quantityTopping = 0
        }
      }
      if (sign === '+') {
        this.quantityTopping += 1
      }
    },
    onSelectSize (event, value) {
      if (event === true) {
        this.selected += value.price
      } else {
        this.selected -= value.price
        if (this.selected <= 0) {
          this.selected = 0
        }
      }
      this.selectedDrink.size = {
        drinkSize: value.size,
        priceSize: value.price
      }
    },
    handleBuy () {
      this.selectedDrink.total = this.sumPrice
      this.selectedDrink.quantity = this.quantity
      this.selectedDrink.quantityTopping = {
        qty: this.quantityTopping,
        price: this.quantityTopping * 10000
      }
      this.selectedDrink.note = this.inputNote
      this.$store.dispatch('cart/addCart', this.selectedDrink)
      this.$notify({
        title: 'Thành công',
        message: 'Sản phẩm đã được thay đổi thành công',
        type: 'success',
        offset: 120
      })
    }
  }
}
</script>
<style lang="scss">
  .product__detail{
    box-shadow: 0px 10px 20px rgb(0 0 0 / 10%)
  }
</style>
