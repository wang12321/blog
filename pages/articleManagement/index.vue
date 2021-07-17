<template>
  <div>
    <client-only>
      <el-container>
        <el-header style="height: auto">
          <search-form
            :form-options="formOptions"
            :form-data="formData"
            @submit="submit"
          />
        </el-header>
        <el-main>
          <TableComponent
            :table-data="tableData"
            :table-column="tableColumn"
            :options="options"
            :operates="operates"
          />
          <Pagination :key="pageKey" :page-data="pageData" @reloadData="reloadData" />
        </el-main>
      </el-container>
      <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        width="80%"
      >
        <div class="dialog-content">
          <div class="dialog-h5" v-html="myhtml" />
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>

      <el-dialog
        title="编辑文章"
        :visible.sync="PublishedArticlesdialogVisible"
        width="80%"
      >
        <PublishedArticles :id="wzid" :key="wzKey" :content-text="contentText" :wzbt-p="wzbtP" />
        <span slot="footer" class="dialog-footer">
          <el-button @click="PublishedArticlesdialogVisible = false">取 消</el-button>
        </span>
      </el-dialog>
    </client-only>
  </div>
</template>

<script>
import api from '@/services/api'
import PublishedArticles from '@/pages/PublishedArticles'
import { Message } from 'element-ui'

export default {
  name: 'Index',
  components: {
    PublishedArticles
  },
  layout: 'layoutAdmin',
  data () {
    return {
      wzid: '',
      wzKey: 0,
      PublishedArticlesdialogVisible: false,
      myhtml: '',
      contentText: '',
      wzbtP: '',
      form: {},
      dialogVisible: false,
      title: '',
      pageKey: 0, // 刷新分页组件key
      total: 0,
      dateData: [],
      isAdvanced: true,
      formData: {
      },
      tableData: [],
      tableColumn: [
        {
          label: '#',
          prop: 'index',
          align: 'left',
          render: (h, params) => {
            console.log(params)
            return h('span', params.row.index)
          }
        },
        {
          label: '文章标题',
          prop: 'wzbt',
          align: 'left',
          formatter: (row) => {
            return `<span>${row.wzbt}</span>`
          }
        }, {
          label: '文章内容',
          prop: 'wznr',
          align: 'left',
          // formatter: (row) => {
          //   return `<span style="display: inline-block; height: 40px;overflow: hidden">${row.wznr}</span>`
          // }
          render: (h, params) => {
            return h('div', {
              style: {
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }
            }, params.row.wznr)
          }
        }, {
          label: '发布状态',
          prop: 'fbzt',
          align: 'left',

          formatter: (row) => {
            return `<span>${row.fbzt === 0 ? '待发布' : '已发布'}</span>`
          }
        },
        {
          label: '发布时间',
          prop: 'fbsj',
          align: 'left',

          formatter: (row) => {
            return `<span>${row.fbsj}</span>`
          }
        }],
      options: {
        loading: false,
        border: true,
        className: 'table-class'
      },
      operates: {
        isButton: false,
        width: '280px',
        label: '操作',
        list: [
          {
            label: '查看',
            show: true,
            btnType: 'primary',
            plain: true,
            method: (index, row) => {
              console.log(index, row)
              this.dialogVisible = true
              this.title = row.wzbt
              this.myhtml = row.wznr
            }
          },
          {
            label: '编辑',
            show: true,
            btnType: 'danger',
            plain: true,
            method: (index, row) => {
              console.log(index, row)
              this.wzKey += 1
              this.PublishedArticlesdialogVisible = true
              this.contentText = row.wznrtext
              this.wzbtP = row.wzbt
              this.wzid = row.id
            }
          },
          {
            label: '都否删除当前数据?',
            show: true,
            type: 'delete',
            plain: true,
            method: (index, row) => {
              console.log(index, row)
              const { articlesfb } = api.user
              articlesfb({ id: row.id, fbzt: 2 }).then((res) => {
                if (res.code === 1) {
                  this.updata()
                  Message({
                    message: '删除成功',
                    type: 'success',
                    duration: 5 * 1000
                  })
                }
              })
            }
          }
        ]
      }
    }
  },
  computed: {
    pageData () {
      return { total: this.total, page: 1, rows: 20 }
    },
    formOptions () {
      return [
        { titleShow: true, title: '文章标题', placeholder: '文章标题', key: 'wzbt', type: 'input', clearable: true }
        // { titleShow: true, title: '', key: 'datePicker', type: 'datePicker', isAdvanced: true, change: this.changeDate }
      ]
    }
  },
  mounted () {
    this.updata()
  },
  methods: {
    // 数据请求
    updata () {
      const { articlesSelect } = api.user
      articlesSelect(Object.assign({ ...this.pageData, ...this.formData })).then((res) => {
        if (res.code === 1 && res.obj && res.obj.data) {
          res.obj.data.forEach((item, index) => {
            item.index = index + 1
          })
          this.tableData = res.obj.data
          this.total = res.obj.total
        }
      })
    },
    // 竞技赛场开放请求
    switchActon () {

    },
    // 日期选择区间
    changeDate (mutableSearchDateRange) {
      this.dateData = mutableSearchDateRange
    },
    // 查询
    submit () {
      this.pageData.page = 1
      this.pageKey += 1
      this.updata()
    },
    // 分页
    reloadData () {
      this.updata()
    }
  }

}
</script>

<style scoped>
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

.dialog-h5 >>> img,p,span {
  width: 100%;
}

</style>
