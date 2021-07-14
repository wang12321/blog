<template>
  <div class="main">
    <client-only>
      <div class="wzbt">
        <el-input v-model="wzbt" style="font-size: 17px;width: 85%" placeholder="请输入文章标题" />
        <el-button v-if=" id === 0 " type="primary" @click="fbAction">
          发布
        </el-button>
        <el-button v-else type="primary" @click="fbAction">
          更新发布
        </el-button>
      </div>

      <mavon-editor
        ref="md"
        v-model="form.content"
        @change="handle"
        @imgAdd="imgAdd"
        @save="save"
      />
    </client-only>
  </div>
</template>

<script>
import api from '@/services/api'
import { Message } from 'element-ui'
import axios from 'axios'
import apiURL from '@/services/apiURL'

export default {
  name: 'PublishedArticles',
  layout: 'layoutAdmin',
  props: {
    contentText: {
      type: String,
      default: ''
    },
    wzbtP: {
      type: String,
      default: ''
    },
    id: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      wzbt: '',
      myhtml: '',
      form: {},
      fbnr: {}
    }
  },
  created () {
    this.form.content = this.contentText
    this.wzbt = this.wzbtP
  },
  methods: {
    imgAdd (pos, $file) {
      // 第一步.将图片上传到服务器.
      const formdata = new FormData()
      formdata.append('files', $file)
      axios({
        url: apiURL[process.env.NODE_ENV].user + 'articles/uploadimg',
        method: 'post',
        data: formdata,
        headers: { 'Content-Type': 'multipart/form-data' }
      }).then((response) => {
        const res = response.data
        // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
        /**
         * $vm 指为mavonEditor实例，可以通过如下两种方式获取
         * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
         * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
         */
        if (res.code === 1) {
          this.$refs.md.$img2Url(pos, apiURL[process.env.NODE_ENV].user + res.obj.url)
        } else {
          Message({
            message: res.msg,
            type: 'error',
            duration: 5 * 1000
          })
        }
      })
    },

    handle (value, render) {
      this.myhtml = render
      this.fbnr = {}
    },
    save (value, render) {
      if (this.id !== 0) {
        const { ArticlesUPDATE } = api.user
        ArticlesUPDATE({ wznr: render, wznrtext: value, wzbt: this.wzbt, fbzt: 0 }).then((res) => {
          if (res.code === 1) {
            this.fbnr = { id: res.obj.id }
            Message({
              message: res.msg,
              type: 'success',
              duration: 5 * 1000
            })
          }
        })
      } else {
        const { articlesAdd } = api.user
        articlesAdd({ wznr: render, wznrtext: value, wzbt: this.wzbt, fbzt: 0 }).then((res) => {
          if (res.code === 1) {
            this.fbnr = { id: res.obj.id }
            Message({
              message: res.msg,
              type: 'success',
              duration: 5 * 1000
            })
          }
        })
      }
    },
    fbAction () {
      if (this.fbnr && this.fbnr.id) {
        const { articlesfb } = api.user
        articlesfb({ id: this.fbnr.id, fbzt: 1 }).then((res) => {
          if (res.code === 1) {
            Message({
              message: res.msg,
              type: 'success',
              duration: 5 * 1000
            })
          }
        })
      } else {
        Message({
          message: '请先保存文章',
          type: 'error',
          duration: 5 * 1000
        })
      }
    }

    // articlesAdd
  }

}
</script>

<style>
.main .v-note-wrapper .v-note-panel .v-note-edit.divarea-wrapper .content-input-wrapper {
  width: 100%;
  height: calc(100vh - 200px) !important;
  overflow: auto;
  padding: 8px 25px 15px 25px;
}

.main .v-note-wrapper .v-note-panel .v-note-show .v-show-content, .v-note-wrapper .v-note-panel .v-note-show .v-show-content-html {
  width: 100%;
  height: calc(100vh - 200px) !important;
  padding: 8px 25px 15px 25px;
  overflow-y: auto;
  box-sizing: border-box;
  overflow-x: hidden;
}

.wzbt .el-input__inner{
  border: 0px;
  height: 60px;
  line-height: 60px;
}
</style>
