<template>
  <div style="padding:30px;">
    <button @click="getRefreshBmys">实时数据</button><br>
    <p v-show="showBmys">共有{{ total }}个车型：</p>
    <el-table
      :key="name"
      v-loading="showLoading"
      :data="bmys"
      border
      fit
      highlight-current-row
      style="width: 520px;"
    >
      <el-table-column label="序号" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.bmy_id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="车型名称" width="300px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.bmy_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="数量" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.bmy_num }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      total: 0,
      bmys: null,
      showBmys: false,
      showLoading: true
    }
  },
  created() {
    this.getMessage()
  },
  methods: {
    getMessage() {
      const path = this.app_global.serverBase + 'admin/getBmys?mode=1'
      console.log(path)
      axios.get(path)
        .then((res) => {
          console.log('mode=1 response')
          this.showBmys = true
          this.showLoading = false
          this.total = res.data.data.total
          this.bmys = res.data.data.bmys
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error)
        })
    },
    getRefreshBmys() {
      const path = this.app_global.serverBase + 'admin/getBmys?mode=2'
      this.showLoading = true
      this.showBmys = false
      console.log(path)
      axios.get(path)
        .then((res) => {
          this.showBmys = true
          this.showLoading = false
          this.total = res.data.data.total
          this.bmys = res.data.data.bmys
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error)
        })
    }
  }
}
</script>
