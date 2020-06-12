<template>
  <div style="padding:30px;">
    <p>生成增量数据集</p>
    <p>负责人：<input v-model="workerId" type="text"></p>
    <button @click="createDeltaDs">生成</button>&nbsp;
    <p>结果：{{ result }}</p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      workerId: '',
      result: ''
    }
  },
  methods: {
    createDeltaDs() {
      const path = this.app_global.serverBase + 'admin/createDeltaDs?workerId=' + this.workerId
      console.log(path)
      axios.get(path)
        .then((res) => {
          console.log('get createDeltaDs response')
          this.result = res.data.data.status
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }
}
</script>

