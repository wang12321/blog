<template>
  <div style="height: calc(100vh)">
    <img src="@/static/background.png" alt="" style="width: 100%;height: 100%">
    <div style="background-color:rgba(255,255,255,0.5);height: calc(100vh);position: absolute;top: 0px;width: 100%;overflow: hidden">
      <el-header class="header_blog">
        <div class="header_title_blog">
          <span style="font-size: 24px"> {{ title }}</span>
          <span style="font-size: 14px;padding-left: 40px"> 记录每一分每一秒</span>
        </div>

        <div class="header_dr_blog">
          <nuxt-link v-if="!name" to="/login/blogLogin">
            <span>登录/注册</span>
          </nuxt-link>
          <nuxt-link v-else to="/PublishedArticles">
            <span>{{ name }}</span>
          </nuxt-link>
        </div>
      </el-header>
      <el-main class="elmain">
        <div class="header_menu_blog">
          <el-menu :default-active="activeIndex" class="el-menu-demo" @select="handleSelect">
            <el-menu-item index="1">
              <i class="el-icon-house" />
              <nuxt-link to="/blog">
                大殿
              </nuxt-link>
            </el-menu-item>
            <el-menu-item index="2">
              <i class="el-icon-orange" />
              <nuxt-link to="/blog">
                觉醒
              </nuxt-link>
            </el-menu-item>
            <el-menu-item index="3">
              <i class="el-icon-chat-dot-square" />
              <nuxt-link to="/blog">
                感知
              </nuxt-link>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-location-information" />
              <nuxt-link to="/blog">
                奔跑
              </nuxt-link>
            </el-menu-item>
          </el-menu>
        </div>
        <div class="nuxtMain">
          <nuxt keep-alive :keep-alive-props="{ include: ['Index']}" />

          <!--          <nuxt :keep-alive="true" />-->
        </div>
        <div class="rightMain">
          <div class="grid-content bg-purple">
            <div style="padding:20px;min-width: 230px">
              <div>
                <i class="el-icon-s-unfold" />
                <span>热门文章</span>
              </div>
              <div v-if="listRS && listRS.length !== 0" style="width: 100%;height: 100%">
                <div v-for="(item,index) in listRS" :key="index" class="span_listRS span_list" @click="goDetail(item)">
                  <div :style="((index+1)+ (paramsRS.page-1)*paramsRS.rows) === 1 ? {color: '#FE2D46'}: (((index+1)+ (paramsRS.page-1)*paramsRS.rows) === 2 ? {color: '#F60'}:(((index+1)+ (paramsRS.page-1)*paramsRS.rows) === 3 ? {color: '#FAA90E'}:((index+1)+ (paramsRS.page-1)*paramsRS.rows) > 99? {fontSize:12+'px'}:''))" style="float: left;width: 20px;height:30px;padding-right: 5px;color: #9195A3">
                    {{ (index+1)+ (paramsRS.page-1)*paramsRS.rows }}
                  </div>
                  <div class="htmlRS">
                    {{ item.wzbt }}
                  </div>
                </div>
              </div>
              <div v-else style="text-align: center;">
                <div style="width: 203px;margin: 0 auto; margin-top: 30px">
                  <img :src="require('@/static/nodata-img.png')" style="height: 130px;">
                </div>
                <div style="color:#868686;">
                  暂无热搜
                </div>
              </div>
            </div>
          </div>
          <div style="width: 100%;height: 200px;margin-top:10px;background-color: #ffffff">
            <client-only>
              <el-calendar v-model="value" />
            </client-only>
          </div>
        </div>
      </el-main>
    </div>
  </div>
<!--  </client-only>-->
</template>

<script>

import { mapGetters } from 'vuex'
import api from '@/services/api'

export default {
  name: 'Blog',
  data () {
    return {
      title: '</>minute-book',
      activeIndex: '1',
      listRS: [],
      value: new Date()
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ]),
    paramsRS () {
      return { page: 1, rows: 10 }
    }
  },
  mounted () {
    this.updata()
    if (this.$route.path.includes('/blog_message')) {
      this.activeIndex = '3'
    }
  },
  methods: {
    // 数据请求
    updata () {
      const { articlesSelect } = api.user
      articlesSelect(Object.assign({ ...this.paramsRS, all: 1 })).then((res) => {
        if (res.code === 1 && res.obj && res.obj.data) {
          this.listRS = res.obj.data
        }
      })
    },
    goDetail () {

    },
    hyhRS () {

    },
    handleSelect (key, keyPath) {
      switch (key) {
        case '1':
          this.$router.push({ path: '/blog' })
          break
        case '2':
          this.$router.push({ path: '/blog' })
          break
        case '3':
          this.$router.push({ path: '/blog/blog_message' })
          break
        case '4':
          this.$router.push({ path: '/blog' })
          break
      }
    }
  }

}
</script>

