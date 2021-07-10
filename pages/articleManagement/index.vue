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
    </client-only>
  </div>
</template>

<script>
import api from '@/services/api'
export default {
  name: 'Index',
  layout: 'layoutAdmin',
  data () {
    return {
      roundCount: 0, // 合计
      pageKey: 0, // 刷新分页组件key
      total: 0,
      dateData: [],
      isAdvanced: true,
      formData: {
        unionType: 'all',
        object_id: '',
        datePicker: []
      },
      tableData: [],
      tableColumn: [
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
              alert('查看')
            }
          },
          {
            label: '编辑',
            show: true,
            btnType: 'danger',
            plain: true,
            method: (index, row) => {
              console.log(index, row)
              alert('编辑')
            }
          },
          {
            label: '都否删除当前数据?',
            show: true,
            type: 'delete',
            plain: true,
            method: (index, row) => {
              console.log(index, row)
              alert('删除')
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
        { titleShow: true, title: '文章标题', placeholder: '文章标题', key: 'wzbt', type: 'input', clearable: true },
        { titleShow: true, title: '', key: 'datePicker', type: 'datePicker', isAdvanced: true, change: this.changeDate }
      ]
    }
  },
  mounted () {
    const { articlesSelect } = api.user
    articlesSelect().then((res) => {
      if (res.code === 1 && res.obj && res.obj.data) {
        this.tableData = res.obj.data
      }
    })
  },
  methods: {
    // 数据请求
    updata () {
      this.total = 100
      this.roundCount = 200
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

</style>
