<template>
  <div style="padding:30px;">
    <p>更新字典 v0.0.3</p>
    <p>根据指定目录（格式为品牌/车型/年款），更新品牌_车型_年款与细分类编号对应关系的字典</p>
    <img :src="testImageUrl">
    <p><input v-model="folderName" type="text" style="width: 100%;"></p>
    <button @click="updateDict">Create</button>
    <p>执行结果：{{ msg }}</P>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      msg: '',
      testImageUrl: this.app_global.serverBase + 'displayImage/a2.png',
      folderName: '/media/zjkj/35196947-b671-441e-9631-6245942d671b/vehicle_type_v2d/vehicle_type_v2d/品牌'
    }
  },
  created() {
    this.getMessage()
  },
  methods: {
    updateDict() {
      const req = this.app_global.serverBase + 'updateDict?folderName=' + this.folderName
      axios.get(req)
        .then((res) => {
          console.log('update dict is OK')
          this.msg = res.data
        })
        .catch((error) => {
          console.error(error)
        })
    },
    getMessage() {
      const path = this.app_global.serverBase + 'getSurveyData'
      axios.get(path)
        .then((res) => {
          this.msg = res.data.data.survey_data
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error)
        })
    }
  }
}
</script>
