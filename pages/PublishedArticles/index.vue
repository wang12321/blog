<template>
  <div>
    <client-only>
      <mavon-editor ref="md" v-model="form.content" @change="handle" @imgAdd="imgAdd" @save="save" />
      <article v-html="myhtml" />
    </client-only>
  </div>
</template>

<script>
import api from '@/services/api'
import { Message } from 'element-ui'
export default {
  name: 'PublishedArticles',
  layout: 'layoutAdmin',
  data () {
    return {
      myhtml: '',
      form: {}
    }
  },
  methods: {
    imgAdd (pos, $file) {
      // 第一步.将图片上传到服务器.
      const formdata = new FormData()
      formdata.append('image', $file)
      this.$refs.md.$img2Url(pos, 'https://www.baidu.com')

      // axios({
      //   url: 'server url',
      //   method: 'post',
      //   data: formdata,
      //   headers: { 'Content-Type': 'multipart/form-data' }
      // }).then((url) => {
      //   // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
      //   /**
      //    * $vm 指为mavonEditor实例，可以通过如下两种方式获取
      //    * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
      //    * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
      //    */
      // })
    },

    handle (value, render) {
      this.myhtml = render
      // console.log(value, render)
    },
    save (value, render) {
      const { articlesAdd } = api.user
      articlesAdd({ wznr: render, wzbt: '222' }).then((res) => {
        if (res.code === 1) {
          Message({
            message: res.msg,
            type: 'success',
            duration: 5 * 1000
          })
        }
      })
    }

    // articlesAdd
  }

}
</script>

<style scoped>

</style>

<!--<template>-->
<!--  <div class="home">-->
<!--    <client-only>-->
<!--      <mavon-editor-->
<!--        ref="md"-->
<!--        v-model="content"-->
<!--        placeholder="请输入文档内容..."-->
<!--        :box-shadow="false"-->
<!--        style="z-index:1;border: 1px solid #d9d9d9;height:50vh"-->
<!--        :toolbars="toolbars"-->
<!--      />-->
<!--    </client-only>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--export default {-->
<!--  name: 'Home',-->
<!--  components: {},-->
<!--  layout: 'layoutAdmin',-->
<!--  data () {-->
<!--    return {-->
<!--      content: '',-->
<!--      toolbars: {-->
<!--        bold: true, // 粗体-->
<!--        italic: true, // 斜体-->
<!--        header: true, // 标题-->
<!--        underline: true, // 下划线-->
<!--        strikethrough: true, // 中划线-->
<!--        mark: true, // 标记-->
<!--        superscript: true, // 上角标-->
<!--        subscript: true, // 下角标-->
<!--        quote: true, // 引用-->
<!--        ol: true, // 有序列表-->
<!--        ul: true, // 无序列表-->
<!--        link: true, // 链接-->
<!--        imagelink: true, // 图片链接-->
<!--        code: true, // code-->
<!--        table: true, // 表格-->
<!--        fullscreen: true, // 全屏编辑-->
<!--        readmodel: true, // 沉浸式阅读-->
<!--        htmlcode: true, // 展示html源码-->
<!--        help: true, // 帮助-->
<!--        /* 1.3.5 */-->
<!--        undo: true, // 上一步-->
<!--        redo: true, // 下一步-->
<!--        trash: true, // 清空-->
<!--        save: false, // 保存（触发events中的save事件）-->
<!--        /* 1.4.2 */-->
<!--        navigation: true, // 导航目录-->
<!--        /* 2.1.8 */-->
<!--        alignleft: true, // 左对齐-->
<!--        aligncenter: true, // 居中-->
<!--        alignright: true, // 右对齐-->
<!--        /* 2.2.1 */-->
<!--        subfield: true, // 单双栏模式-->
<!--        preview: true // 预览-->
<!--      }-->
<!--    }-->
<!--  },-->
<!--  methods: {-->
<!--    // 上传图片方法-->
<!--    $imgAdd (pos, $file) {-->
<!--      console.log(pos, $file)-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->
