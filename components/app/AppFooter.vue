<template>
  <div class="footer cs1a">
    <div class="footer__content df fic hmn140 md:hmn160">
      <div class="df w-100p ma py10x md:wmx960 lg:wmx1200 xl:wmx1200">
        <div class="ca">
          <img class="wmn100" src="/img/logo-footer.72c86fc.png" alt="logo">
        </div>
        <div class="c md:df md:ml20x">
          <div class="md:c3 footer__navbar por">
            <p class="csp" @click="isOpen = !isOpen">
              <b-icon class="pr1x" :class="{dn: isOpen === true}" name="control-plus" />
              <b-icon class="pr1x" :class="{dn: isOpen === false}" name="control-minus" />
              Thông tin website
            </p>
            <transition name="expand" mode="out-in">
              <div v-if="isOpen" class="footer__list pl7x py2x lh-150p">
                <div class="csp" @click="$router.push('/')">
                  Trang chủ
                </div>
                <div class="csp" @click="$router.push('/product')">
                  Đặt hàng
                </div>
                <div class="csp" @click="$router.push('/news')">
                  Tin tức
                </div>
                <div class="csp" @click="goExtUrl">
                  Tuyển dụng
                </div>
                <div class="csp" @click="$router.push('/product')">
                  Khuyến mãi
                </div>
              </div>
            </transition>
          </div>
          <div class="md:c3 footer__navbar por">
            <p class="csp" @click="isOpen2 = !isOpen2">
              <b-icon class="pr1x" :class="{dn: isOpen2 === true}" name="control-plus" />
              <b-icon class="pr1x" :class="{dn: isOpen2 === false}" name="control-minus" />
              Điều khoản sử dụng
            </p>
            <transition name="expand">
              <div v-if="isOpen2" class="footer__list pl7x py2x lh-150p">
                <div>
                  Quy chế website
                </div>
                <div>
                  Bảo mật thông tin
                </div>
              </div>
            </transition>
          </div>
          <div class="md:c3 footer__navbar por">
            <p class="csp" @click="isOpen3 = !isOpen3">
              <b-icon class="pr1x" :class="{dn: isOpen3 === true}" name="control-plus" />
              <b-icon class="pr1x" :class="{dn: isOpen3 === false}" name="control-minus" />
              Hotline
            </p>
            <transition name="expand">
              <div v-if="isOpen3" class="footer__list pl7x py2x lh-150p">
                <div class="csp" @click="$router.push('/product')">
                  Đặt hàng
                  <a href="#">
                    1800 6936 (07:00-20:30)
                  </a>
                </div>
                <div class="csp" @click="$router.push('/product')">
                  Hỗ trợ
                  <a href="#">
                    028.71.087.088
                  </a> (07:00-21:00)
                </div>
              </div>
            </transition>
          </div>
          <div class="md:c3 footer__navbar por">
            <p class="csp" @click="isOpen4 = !isOpen4">
              <b-icon :class="{dn: isOpen4 === true}" name="control-plus" class="pr1x" />
              <b-icon :class="{dn: isOpen4 === false}" name="control-minus" class="pr1x" />
              Liên Hệ
            </p>
            <transition name="expand">
              <div v-if="isOpen4" class="footer__list pl7x py2x lh-150p">
                <div>
                  Head Office 1: 86 - 88 Cao Thang, Ward 4, District 3, Ho Chi Minh, Vietnam. Head Office 2: Floor 3 & 4 The Hub Building - 195/10E Dien Bien Phu, Ward 15, Binh Thanh District, Ho Chi Minh, Vietnam. +842871 078 079 hi@thecoffeehouse.vn
                </div>
                <div>
                  hi@thecoffeehouse.vn Head Office 2: Floor 3 & 4 The Hub Building - 195/10E Dien Bien Phu, Ward 15, Binh Thanh District, Ho Chi Minh, Vietnam.
                </div>
                <div>
                  +842871 078 079
                </div>
                <div>
                  hi@thecoffeehouse.vn
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
    <div class="footer__bottom bgba">
      <div class="ma w-100p fic fcsb df md:wmx960 lg:wmx1200 xl:wmx1200 py-2x">
        <p>Copyright © 2021 The Coffee House. All rights reserved.</p>
        <a href="http://online.gov.vn/Home/WebDetails/48042?AspxAutoDetectCookieSupport=1">
          <img src="/img/active.4cba64f.png" alt="">
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppFooter',
  data () {
    return {
      isOpen: false,
      isOpen2: false,
      isOpen3: false,
      isOpen4: false
    }
  },
  methods: {
    goExtUrl () {
      window.location = 'https://hr.thecoffeehouse.com/'
    }
  }
}
</script>

<style lang="scss">
  .footer__content {
      background-image: url(~/assets/image/footer-desktop.727f3a2.png);
      background-repeat: no-repeat;
      background-size: cover;
      background-position: top
  }
  .footer__list > li {
    list-style-type: disc !important;
  }
  .footer__list {
    overflow: hidden;
    > div {
      display: list-item;
      list-style-type: disc;
      list-style-position: inside;
    }
  }
  .footer__navbar::after {
    position: absolute;
    content: "";
    left: 0;
    width: 85%;
    height: 1px;
    background-color: white;
    opacity: .3;
    margin-top: 12px;
  }
  .expand-enter-active,
  .expand-leave-active {
    transition: max-height 0.7s ease 0.1s;
    max-height: 400px;
  }

  .expand-enter,
  .expand-leave-to {
    max-height: 0;
    overflow: hidden;
  }
</style>
