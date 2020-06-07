<template>
  <div style="padding:30px;">
    <p>导入公告号与品牌-车型-年款对应关系</p>
    <p>
      <ul>
        <li>公告号：{{ gghNum }}；</li>
        <li>品牌：{{ brandNum }}；</li>
        <li>车型：{{ modelNum }}；</li>
        <li>年款：{{ bmyNum }}；</li>
      </ul>
    </p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      gghNum: 1,
      brandNum: 2,
      modelNum: 3,
      bmyNum: 4
    }
  },
  created() {
    this.gghToBmyDict()
  },
  methods: {
    gghToBmyDict() {
      const path = this.app_global.serverBase + 'admin/gghToBmyDict?mode=1'
      console.log(path)
      axios.get(path)
        .then((res) => {
          console.log('mode=1 response')
          const dataObj = res.data.data
          this.gghNum = dataObj.ggh_num
          this.brandNum = dataObj.brand_num
          this.modelNum = dataObj.model_num
          this.bmyNum = dataObj.bmy_num
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error)
        })
    }
  }
}
</script>