<style lang="scss" scoped>
//.el-menu.el-menu--horizontal{
//  border-bottom:none;
//}
//.el-menu--horizontal>.el-menu-item.is-active {
//  border-bottom: none;
//  font-weight: bold;
//  color: red;
//}
//.el-menu-item{
//  color: #fff;
//}

//.el-menu{
//  background-color: rgba(0,0,0,0);
//  .el-menu--horizontal>.el-submenu .el-submenu__title {
//    height: 60px;
//    line-height: 60px;
//    border-bottom: 2px solid transparent;
//    color: #FFF;
//  }
//}
//.el-menu--horizontal>.el-menu-item:not(.is-disabled):focus, .el-menu--horizontal>.el-menu-item:not(.is-disabled):hover, .el-menu--horizontal>.el-submenu .el-submenu__title:hover {
//  background-color: rebeccapurple;
//  color: #fff;
//}
.el-menu {
  border-right: none;
  list-style: none;
  position: relative;
  margin: 0;
  padding-left: 0;
  background-color: rgba(255,255,255,0);
}
.header_blog{
  background-color: rgba(255, 255, 255, 0.8);
  width: 100%;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  transition: width .28s;
  .header_title_blog{
    height: 60px;
    line-height: 60px;
    color: #409EFF;
    font-weight: bold;
  }
  .header_title_blog img{
    width: 60px;
    height: 60px;
    float: left;
  }
}
.header_dr_blog{
  position: absolute;
  width: 120px;
  height: 60px;
  right: 0px;
  top: 0px;
  line-height: 60px;
  font-size: 17px;
  color: #409EFF;
}

.header_menu_blog{
  position: fixed;
  width: 200px;
  text-align: center;
  padding-right: 30px;
  min-height: calc(100vh - 80px);
  left: calc(50% - 650px);
  top: 80px;
  line-height: 60px;
  font-size: 14px;
  background-color:rgba(255,255,255,0);
  float: left;
}
.elmain{
  overflow: auto;
  position: absolute;
  width: 100%;
  min-height: calc(100vh - 80px);
  //left: 50%;
  //margin-left: -600px;
  top: 60px;
  font-size: 14px;
  background-color:rgba(255,255,255,0);
}
.nuxtMain {
  position: absolute;
  width: 750px;
  min-height: calc(100vh - 100px);
  left: calc(50% - 470px);
  top: 20px;
  line-height: 25px;
  font-size: 14px;
  background-color:rgba(255,255,255,0);
  float: left;
}
.rightMain {
  position: fixed;
  width: 300px;
  min-height: calc(100vh - 100px);
  left: calc(50% + 290px);
  top: 80px;
  font-size: 14px;
  background-color:rgba(255,255,255,0);
  float: left;
}
.bg-purple{
  background-color:rgba(255,255,255,0.8);
}
</style>
<style>
.search-form-advanced .el-input-group__append{
  background: #409EFF;
  border: 1px solid #409EFF;
  color: #fff;
  font-size: 20px;
}
.span_listRS{
  position: relative;
}
.span_list{
  font-size: 14px;
  width: 100%;
  height: 30px;
  padding-top: 10px;
  line-height: 30px;
  color: #464646 !important;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  display:-webkit-box;
  -webkit-line-clamp:1;
  -webkit-box-orient:vertical;
}
.span_list:hover{
  color: #015a9e;
}
.textN *{
  font-size: 14px !important;
}
.hyh{
  float: right;color: #409EFF;font-size: 14px;
}
.hyh:active{
  color: red;
}
.htmlRS{
  font-size: 14px;color: #409EFF;
  margin-right: 40px;
  height: 30px;
  line-height: 30px;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  display:-webkit-box;
  -webkit-line-clamp:2;
  -webkit-box-orient:vertical;
}
.htmlRS:hover{
  color: #337ab7;
}
.textN{
  text-overflow: ellipsis;
  display:-webkit-box;
  -webkit-line-clamp:2;
  -webkit-box-orient:vertical;
  height: 35px;
  overflow: hidden;
  font-size: 14px;
  color: #464646;
  padding:2px 10px;
}
.knowledgeBase-search .el-loading-spinner{
  top: 100px
}
.rightMain .el-calendar-table .el-calendar-day {
  box-sizing: border-box;
  padding: 8px;
   height: 30px;
}
.rightMain .el-button--mini, .el-button--mini.is-round {
  font-size: 10px;
  padding: 7px 2px;
}
</style>
