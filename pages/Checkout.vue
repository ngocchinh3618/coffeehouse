<template>
  <div class="mt5x">
    <SharedTitle
      :dataShareTitle="{
        icon: 'wallet',
        title: 'Xác nhận đơn hàng'
      }"
    />
    <div>
      <div class="checkout__delivery w50p h150  md:w480 mb10x">
        <div class="por df fcsb mb4x">
          <h4 class="checkout__delivery__title py2x">
            Giao hàng
          </h4>
          <p class="bdrmax bd2 p2x csp" @click.prevent="$refs.location2.modalHeader = true">
            Đổi phương thức
          </p>
        </div>
        <div class="df csp" @click.prevent="$refs.location.modalAddress1 = true">
          <div class="w20x">
            <img src="/img/Delivery 2.ced14c9.svg" alt="Delivery">
          </div>
          <div class="px4x w100p bdb1">
            <h5>
              {{ $store.getters['user/userLocation'].street_address ? $store.getters['user/userLocation'].street_address : '' }}
            </h5>
            <p class="fsmd pb3x">
              {{ $store.getters['user/userLocation'].street_address ? `${$store.getters['user/userLocation'].street_address} ${$store.getters['user/userLocation'].street_name} ${$store.getters['user/userLocation'].city} ${$store.getters['user/userLocation'].country}` : 'Nhập địa chỉ giao hàng' }}
            </p>
          </div>
          <div>
            <b-icon name="chevron-right" />
          </div>
        </div>
        <div>
          <b-input v-model="name" class="my4x py1x" placeholder="Tên người nhận" @input="errName = ''" />
          <div v-if="errName != ''">
            <span class="cre3">{{ errName }}</span>
          </div>
          <b-input v-model="phoneNumber" class="my4x py1x" placeholder="Số điện thoại" @input="errPhone = ''" />
          <div v-if="errPhone != ''">
            <span class="cre3">{{ errPhone }}</span>
          </div>
          <b-input v-model="note" class="my4x py1x" placeholder="Thêm hướng dẫn giao hàng" />
        </div>
      </div>
      <div class="checkout__ordered df fc fcsb bd1 w100p hmn400 md:w480 pt5x por bdrbxl">
        <div class="por df fcsb mb4x px5x">
          <h4 class="checkout__delivery__title--l20x py2x">
            Các món đã chọn
          </h4>
          <NuxtLink class="bdrmax bd2 p2x" to="/product">
            Thêm món
          </NuxtLink>
        </div>
        <div v-if="cartList.length > 0" class="px5x">
          <div v-for="(i, idx) in cartList" :key="idx" class="df fic fcsb mb2x">
            <div class="df fic">
              <b-icon name="edit-file" class="cor3a" />
              <div class="pl4x">
                <h4>
                  {{ i.name }}
                </h4>
                <p>
                  {{ `${i.quantity} x ${i.size.drinkSize}` }}
                </p>
                <p v-if="i.note !== '' && i.note !== undefined">
                  {{ `Note: ${i.note}` }}
                </p>
                <p v-if="i.quantityTopping.qty > 0">
                  {{ `${i.quantityTopping.qty} x ${i.quantityTopping.name}` }}
                </p>
                <p class="csp" @click="delItem(i)">
                  Xoá
                </p>
              </div>
            </div>
            <div>
              <p>
                {{ i.total }}
              </p>
            </div>
          </div>
        </div>
        <div class="por df fcsb my4x px5x">
          <h4 class="checkout__delivery__title--l20x py2x">
            Tổng cộng
          </h4>
        </div>
        <div class="df py4x bdb1 fcsb px5x">
          <p>
            Thành Tiền
          </p>
          <p>
            {{ sum }}
          </p>
        </div>
        <div class="Order__CTA df p4x fcsb bgor3 cs1 bdrbxl por w100p b0x">
          <div>
            <p>Thành tiền</p>
            <p class="fw6">
              {{ sum }}
            </p>
          </div>
          <div>
            <b-button :disabled="name === '' || phoneNumber === '' || checkedItems3.length === 0 || policy === false" @click="redirectProd">
              <p class="cor3">
                Đặt hàng
              </p>
            </b-button>
          </div>
        </div>
      </div>
      <div class="checkout__payment w100p h620 md:w480">
        <div class="por">
          <h4 class="checkout__delivery__title py2x">
            Phương thức thanh toán
          </h4>
        </div>
        <div class="fslg">
          <b-checkbox-group v-model="checkedItems3" class="db" :min="0" :max="1">
            <div v-for="(i, idx) in dataPayment" :key="idx" class="py4x bdb1">
              <b-checkbox :label="idx">
                <div class="df fic">
                  <img class="ofcv w6x h4x mx2x" :src="i.src" :alt="i.src">
                  <p>
                    {{ i.title }}
                  </p>
                </div>
              </b-checkbox>
            </div>
          </b-checkbox-group>
          <div class="py4x">
            <b-checkbox v-model="policy">
              <p class="ml3x">
                Đồng ý với các
                <span class="cor3a">
                  điều khoản và điều kiện
                </span></br>
                mua hàng của The Coffee House
              </p>
            </b-checkbox>
          </div>
        </div>
      </div>
      <div class="delete__payment fcc fic mt4x df w100p md:w480 cor3">
        <b-icon name="delete" size="24" />
        <p class="ml4x csp" @click="delAll">
          Xóa đơn hàng
        </p>
      </div>
      <div style="clear:both" />
    </div>
    <ModalLocation ref="location" />
    <b-modal
      medium
      scrollable
      container-class="h300 w400"
      :visible.sync="orderModal"
    >
      <div slot="title" class="row row-xs content-center">
        <div class="col-auto tac">
          <b class="df fic">
            <b-icon name="verified" class="c-teal-3 pr2x" />
            Đặt hàng thành công
          </b>
        </div>
      </div>
      <div class="df fnw tac">
        <p class="tac">
          Bạn sẽ được đưa về trang sản phẩm trong {{ countdown }} giây
        </p>
      </div>
    </b-modal>
    <ModalHeader ref="location2" />
  </div>
