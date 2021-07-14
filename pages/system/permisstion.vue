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
          label: '用户名',
          prop: 'userName',
          align: 'left',
          formatter: (row) => {
            return `<span>${row.userName}</span>`
          }
        }, {
          label: '注册时间',
          prop: 'zcsj',
          align: 'left',
          formatter: (row) => {
            return `<span>${row.zcsj}</span>`
          }
        }, {
          label: '权限',
          prop: 'premisstion',
          align: 'left',

          formatter: (row) => {
            return `<span>${row.premisstion === 1 ? '超级管理员' : row.premisstion === 2 ? '管理员' : '普通用户'}</span>`
          }
        }],
      options: {
        loading: false,
        border: true,
        className: 'table-class'
      },
      operates: {
      }
    }
  },
  computed: {
    pageData () {
      return { total: this.total, page: 1, rows: 20 }
    },
    formOptions () {
      return [
        { titleShow: true, title: '用户名', placeholder: '用户名', key: 'userName', type: 'input', clearable: true }
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
      const { userList } = api.user
      userList(Object.assign({ ...this.pageData, ...this.formData })).then((res) => {
        if (res.code === 1 && res.obj && res.obj.data) {
          console.log(res.obj.data)
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

.dialog-h5 >>> img,p,span {
  width: 100%;
}

</style>
