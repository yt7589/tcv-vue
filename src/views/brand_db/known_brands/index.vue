<template>
  <div style="padding:30px;">
    <button @click="getRefreshKnownBrands">实时数据</button><br>
    <p v-show="showBrands">共有{{ total }}个品牌：</p>
    <el-table
      :key="name"
      v-loading="showLoading"
      :data="brands"
      border
      fit
      highlight-current-row
      style="width: 330px;"
    >
      <el-table-column label="序号" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.brand_id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="品牌名称" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.brand_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="数量" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.brand_num }}</span>
        </template>
      </el-table-column>
    </el-table>
    <!--
    <ul v-show="showBrands">
      <li v-for="(item, idx) in brands" :key="item.name">
        {{ idx + 1 }}. {{ item.name }}: {{ item.num }}
      </li>
    </ul>
    -->
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      total: 0,
      brands: null,
      showBrands: false,
      showLoading: true
    }
  },
  created() {
    this.getMessage()
  },
  methods: {
    getMessage() {
      const path = this.app_global.serverBase + 'admin/getKnownBrands?mode=1'
      console.log(path)
      axios.get(path)
        .then((res) => {
          this.showBrands = true
          this.showLoading = false
          this.total = res.data.data.total
          this.brands = res.data.data.brands
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error)
        })
    },
    getRefreshKnownBrands() {
      const path = this.app_global.serverBase + 'admin/getKnownBrands?mode=2'
      this.showLoading = true
      this.showBrands = false
      console.log(path)
      axios.get(path)
        .then((res) => {
          this.showBrands = true
          this.showLoading = false
          this.total = res.data.data.total
          this.brands = res.data.data.brands
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error)
        })
    }
  }
}
</script>
