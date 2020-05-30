<template>
  <div style="padding:30px;">
    <p>车辆品牌小游戏</p>
    <p>第{{ idx + 1 }}题，共{{ total }}题</p>
    <img :src="imgUrl">
    <br>
    <div>
      <el-radio-group v-model="chooseId" @change="changeHandler">
        <el-radio class="radio" :label="optAId">A. {{ optAMsg }}；</el-radio><br><br>
        <el-radio class="radio" :label="optBId">B. {{ optBMsg }}；</el-radio><br><br>
        <el-radio class="radio" :label="optCId">C. {{ optCMsg }}；</el-radio><br><br>
        <el-radio class="radio" :label="optDId">D. {{ optDMsg }}；</el-radio><br><br>
      </el-radio-group>
    </div>
    <button @click="prevQuestion">上一题</button>&nbsp;
    <button @click="nextQuestion">下一题</button>&nbsp;
    <button @click="submitSurvey">交卷</button><br>
    成绩：{{ score }}; 正确答案：{{ answer }}
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      msg: 'Local Defaults!',
      total: 0,
      score: 0.0,
      v3: 'bb',
      chooseId: '',
      idx: 0, // 当前题目
      surveyData: [],
      imgUrl: '',
      optAId: '',
      optAMsg: '',
      optBId: '',
      optBMsg: '',
      optCId: '',
      optCMsg: '',
      optDId: '',
      optDMsg: '',
      answer: '',
      isFinished: false
    }
  },
  created() {
    // this.getMessage()
  },
  mounted() {
    this.getSurveyData()
  },
  methods: {
    getSurveyData() {
      const path = this.app_global.serverBase + 'getSurveyData'
      axios.get(path)
        .then((res) => {
          this.surveyData = res.data.data.survey_data
          this.total = this.surveyData.length
          this.displayQuestion()
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error)
        })
    },
    changeHandler(value) {
      console.log('改变之后的值是:' + value)
      this.surveyData[this.idx].choose = value
    },
    displayQuestion() {
      this.imgUrl = this.app_global.serverBase + this.surveyData[this.idx].vbicon
      this.optAId = this.surveyData[this.idx].options[0].vehicle_brand_id
      this.optAMsg = this.surveyData[this.idx].options[0].content
      this.optBId = this.surveyData[this.idx].options[1].vehicle_brand_id
      this.optBMsg = this.surveyData[this.idx].options[1].content
      this.optCId = this.surveyData[this.idx].options[2].vehicle_brand_id
      this.optCMsg = this.surveyData[this.idx].options[2].content
      this.optDId = this.surveyData[this.idx].options[3].vehicle_brand_id
      this.optDMsg = this.surveyData[this.idx].options[3].content
      this.chooseId = this.surveyData[this.idx].choose
      if (this.isFinished) {
        for (let i = 0; i < 4; i++) {
          if (this.surveyData[this.idx].answer === this.surveyData[this.idx].options[i].vehicle_brand_id) {
            this.answer = this.surveyData[this.idx].options[i].content
            break
          }
        }
      }
    },
    prevQuestion() {
      this.idx--
      if (this.idx < 0) {
        this.idx = 0
      }
      this.displayQuestion()
    },
    nextQuestion() {
      this.idx++
      if (this.idx > this.surveyData.length - 1) {
        this.idx = this.surveyData.length - 1
      }
      this.displayQuestion()
    },
    submitSurvey() {
      this.isFinished = true
      let cnt = 0
      // 判分
      for (let i = 0; i < this.surveyData.length; i++) {
        if (this.surveyData[i].choose === this.surveyData[i].answer) {
          cnt++
        }
      }
      this.score = cnt / this.total * 100
      this.displayQuestion()
    }
  }
}
</script>
