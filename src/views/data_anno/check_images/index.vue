<template>
  <div style="padding:30px;">
    <p v-if="showWorder">工作编号：<input v-model="workerId" type="text">&nbsp;<button @click="getDeltaDsDetl">获取</button></p>
    <p>{{ bmyId }} : {{ bmyName }}&nbsp;&nbsp;错误率： {{ total==0 ? 0 : (errorNum / total).toFixed(3) * 100 }}%</p>
    <table v-if="showImages" style="width: 70%;">
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
          <button @click="acceptJob">接受</button>&nbsp;
          <button @click="refuseJob">拒绝</button>&nbsp;
        </td>
        <td style="width: 50%; text-align: left;">
          &nbsp;
          <button @click="prevImage">上一张</button>&nbsp;
          <button @click="chooseImage">选择</button>&nbsp;
          <button @click="discardImage">丢弃</button>&nbsp;
          <button @click="faultImage">错误</button>&nbsp;
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
      showWorder: true,
      showImages: false,
      workerId: '',
      deltaDsId: 0,
      deltaDsDetlId: 0,
      vehicleImageId: 0,
      vehicleImageUrl: '',
      bmyId: 0,
      bmyName: '',
      exampleVehicleImageId: 0,
      exampleVehicleImageUrl: '',
      mode: 1,
      total: 0,
      errorNum: 0
    }
  },
  methods: {
    getDeltaDsDetl() {
      const path = this.app_global.serverBase + 'admin/getWorkerDeltaDsDetl?workerId=' +
            this.workerId + '&deltaDsId=' + this.deltaDsId + '&deltaDsDetlId=' +
            this.deltaDsDetlId + '&mode=' + this.mode
      console.log(path)
      axios.get(path)
        .then((res) => {
          this.showWorder = false
          this.showImages = true
          const rec = res.data.data.delta_ds_detl_vo
          console.log(JSON.stringify(rec))
          this.bmyId = rec.bmy_id
          this.bmyName = rec.bmy_name
          this.deltaDsDetlId = rec.delta_ds_detl_id
          this.vehicleImageId = rec.vehicle_image_id
          this.vehicleImageUrl = this.app_global.serverBase + 'displayVehicleImage/' + this.vehicleImageId
          this.getBmyExampleVehicleImageId()
        })
        .catch((error) => {
          console.error(error)
        })
    },
    getBmyExampleVehicleImageId() {
      if (this.bmyId < 1) {
        return
      }
      const path = this.app_global.serverBase + 'admin/getBmyExampleVehicleImageId?bmyId=' + this.bmyId
      console.log(path)
      axios.get(path)
        .then((res) => {
          console.log('example:' + JSON.stringify(res.data.data) + '!')
          this.exampleVehicleImageId = res.data.data.vehicle_image_id
          this.exampleVehicleImageUrl = this.app_global.serverBase + 'displayVehicleImage/' + this.exampleVehicleImageId
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error)
        })
    },
    prevImage() {
      this.mode = 2
      this.getDeltaDsDetl()
    },
    chooseImage() {
      const state = 1
      this.setDeltaDsDetlState(this.deltaDsDetlId, state)
    },
    discardImage() {
      const state = 2
      this.setDeltaDsDetlState(this.deltaDsDetlId, state)
    },
    faultImage() {
      const state = 3
      this.setDeltaDsDetlState(this.deltaDsDetlId, state)
    },
    setDeltaDsDetlState(deltaDsDetlId, state) {
      const path = this.app_global.serverBase + 'admin/setDeltaDsDetlState?deltaDsDetlId=' +
            this.deltaDsDetlId + '&state=' + state
      console.log(path)
      axios.get(path)
        .then((res) => {
          console.log('example:' + JSON.stringify(res.data.data) + '!')
          alert('更新成功')
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error)
        })
    },
    nextImage() {
      this.mode = 1
      this.getDeltaDsDetl()
    },
    acceptJob() {
      this.total++
      this.nextImage()
    },
    refuseJob() {
      this.total++
      this.errorNum++
      this.nextImage()
    }
  }
}
</script>
