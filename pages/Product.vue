<template>
  <div>
    <div class="df fic fcc">
      <SharedTitle
        :dataShareTitle="{
          icon: 'cooking',
          title: 'Sản phẩm từ nhà'
        }"
      />
      <b-button-icon name="search" large @click.prevent="modalDrink = true" />
    </div>
    <ProductList />
    <b-modal
      medium
      scrollable
      container-class="hmn200 wmx1100"
      :visible.sync="modalDrink"
      close-on-click-modal
      close-on-press-escape
    >
      <div slot="title" class="row row-xs content-center">
        <div class="col-auto tac">
          <b>Tim kiem</b>
        </div>
      </div>
      <div>
        <b-input v-model="inputNote" class="mt4x" placeholder="Tim theo ten san pham ban quan tam" @input="showDrink">
          <template #prefix>
            <b-icon name="search" />
          </template>
        </b-input>
      </div>
      <div class="my2x df fw">
        <div v-for="(i,idx) in drinkList" :key="idx" class="c5 product__items__card bdrmd ma por df p4x md:db sm:p2x md:p3x lg:p2x lg:h240 mt2x">
          <img class="product__items__card__img bdrmd fg1 ma wmx100 hmx100 w30p sm:w100p md:wmx200 md:hmx200 md:w100p lg:wmx120 csp" :src="i.src" :alt="i.name" @click="$router.push(`/product/${i.id}`)">
          <div class="pl-4x db w70p sm:w100p md:w100p md:pl0x csp">
            <div class="hmn17x md:hmn15x lg:hmn0x md:my3x lg:my4x">
              <h4 class="product__items__title lg:hmn10x xl:hmn9x" @click="$router.push(`/product/${i.id}`)">
                {{ i.name }}
              </h4>
            </div>
            <div class="df fic fcsb">
              <p>
                {{ i.price }}đ
              </p>
              <div>
                <b-button-icon class="bgor3a cs1a" rounded name="control-plus" @click="showModal(i)" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </b-modal>
    <b-modal
      medium
      scrollable
      container-class="h300 w400"
      :visible.sync="modalVisible1"
      close-on-click-modal
      close-on-press-escape
    >
      <div slot="title" class="row row-xs content-center">
        <div class="col-auto tac">
          <b>Thêm món mới</b>
        </div>
      </div>
      <div class="df fnw">
        <div class="c5">
          <img :src="drink.src" :alt="drink.src" class="modalImage">
        </div>
        <div class="c7">
          <h2>
            {{ drink.name }}
          </h2>
          <p>
            {{ drink.discription }}
          </p>
          <div class="df fcsb fic mt4x">
            <p>
              {{ drink.price }}đ
            </p>
            <div class="df fic">
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
              <b-button-icon class="cs1a bgor3a" rounded name="control-plus" @click="changeQty('+')" />
            </div>
          </div>
        </div>
      </div>
      <b-input v-model="inputNote2" class="mt4x" placeholder="Thêm ghi chú cho món này">
        <template #prefix>
          <b-icon name="package" class="csa" />
        </template>
      </b-input>
      <div class="poduct__card__option mt4x bd1 bdrtsm">
        <div class="poduct__card__title bgg4a p2x bdrtsm">
          <span class="fssm fw6 cg6a">CHỌN SIZE (BẮT BUỘC)</span>
        </div>
        <div class="poduct__card__size df fcsb">
          <b-checkbox-group v-model="checkgroup" :min="1" :max="1">
            <div v-for="(i,idx) in dataSize" :key="idx" class="product__card__size__item df fic p1x">
              <div class="mr3x">
                <b-checkbox :checked="i.price === 0 ? true : false" fill :label="`${i.size} +${i.price}đ`" @change="onSelectSize($event,i)" />
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
      <b-button class="bgor3a w100p cwa mt2x" dangerrounded @click="handleBuy">
        {{ sumPrice }}đ - Thêm vào giỏ hàng
      </b-button>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'TchProduct',
  data () {
    return {
      modalDrink: false,
      drinkList: [],
      inputNote: '',
      modalVisible1: false,
      quantity: 1,
      quantityTopping: 0,
      checkgroup: [],
      inputNote2: '',
      drink: {},
      selectedDrink: {},
      selected: 0,
      dataSize: [
        {
          size: 'Vừa',
          price: 0
        }
      ],
      timer: null
    }
  },
  computed: {
    sumPrice () {
      return (this.drink.price * this.quantity) + (this.quantityTopping * 10000) + (this.selected)
    }
  },
  created () {
    this.$nuxt.$emit('show-carousel', false)
  },
  methods: {
    showDrink (e) {
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(async () => {
        if (e === '') {
          this.drinkList = []
        } else {
          const data = await fetch('https://605a1350b11aba001745d80e.mockapi.io/drink')
          const dataJson = await data.json()
          let cloneData = [...dataJson]
          cloneData = cloneData.filter(drink => this.xoa_dau(drink.name).toLowerCase().includes(this.xoa_dau(e).toLowerCase()))
          this.drinkList = cloneData
        }
      }, 500)
    },
    xoa_dau (str) {
      str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
      str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
      str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i')
      str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
      str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
      str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
      str = str.replace(/đ/g, 'd')
      str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A')
      str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E')
      str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I')
      str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O')
      str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U')
      str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y')
      str = str.replace(/Đ/g, 'D')
      return str
    },
    showModal (item) {
      this.drink = item
      this.modalVisible1 = true
      this.modalDrink = false
      this.inputNote = ''
      this.selectedDrink = item
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
        name: 'Kem Phô Mai Macchiato',
        price: this.quantityTopping * 10000
      }
      this.selectedDrink.note = this.inputNote
      this.$store.dispatch('cart/addCart', this.selectedDrink)
      this.modalVisible1 = false
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
@media (min-width: 1366px) {
  .product__items__card {
    min-height: 260px;
  }
  .product__items__card__img{
    max-width: 150px;
  }
}
  .product__items__card{
    box-shadow: 0px 10px 20px rgba(0,0,0,0.1);
    // width: calc(80% - 20px);
  }
  .product__items__title{
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .modalImage{
    border-radius: 10%;
  }
  .verticalPanel{
    background-color: rgba(236,236,236,0.5);
    padding:10px;
  }
</style>
