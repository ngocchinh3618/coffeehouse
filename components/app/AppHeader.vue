<template>
  <div>
    <div class="app-header h16x sm:h20x header__bg fcc" :shadow="1">
      <b-header class="bgta h16x sm:h20x md:wmx960 lg:wmx1200 xl:wmx1200">
        <div slot="branding">
          <nuxt-link to="/">
            <img src="/img/logo.174bdfd.svg" alt="logo">
          </nuxt-link>
        </div>
        <div slot="left" class="df cs1">
          <div class="delivery df p-2x fic wmx280 wmn160 bgor3 bdrmax" @click.prevent="$refs.location.modalHeader = true">
            <img class="bd-rds-max" src="/img/Delivery 2.ced14c9.svg" alt="Delivery">
            <div class="delivery__content px-2x wmx280 wmn120">
              <h5 class="wmx280 wmn20">
                Giao hàng
              </h5>
              <p class="tuels wmx280 wmn20">
                Tại: {{ $store.getters['user/userLocation'].street_address ? `${$store.getters['user/userLocation'].street_address} ${$store.getters['user/userLocation'].street_name} ${$store.getters['user/userLocation'].city} ${$store.getters['user/userLocation'].country}` : 'Nhập địa chỉ giao hàng' }}
              </p>
            </div>
            <img class="w-2x" src="/img/favicon.svg" alt="icon-vertor">
          </div>
          <div class="header__nav md:df dn fic ml-5x fw6">
            <nuxt-link class="ml-5x pb-1x tac" to="/product">
              Đặt hàng
            </nuxt-link>
            <nuxt-link class="ml-5x pb-1x tac" to="/news">
              Tin Tức
            </nuxt-link>
            <nuxt-link class="ml-5x pb-1x tac" to="/store">
              Cửa hàng
            </nuxt-link>
            <a class="ml-5x pb-1x tac" target="_blank" href="https://hr.thecoffeehouse.com/">
              Tuyển dụng
            </a>
          </div>
        </div>
        <div slot="right" class="df fic fcc">
          <div v-if="$store.getters['user/logState'] === false" class="header__login" @click.prevent="modalVisible1 = true">
            <img class="w10x" src="/img/Login.70dc3d8.png" alt="login">
          </div>
          <div v-if="$store.getters['user/logState'] === true" class="header__login" to="/login">
            <b-dropdown trigger="click" @command="handleLogout">
              <img class="w10x" src="/img/Login.70dc3d8.png" alt="login">
              <b-dropdown-menu slot="dropdown">
                <b-dropdown-item>
                  Logout
                </b-dropdown-item>
              </b-dropdown-menu>
            </b-dropdown>
          </div>
          <nuxt-link class="header__carticons" to="/checkout">
            <b-badge class="header__badge" :value="$store.getters['cart/all'].reduce((a,b) => a + b.quantity ,0)">
              <img class="w18x header__carticon" src="/img/Carticon.373916c.png" alt="Carticon">
            </b-badge>
          </nuxt-link>
        </div>
      </b-header>
    </div>
    <div class="header__nav__mb df cg6 fic fcsb fw6 fssm w100p h20x md:dn">
      <nuxt-link class="mx4x pb-1x tac" to="/" exact>
        <b-icon name="home" :size="24" />
        <p>Trang chủ</p>
      </nuxt-link>
      <nuxt-link class="mx4x pb-1x tac" to="/product">
        <b-icon name="shipping-motocycle" :size="24" />
        <p>Đặt hàng</p>
      </nuxt-link>
      <nuxt-link class="mx4x pb-1x tac" to="/news">
        <b-icon name="package" :size="24" />
        <p>Tin Tức</p>
      </nuxt-link>
      <nuxt-link class="mx4x pb-1x tac" to="/store">
        <b-icon name="store" :size="24" />
        <p>Cửa hàng</p>
      </nuxt-link>
    </div>
    <b-modal close-on-click-modal close-on-press-escape :show-close="false" :visible.sync="modalVisible1">
      <div class="tac">
        <img src="/img/login.png" alt="">
        <div>
          <p class="my4x fslg">
            Chào mừng bạn đến với
          </p>
          <img class="mb7x ma" src="/img/logoblack.svg" alt="logo">
          <b-input v-model="inputLogin" class="my5x" placeholder="Nhập số điện thoại">
            <template #prefix>
              <div class="df fic">
                <img src="/img/flag.svg" alt="flag">
                <p class="px2x">
                  +84
                </p>
              </div>
            </template>
          </b-input>
          <b-button :disabled="phonenumber(inputLogin) === false" class="w100p cs1a bdrmax bgor3a" @click="handleLogin">
            Đăng nhập
          </b-button>
        </div>
      </div>
    </b-modal>
    <ModalHeader ref="location" />
  </div>
</template>

<script>
export default {
  name: 'AppHeader',
  data () {
    return {
      modalVisible1: false,
      inputLogin: ''
    }
  },
  computed: {
    sumCart () {
      return this.$store.getters['cart/cartLength']
    }
  },
  methods: {
    handleLogin () {
      this.$store.dispatch('user/login', true)
      this.modalVisible1 = false
    },
    handleLogout () {
      this.$store.dispatch('user/login', false)
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
.header__carticon{
  transform: translate(38px,2px);
}
.header__login{
  transform: translate(40px);
  z-index: 1000;
}
.header__nav{
  .nuxt-link-active, .nuxt-link:hover{
    border-bottom: 1px solid #eaeaea;
  }
}
  .header__carticons{
    .b-badge__content.is-fixed {
    position: absolute;
    top: 24px;
    right: -40px;
    z-index: 1;
    transform: translate(-50%, -50%);
    }
  }

.header__nav__mb{
  position: fixed;
  z-index: 1987;
  bottom: 0;
  box-shadow: 0 -4px 10px rgb(0 0 0 / 10%);
  background-color: white;
  .nuxt-link-active, .nuxt-link:hover{
    color: #ff8419 !important;
  }
}
.header__bg{
  background-image: radial-gradient(100% 501.4% at 0% 100%,#ffb141 0%,#fb8d17 100%) !important;
}
@media (max-width: 992px) {
  .app-header{
    .app-branding{
      display: none;
    }
    .container-fluid{
      padding: 8px;
    }
  }
  .header__carticon{
    transform: translate(0px,2px);
  }
  .header__login{
    transform: translate(0px)
  }
  .header__carticons{
    .b-badge__content.is-fixed {
    right: 0px;
    transform: translate(-50%, -50%);
    }
  }
}
  @media (max-width: 360px) {
    .header__login{
      display: none;
    }
}

</style>
