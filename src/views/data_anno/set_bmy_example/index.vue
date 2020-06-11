<template>
  <div style="padding:30px;">
    <p>年款共{{ total }}个</p>
    <p>
      {{ bmys[idx].bmy_id }} &nbsp; : &nbsp; {{ bmys[idx].bmy_name }}&nbsp;
      <button @click="prevBmy">上一款</button>&nbsp;
      <button @click="nextBmy">下一款</button>&nbsp;
    </p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      idx: 0,
      total: 0,
      bmys: null
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
    },
    nextBmy() {
      this.idx += 1
      if (this.idx >= this.bmys.length) {
        this.idx = this.bmys.length - 1
      }
    }
  }
}
</script>
