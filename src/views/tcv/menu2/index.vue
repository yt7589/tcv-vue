<template>
  <div style="padding:30px;">
    <p>测试程序</p>
    <p>动态内容：</p>
    {{ msg }}
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      msg: 'Local Defaults!'
    }
  },
  created() {
    this.getMessage()
  },
  methods: {
    getMessage() {
      const path = this.app_global.serverBase + 'getBrands'
      axios.get(path)
        .then((res) => {
          this.msg = res.data
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error)
        })
    }
  }
}
</script>
