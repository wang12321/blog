<template>
  <div>
    <client-only>
      <CURDexample
        :table-column="tableColumn"
        :table-data="tableData"
        :formlist="formlist"
        :form-data="formData"
        :dialog-form-data.sync="dialogFormData"
        :is-advanced="isAdvanced"
        :page-data="pageData"
        @searchSubmit="searchSubmit"
        @sortchange="sortchange"
        @submitAdd="submitAdd"
        @submitEdit="submitEdit"
        @reloadData="reloadData"
        @deleteData="deleteData"
      />
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
      pageData: { total: 100, page: 1, rows: 20 },
      isAdvanced: true,
      formData: {},
      dialogFormData: {},
      formlist: [
      ],
      tableColumn: [
        {
          label: '文章标题',
          prop: 'wzbt',
          align: 'left',
          add: true,
          search: true,
          rules: true,
          type: 'input',
          isAdvanced: true
        }, {
          label: '文章内容',
          prop: 'wznr',
          align: 'left',
          add: true,
          search: true,
          type: 'input',
          render: (h, params) => {
            return h('span', { style: 'color: dodgerblue' }, params.row.wznr)
          }
        }, {
          label: '创建时间',
          prop: 'fbsj',
          formatter: (row) => {
            return `<span style="color: dodgerblue;">${row.fbsj}</span>`
          }
        }
      ],
      tableData: []
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
    deleteData () {
      alert('删除')
    },
    searchSubmit (data) {
      console.log(data)
      alert('查询了')
    },
    sortchange (e) {
      console.log(e)
      alert(e.column.label + '排序')
    },
    submitAdd (data) {
      console.log(data)
      alert('新增了')
    },
    submitEdit () {
      alert('编辑了')
    },
    reloadData () {
      alert('当前页码' + this.pageData.page)
    }
  }

}
</script>

<style scoped>

</style>
