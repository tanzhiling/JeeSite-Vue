<template>
  <a-row class="sys-office-page">
    <a-col :span="4">
      <a-card title="组织机构" :bordered="false">
        <a-tree show-line :tree-data="tree" :replaceFields="{ title: 'name', key: 'id' }" @select="onSelect">
          <a-icon slot="icon" type="carry-out" />
        </a-tree>
      </a-card>
    </a-col>
    <a-col :span="20" style="padding-left: 10px">
      <a-card title="机构管理" :bordered="false">
        <template slot="extra">
          <a-button icon="filter" type="primary" class="margin-right-5" @click="handleExpand">
            {{ !expand ? '查询' : '隐藏' }}
          </a-button>
          <a-button icon="plus" @click="$router.push('/sys-organization/office/add')">新增</a-button>
        </template>
        <a-form v-if="expand" layout="inline" onSubmit="" class="margin-bottom-10">
          <a-form-item label="机构代码"><a-input /></a-form-item>
          <a-form-item label="机构名称"> <a-input /> </a-form-item>
          <a-form-item>
            <a-button type="primary" htmlType="submit" class="margin-right-5">查询</a-button>
            <a-button>重置</a-button>
          </a-form-item>
        </a-form>
        <a-table :loading="loading" rowKey="id" :columns="columns" :data-source="data" bordered>
          <span slot="statu" slot-scope="text, record">
            <a-badge v-if="record.statu === 1" status="success" text="启用" />
            <a-badge v-else status="error" text="停用" />
          </span>
          <span class="action" slot="action">
            <a-tag color="green">编辑</a-tag>
            <a-tag color="red">删除</a-tag>
            <a-tag color="blue">新增</a-tag>
          </span>
        </a-table>
      </a-card>
    </a-col>
  </a-row>
</template>
<script>
import { ApiGetSysOfficeTree, ApiGetSysOfficeList } from '@/api/blade-sys'
import { ArrayTransformTree } from '@/utils/util'
import { searchMixin } from '@/store/app-mixin'
const columns = [
  {
    title: '机构名称',
    dataIndex: 'name'
  },
  {
    title: '机构全称',
    dataIndex: 'fullName'
  },
  {
    title: '排序号',
    align: 'center',
    dataIndex: 'sort'
  },
  {
    title: '机构类型',
    align: 'center',
    dataIndex: 'orgType'
  },
  {
    title: '更新时间',
    align: 'center',
    dataIndex: 'udapteTime'
  },
  {
    title: '备注信息',
    align: 'center',
    dataIndex: 'remark'
  },
  {
    title: '状态',
    align: 'center',
    dataIndex: 'statu',
    scopedSlots: { customRender: 'statu' }
  },
  {
    title: '操作',
    align: 'center',
    width: 180,
    scopedSlots: { customRender: 'action' }
  }
]
export default {
  mixins: [searchMixin],
  data () {
    return {
      tree: [],
      data: [],
      columns,
      loading: false
    }
  },
  created () {
    this.getTree()
    this.getList()
  },
  methods: {
    onSelect (selectedKeys, info) {
      console.log('selected', selectedKeys, info)
    },
    async getTree () {
      const { data } = await ApiGetSysOfficeTree()
      console.log(data)
      this.tree = ArrayTransformTree(data, 'pId', 'id')
    },
    async getList (payload) {
      this.loading = true
      const { data } = await ApiGetSysOfficeList(payload)
      this.data = data
      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped>
.sys-office-page {
  .action {
    display: flex;
    span {
      margin-right: 10px;
      cursor: pointer;
    }
    span:last-child {
      margin-right: 0;
    }
  }
}
</style>
