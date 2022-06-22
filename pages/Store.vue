<template>
  <div>
    <SharedTitle
      :dataShareTitle="{
        icon:'home',
        title:'Hệ thống cửa hàng The Coffee House'}"
    />
    <div class="store__list dn md:df">
      <ul class="store__item df fw tac cor2a lh200p">
        <li
          v-for="(i,idx) in dataStoreLocations"
          :key="idx"
          :class="selected === idx ? 'store__name__act ' : ''"
          class="store__name p2x mr2x csp cor3"
          @click="filterCity(i.dataLocation, idx)"
        >
          {{ i.name }}
        </li>
      </ul>
    </div>
    <b-form-item class="md:df my4x">
      <b-select v-model="dataSelect" class="md:w40p mr-2x" placeholder="Vui lòng chọn quận/huyện" @change="filterCity">
        <b-option v-for="(i,idx) in dataOption" :key="idx" :value="i.value" :lable="i.lable" />
      </b-select>
      <b-input v-model="dataInput" class="md:w40p" placeholder="Nhập tên đường, quận huyện, tỉnh thành" @input="filterCityOnInput(dataInput)" />
    </b-form-item>
    <div class="store__main">
      <h3>Tìm Thấy {{ dataStoreItem.length }} Cửa Hàng</h3>
      <StoreItem :dataStoreItem="dataStoreItem" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'TchStote',
  data () {
    return {
      dataSelect: '',
      dataInput: '',
      dataOption: [],
      dataStoreItem: [],
      selected: null,
      dataStoreLocations: [
        {
          name: 'Hồ Chí Minh (61)',
          dataLocation: 'HCM'

        },
        {
          name: 'Hải Phòng (3)',
          dataLocation: 'HAIPHONG'

        },
        {
          name: 'Đà Nẵng (5)',
          dataLocation: 'DANANG'

        },
        {
          name: 'Đồng Nai (1)',
          dataLocation: 'DONGNAI'

        },
        {
          name: 'Bà Rịa Vũng Tàu (3)',
          dataLocation: 'BARIAVUNGTAU'

        },
        {
          name: 'Cần Thơ (2)',
          dataLocation: 'CANTHO'

        },
        {
          name: 'Thanh Hóa (2)',
          dataLocation: 'THANHHOA'

        },
        {
          name: 'Bình Dương (1)',
          dataLocation: 'BINHDUONG'

        },
        {
          name: 'Nghệ An (3)',
          dataLocation: 'NGHEAN'

        },
        {
          name: 'Bắc Ninh (2)',
          dataLocation: 'BACNINH'

        },
        {
          name: 'Hưng Yên (1)',
          dataLocation: 'HUNGYEN'

        },
        {
          name: 'Nha Trang (2)',
          dataLocation: 'NHATRANG'

        },
        {
          name: 'Khánh Hòa (1)',
          dataLocation: 'KHANHHOA'

        },
        {
          name: 'Kiên Giang (2)',
          dataLocation: 'KIENGIANG'

        },
        {
          name: 'Tây Ninh (2)',
          dataLocation: 'TAYNINH'

        },
        {
          name: 'Hà Tĩnh (1)',
          dataLocation: 'HATINH'

        }
      ]
    }
  },
  async fetch () {
    const data = await fetch('https://605a1350b11aba001745d80e.mockapi.io/district')
    const dataJson = await data.json()
    this.dataOption = dataJson
  },
  created () {
    this.$nuxt.$emit('show-carousel', true)
    this.filterCity('HCM', 0)
  },
  methods: {
    async filterCity (city = '', index = null) {
      if (index !== null) {
        this.selected = index
      }
      const data = await fetch('https://605a1350b11aba001745d80e.mockapi.io/storeData')
      const dataStoreItemJson = await data.json()
      let cloneDataOption = [...dataStoreItemJson]
      if (city !== '') {
        cloneDataOption = cloneDataOption.filter(e => e.location === city)
      }
      this.dataStoreItem = cloneDataOption
    },
    async filterCityOnInput (city = '') {
      const data = await fetch('https://605a1350b11aba001745d80e.mockapi.io/storeData')
      const dataStoreItemJson = await data.json()
      let cloneDataOption = [...dataStoreItemJson]
      if (city !== '') {
        cloneDataOption = cloneDataOption.filter(e => this.xoa_dau(e.address).toLowerCase().includes(this.xoa_dau(city).toLowerCase()))
      }
      this.dataStoreItem = cloneDataOption
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
    }
  }
}
</script>

<style lang="scss">
  .store__name{
    width: calc(25% - 10px)
  }
  .store__name__act{
    color: white !important;
    background-color: #fa8c16;
    border-radius: 25px;
  }
</style>
