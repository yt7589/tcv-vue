<template>
  <div style="padding:5px;">
    <p>
      {{ idx+1 }} / {{ total }} &nbsp; : &nbsp; {{ bmys==null ? '' : bmys[idx].bmy_name }}&nbsp;
      <button @click="prevBmy">上一款</button>&nbsp;
      <button @click="nextBmy">下一款</button>&nbsp;
    </p>
    <table style="width: 70%;">
      <tr>
        <td style="width: 50%; text-align: right;">
          <img :src="exampleVehicleImageUrl" style="width: 100%;">
        </td>
        <td style="width: 50%; text-align: left;">
          <img :src="vehicleImageUrl" style="width: 100%;">
        </td>
      </tr>
      <tr>
        <td style="width: 50%; text-align: right;">
          &nbsp;
        </td>
        <td style="width: 50%; text-align: left;">
          <button @click="prevImage">上一张</button>&nbsp;
          <button @click="chooseImage">选择</button>&nbsp;
          <button @click="nextImage">下一张</button>&nbsp;
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      idx: 0,
      total: 0,
      bmys: null,
      staticUrl: this.app_global.serverBase + 'displayVehicleImage/0',
      prevVehicleImageId: 0,
      vehicleImageId: 0,
      vehicleImageUrl: '',
      exampleVehicleImageId: 0,
      exampleVehicleImageUrl: ''
    }
  },
  created() {
    this.getBmys()
  },
  methods: {
    getBmys() {
      const path = this.app_global.serverBase + 'admin/getBmys'
      console.log(path)
      axios.get(path)
        .then((res) => {
          console.log('mode=1 response')
          this.total = res.data.data.total
          this.bmys = res.data.data.bmys
          this.getBmyExampleVehicleImageId()
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error)
        })
    },
    getBmyExampleVehicleImageId() {
      const path = this.app_global.serverBase + 'admin/getBmyExampleVehicleImageId?bmyId=' + this.bmys[this.idx].bmy_id
      console.log(path)
      axios.get(path)
        .then((res) => {
          console.log('example:' + JSON.stringify(res.data.data) + '!')
          this.exampleVehicleImageId = res.data.data.vehicle_image_id
          this.exampleVehicleImageUrl = this.app_global.serverBase + 'displayVehicleImage/' + this.exampleVehicleImageId
          this.getBmyCurrentVehicleImageId(1)
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error)
        })
    },
    getBmyCurrentVehicleImageId(mode) {
      // mode=1为下一个
      const path = this.app_global.serverBase + 'admin/getBmyCurrentVehicleImageId?prevVehicleImageId=' +
            this.vehicleImageId + '&bmyId=' + this.bmys[this.idx].bmy_id + '&mode=' + mode
      console.log('current: ' + path + '!')
      axios.get(path)
        .then((res) => {
          console.log('current:' + JSON.stringify(res.data.data) + '!')
          this.vehicleImageId = res.data.data.vehicle_image_id
          this.vehicleImageUrl = this.app_global.serverBase + 'displayVehicleImage/' + this.vehicleImageId
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error)
        })
    },
    prevBmy() {
      this.idx -= 1
      if (this.idx < 0) {
        this.idx = 0
      }
      this.vehicleImageId = 0
      this.getBmyExampleVehicleImageId()
    },
    nextBmy() {
      this.idx += 1
      if (this.idx >= this.bmys.length) {
        this.idx = this.bmys.length - 1
      }
      this.vehicleImageId = 0
      this.getBmyExampleVehicleImageId()
    },
    prevImage() {
      this.getBmyCurrentVehicleImageId(2)
    },
    chooseImage() {
      const path = this.app_global.serverBase + 'admin/setBmyExampleVehicleImageId?vehicleImageId=' +
            this.vehicleImageId + '&bmyId=' + this.bmys[this.idx].bmy_id
      console.log('current: ' + path + '!')
      axios.get(path)
        .then((res) => {
          console.log('current:' + JSON.stringify(res.data.data) + '!')
          this.exampleVehicleImageId = this.vehicleImageId
          this.exampleVehicleImageUrl = this.app_global.serverBase + 'displayVehicleImage/' + this.exampleVehicleImageId
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error)
        })
    },
    nextImage() {
      this.getBmyCurrentVehicleImageId(1)
    }
  }
}
</script>
