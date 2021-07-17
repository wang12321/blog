<template>
  <div class="block" style="background-color: rgba(255,255,255,0.9);padding: 10px">
    <el-timeline>
      <el-timeline-item v-for="item in timeList" :key="item.id" timestamp="2018/4/12" placement="top">
        <el-card>
          <h4>更新 Github 模板</h4>
          <p>王小虎 提交于 2018/4/12 20:46</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
import api from '@/services/api'

export default {
  name: 'BlogMessage',
  layout: 'blog',
  data () {
    return {
      timeList: [1, 2, 3, 4]
    }
  },
  mounted () {
    this.updata()
  },
  methods: {
    // 数据请求
    updata () {
      if (process.browser) {
        const { messageGz } = api.user
        messageGz().then((res) => {
          if (res.code === 1 && res.obj) {
            this.timeList = res.obj.data
          }
        })
      }
    }

  }
}
</script>

<style scoped>

</style>
