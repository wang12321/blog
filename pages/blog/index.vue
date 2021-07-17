<template>
  <!--  <client-only>-->
  <div>
    <div class="block">
      <el-carousel trigger="click" height="220px">
        <el-carousel-item v-for="(item,index) in imgs" :key="index">
          <img :src="item.src" alt="" width="100%" height="100%">
        </el-carousel-item>
      </el-carousel>
    </div>
    <div v-for="item in listRS" :key="item.id" style="margin-top: 10px" @click="pushAction(item)">
      <el-card class="box-card">
        <div v-if="item.src && item.src.length !== 0" class="img_div">
          <!--            <img src="https://upload-images.jianshu.io/upload_images/26056473-31a13d689075f9e4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" style="width: 100%;height: 100%" alt="">-->
          <img :src="item.src" alt="" style="width: 100%;height: 100%">
        </div>
        <div class="text item">
          {{ item.wzbt }}
        </div>
        <div class="text item">
          {{ item.wznrtext.substring(0,60) }}
        </div>
        <div class="text item" style="height: 20px; color: #666666">
          <span class="span_d"><i class="el-icon-view" style="padding-right: 5px" />{{ item.seeNum }}</span>
          <span class="span_d"><i class="el-icon-s-comment" />留言</span>
          <span class="span_d" :style="zanActionCss(item)" @click.stop="zanAction(item)"><i class="el-icon-thumb" />点赞</span>
        </div>
      </el-card>
    </div>
    <Pagination :key="pageKey" style="background-color: #ffffff" :page-data="paramsRS" @reloadData="reloadData" />
    <div style="padding-bottom: 20px" />
  </div>
<!--  </client-only>-->
</template>

<script>
import pic1 from '@/static/1.png'
import pic2 from '@/static/2.png'
import pic3 from '@/static/3.png'
import pic4 from '@/static/4.png'
import pic5 from '@/static/5.png'
import api from '@/services/api'

export default {
  name: 'Index',
  layout: 'blog',
  data () {
    return {
      total: 0,
      pageKey: 0,
      listRS: '',
      iconColor: '#666',
      iconColorzan: '#666',
      imgs: [{ src: pic1 }, { src: pic2 }, { src: pic3 }, { src: pic4 }, { src: pic5 }]
    }
  },
  computed: {
    paramsRS () {
      return { total: this.total, page: 1, rows: 10 }
    }
  },
  mounted () {
    this.updata()
  },
  methods: {
    reloadData () {
      this.updata()
    },
    pushAction (item) {
      this.$router.push({ path: `/blog/blogXQ?id=${item.id}` })
    },
    // 数据请求
    updata () {
      const { articlesSelect } = api.user
      articlesSelect(Object.assign({ ...this.paramsRS, all: 1 })).then((res) => {
        if (res.code === 1 && res.obj && res.obj.data) {
          res.obj.data.forEach((item) => {
            item.src = item.wznr.includes('src=') ? item.wznr.substring(item.wznr.indexOf('src=') + 5, item.wznr.indexOf('alt=') - 2) : ''
          })
          this.total = res.obj.total
          this.listRS = res.obj.data
        }
      })
    },
    zanActionCss (item) {
      return { color: item.zantype === '1' ? '#409EFF' : '#666' }
    },
    zanAction (item) {
      if (item.zantype === '1') {
        item.zantype = '0'
      } else {
        item.zantype = '1'
        const { articleszan } = api.user
        articleszan({ wzid: item.id }).then(() => {
        })
      }
    }
  }
}
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}

.text {
  font-size: 14px;
}

.item {
  height: 30px;
  line-height: 20px;
  /*padding: 10px;*/
}

.box-card {
}
.img_div{
  text-align: center;
  background-color: #f4f4f5;
  width: 80px;
  height: 80px;
  float: left;
  margin-right: 10px;
}
.span_d{
  padding: 20px;
  font-size: 12px;
}
.item >>> img,p,span {
  width: 100%;
  margin: 0;
  padding: 0;
}
</style>
