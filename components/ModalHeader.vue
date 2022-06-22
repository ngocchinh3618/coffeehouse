<template>
  <b-modal
    large
    :visible.sync="modalHeader"
    close-on-click-modal
    close-on-press-escape
    :show-close="false"
    container-class="por z3000 mt20x"
  >
    <div class="por z4000 location__container bdrmax p2x w160 ma">
      <div class="location__bd p2x bdrmax pof bgs1">
        <div class="cs1a df fcc fic bdrmax p2x location__container__img">
          <img src="/img/Delivery 2.ced14c9.svg" alt="Delivery">
          <h5 class="ml2x">
            Giao hàng
          </h5>
        </div>
      </div>
    </div>
    <div>
      <b-input v-model="inputNote" class="mt4x" placeholder="Vui lòng nhập địa chỉ" @input="showAddress" />
    </div>
    <div v-for="(i,idx) in addressList" :key="idx" class="df p4x" @click="chosenAddr(i)">
      <b-col>
        <p>
          {{ i.street_address }}
        </p>
        <p>
          {{ `${i.street_address} ${i.street_name}, ${i.city}, ${i.country}` }}
        </p>
      </b-col>
    </div>
    <div class="df fic fcc mt2x csp" :class="{dn: inputNote === '' || (inputNote !== '' && inputNote === `${$store.getters['user/userLocation'].street_address} ${$store.getters['user/userLocation'].street_name} ${$store.getters['user/userLocation'].city} ${$store.getters['user/userLocation'].country}`)}">
      <b-icon name="arrow-left" />
      <span class="ml2x" @click.prevent="backClick = true; startInput = false; inputNote = $store.getters['user/userLocation'].street_address ? `${$store.getters['user/userLocation'].street_address} ${$store.getters['user/userLocation'].street_name} ${$store.getters['user/userLocation'].city} ${$store.getters['user/userLocation'].country}` : ''">Quay về địa chỉ cũ</span>
    </div>
    <div class="df fcc fic mt4x" :class="{dn: (inputNote === '' && startInput) || (inputNote !== '' && startInput) || (backClick === true && inputNote !== '' && inputNote !== `${$store.getters['user/userLocation'].street_address} ${$store.getters['user/userLocation'].street_name} ${$store.getters['user/userLocation'].city} ${$store.getters['user/userLocation'].country}`)}">
      <b-button class="cs1a bgor3a p4x mr4x" :disabled="inputNote ===''" @click.prevent="handleChosenAddr">
        Chọn địa chỉ này
      </b-button>
      <b-button @click.prevent="startInput = true; inputNote = ' '">
        Nhập địa chỉ mới
      </b-button>
    </div>
  </b-modal>
</template>

<script>
export default {
  name: 'ModalHeader',
  data () {
    return {
      chosenLocation: {
        street_address: '',
        street_name: '',
        city: '',
        country: ''
      },
      modalHeader: false,
      addressList: [],
      inputNote: '',
      backClick: false,
      startInput: false
    }
  },
  methods: {
    showAddress (e) {
      this.backClick = false
      this.startInput = true
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(async () => {
        if (e === '') {
          this.addressList = []
        } else {
          const data = await fetch('https://random-data-api.com/api/address/random_address?size=100')
          const dataJson = await data.json()
          let cloneData = [...dataJson]
          cloneData = cloneData.filter(addr => addr.city.includes(e.trim()) ||
          addr.country.includes(e.trim()) ||
          addr.street_address.includes(e.trim()) ||
          addr.street_name.includes(e.trim()) ||
          addr.secondary_address.includes(e.trim()))
          this.addressList = cloneData
        }
      }, 500)
    },
    chosenAddr (e) {
      this.chosenLocation = e
      this.addressList = []
      this.modalHeader = false
      this.backClick = false
      this.startInput = false
      this.$store.dispatch('user/setLocation', e)
      this.inputNote = ''
      this.$notify({
        title: 'Thành công',
        message: 'Thay đổi địa chỉ thành công',
        type: 'success',
        offset: 120
      })
    },
    handleChosenAddr () {
      this.modalHeader = false
      this.addressList = []
      this.backClick = false
      this.startInput = false
      this.$store.dispatch('user/setLocation', this.chosenLocation)
      this.inputNote = ''
      this.$notify({
        title: 'Thành công',
        message: 'Thay đổi địa chỉ thành công',
        type: 'success',
        offset: 120
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.location__container {
  top: -88px !important;
}
.location__bd{
  border: 1px dashed #fb8d17;
}
.location__container__img{
  box-shadow: 0 4px 8px rgb(0 0 0 / 20%);
  background: radial-gradient(100% 828.83% at 0% 100%,#e87800 0%,#fa8c16 100%);
}
</style>