</template>

<script>
export default {
  name: 'CheckOut',
  middleware: 'authenticated',
  data () {
    return {
      timer: null,
      name: '',
      countdown: 5,
      orderModal: false,
      policy: true,
      chosenLocation: {
        street_address: '',
        street_name: '',
        city: '',
        country: ''
      },
      cartList: [],
      phoneNumber: '',
      note: '',
      checkedItems3: [],
      dataPayment: [
        {
          title: 'Tiền mặt',
          src: '/img/payment/1.jpeg'
        },
        {
          title: 'MoMo',
          src: '/img/payment/2.png'
        },
        {
          title: 'ZaloPay',
          src: '/img/payment/3.png'
        },
        {
          title: 'ShopeePay',
          src: '/img/payment/4.png'
        },
        {
          title: 'Thẻ ngân hàng',
          src: '/img/payment/5.png'
        }
      ],
      errName: '',
      errPhone: ''
    }
  },
  fetch () {
    if (this.$store.getters['cart/all'].length <= 0) {
      this.$router.push('/')
    } else {
      this.cartList = this.$store.getters['cart/all']
    }
  },
  computed: {
    sum () {
      return this.cartList.reduce((a, b) => {
        return a + b.total
      }, 0)
    }
  },
  created () {
    if (this.$store.getters['cart/all'].length <= 0) {
      this.$router.push('/')
    }
    this.$nuxt.$emit('show-carousel', false)
  },
  methods: {
    delItem (e) {
      this.$store.dispatch('cart/deleteCart', e)
      if (this.$store.getters['cart/all'].length === 0) {
        this.$router.push('/')
      }
    },
    delAll () {
      this.$store.dispatch('cart/deleteAll')
      this.$router.push('/')
    },
    redirectProd () {
      if (this.name.trim() === '') {
        this.errName = 'Xin hay nhap ten'
      }
      if (!this.phonenumber(this.phoneNumber.trim())) {
        this.errPhone = 'Xin hay nhap sdt hop le'
      }
      if (!!this.errPhone.trim() || !!this.errName.trim()) {
        return
      }
      this.orderModal = true
      let countdown
      setInterval(() => {
        countdown = this.countdown -= 1
        if (this.countdown === 0) {
          clearInterval(countdown)
          this.$store.dispatch('cart/deleteAll')
          this.orderModal = false
          this.$router.push('/product')
        }
      }, 1000)
    },
    phonenumber (inputtxt) {
      const phoneno = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/
      if ((inputtxt.match(phoneno))) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style lang="scss">
.checkout__delivery__title:after {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 50px;
  height: 2px;
  background: #fa8c16;
  border-radius: var(--space-6);
  content: "";
  z-index: 999;
}
.checkout__delivery__title--l20x {
  @extend .checkout__delivery__title;
  &:after {
    left: 20px;
  }
}
.checkout__ordered::-webkit-scrollbar {
  width: 10px;
}
.checkout__ordered::-webkit-scrollbar-track {
  background: #f1f1f1;
}
.checkout__ordered::-webkit-scrollbar-thumb {
  background: #888;
}
.checkout__ordered::-webkit-scrollbar-thumb:hover {
  background: #555;
}
@media(min-width: 992px){
  .checkout__delivery{
  float: left;
  width: calc(50% - 50px);
  }
  .checkout__ordered{
    float: right;
    box-shadow: 0px 10px 20px rgb(0 0 0 / 10%);
    width: calc(50% - 4px);
  }
  .checkout__payment{
    float: left;
    width: calc(50% - 4px);
  }
  .delete__payment{
    float: right;
    width: calc(50% - 4px);
  }
}
</style>
