<template>
  <b-modal
    medium
    scrollable
    container-class="h300 w400"
    :visible.sync="modalAddress1"
    close-on-click-modal
    close-on-press-escape
  >
    <div slot="title" class="row row-xs content-center">
      <div class="col-auto tac">
        <b>Giao hàng</b>
      </div>
    </div>
    <div>
      <b-input v-model="inputNote" class="mt4x" placeholder="Vui lòng nhập địa chỉ" @input="showAddress" />
    </div>
    <div v-for="(i,idx) in addressList" :key="idx" class="df p4x" @click="chosenAddr(i)">
      <b-col xs="a">
        <b-icon name="location" />
      </b-col>
      <b-col>
        <p>
          {{ i.street_address }}
        </p>
        <p>
          {{ `${i.street_address} ${i.street_name}, ${i.city}, ${i.country}` }}
        </p>
      </b-col>
    </div>
  </b-modal>
</template>

<script>
export default {
  name: 'ModalLocation',
  data () {
    return {
      chosenLocation: {
        street_address: '',
        street_name: '',
        city: '',
        country: ''
      },
      modalAddress1: false,
      addressList: [],
      inputNote: ''
    }
  },
  methods: {
    showAddress (e) {
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
          cloneData = cloneData.filter(addr => addr.city.includes(e) ||
          addr.country.includes(e) ||
          addr.street_address.includes(e) ||
          addr.street_name.includes(e) ||
          addr.secondary_address.includes(e))
          this.addressList = cloneData
        }
      }, 200)
    },
    chosenAddr (e) {
      this.modalAddress1 = false
      this.chosenLocation = e
      this.addressList = []
      this.inputNote = ''
      this.$store.dispatch('user/setLocation', e)
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
