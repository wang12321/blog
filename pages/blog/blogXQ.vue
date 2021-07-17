<template>
  <client-only>
    <div class="xq_div">
      <div style="font-size: 20px;height: 40px;line-height: 40px">
        {{ content.wzbt }}
      </div>
      <div class="text item" style="height: 20px; color: #666666">
        <span class="span_d"><i class="el-icon-view" style="padding-right: 5px" />{{ content.seeNum }}</span>
        <span class="span_d"><i class="el-icon-s-comment" />留言</span>
        <span class="span_d" :style="zanActionCss(content)" @click.stop="zanAction(content)"><i class="el-icon-thumb" />点赞</span>
      </div>
      <div class="dialog-content" style="padding: 20px">
        <div class="dialog-h5" v-html="content.wznr" />
      </div>

      <div style="width: 100%;">
        <div>
          <div style="font-size: 20px;padding: 10px 0">
            您的留言:
          </div>
          <el-input
            v-model="textarea"
            type="textarea"
            :rows="4"
            placeholder="请输入内容"
          />
          <el-button type="primary" :disabled="textarea.length === 0" style="float: right;margin-top: 20px" @click="lyAction">
            发送
          </el-button>
        </div>
        <div v-if="listRS.length !== 0" style="margin-top: 80px">
          <div style="font-size: 20px;padding: 10px 0">
            精选留言:
          </div>
          <div v-for="item in listRS" :key="item.id" style="margin-top: 10px; position: relative;">
            <el-card class="box-card">
              <div>
                <span style="color: #409eff;font-size: 15px">{{ item.userName }}</span>的留言:
              </div>
              <div style="position: absolute;right: 10px;top: 20px">
                <span style="font-size: 12px">{{ item.lysj }}</span>
              </div>
              <div style="padding: 10px 20px">
                {{ item.lynr }}
              </div>
            </el-card>
          </div>
        </div>
      </div>
    </div>
  </client-only>
</template>

<script>
import api from '@/services/api'
import { Message } from 'element-ui'

export default {
  name: 'BlogXQ',
  layout: 'blog',
  data () {
    return {
      textarea: '',
      content: {},
      listRS: []
    }
  },
  mounted () {
    this.updata()
    this.lyselect()
  },
  methods: {
    lyselect () {
      const { articlesSelectLY } = api.user
      articlesSelectLY({ wzid: this.$route.query.id || '0' }).then((res) => {
        if (res.code === 1 && res.obj) {
          this.listRS = res.obj.data
        }
      })
    },
    lyAction () {
      const { articlesLY } = api.user
      articlesLY({ wzid: this.$route.query.id || '0', lynr: this.textarea, wzuserID: this.content.userID }).then((res) => {
        if (res.code === 1 && res.obj) {
          this.lyselect()
          this.textarea = ''
          Message({
            message: res.msg,
            type: 'success',
            duration: 5 * 1000
          })
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
    },
    // 数据请求
    updata () {
      if (process.browser) {
        const { articlesID } = api.user
        articlesID({ wzid: this.$route.query.id || '0' }).then((res) => {
          if (res.code === 1 && res.obj) {
            this.content = res.obj
          }
        })
      }
    }
  }
}
</script>

<style>
.xq_div{
  background-color: rgba(255,255,255,0.7);
  padding: 10px;
  overflow: hidden;

}
.xq_div >>> code.lang-{
  width: 100% !important;
  overflow: auto;
}
.xq_div >>> pre{
  width: 100%;
  overflow: auto;
  background-color: #000000;
  color: #ffffff;
}
.xq_div{
  width: 100%;
}
.dialog-h5 >>> img,p,span {
  width: 400px;
}
.span_d{
  padding: 20px;
  font-size: 12px;
}
.dialog-content {
  height: 100%;
  overflow-y:auto;
  overflow-x:hidden;
  width: 100%;
}

.dialog-h5 >>> code.lang-{
  width: 100% !important;
  overflow: auto;
}
.dialog-h5 >>> pre{
  width: 100%;
  overflow: auto;
  background-color: #000000;
  color: #ffffff;
}
.dialog-h5 p img{
  width: 100%;
}
.dialog-h5 >>> img,p,span {
  width: 100%;
}
</style>
