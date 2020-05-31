<template>
  <div style="padding:30px;">
    <p v-show="showBrands">共有{{ total }}个品牌：</p>
    <p v-show="showProgress">加载中请稍候...</p>
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
        <template>
          <span>*</span>
        </template>
      </el-table-column>
      <el-table-column label="品牌名称" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="数量" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.num }}</span>
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
      showProgress: true,
      showBrands: false,
      showLoading: true
    }
  },
  created() {
    this.getMessage()
  },
  methods: {
    getMessage() {
      const path = this.app_global.serverBase + 'admin/getKnownBrands'
      console.log(path)
      axios.get(path)
        .then((res) => {
          this.showProgress = false
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
