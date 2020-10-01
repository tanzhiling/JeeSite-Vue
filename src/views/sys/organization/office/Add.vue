<template>
  <a-form
    class="sys-office-add-page"
    layout="inline"
    :form="form"
    :labelCol="{ span: 6 }"
    :wrapperCol="{ span: 18 }"
    @submit="handleSubmit"
  >
    <a-card title="基本信息" :bordered="false">
      <a-row>
        <a-col :span="8">
          <a-form-item label="机构名称" :span="12">
            <a-input v-decorator="['officeName', { rules: [{ required: true, message: '必填项' }] }]" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="机构代码">
            <a-input v-decorator="['officeCode', { rules: [{ required: true, message: '必填项' }] }]" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="机构全称">
            <a-input v-decorator="['fullName', { rules: [{ required: true, message: '必填项' }] }]" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="排序号">
            <a-input v-decorator="['sort', { rules: [{ required: true, message: '必填项' }] }]" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="机构类型">
            <a-select v-decorator="['officeType', { rules: [{ required: true, message: '必填项' }] }]">
              <a-select-option value="1">省级公司</a-select-option>
              <a-select-option value="2">市级公司</a-select-option>
              <a-select-option value="3">部门</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
    </a-card>
    <a-card title="详细信息" :bordered="false">
      <a-row>
        <a-col :span="8">
          <a-form-item label="负责人" :span="12">
            <a-input />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="办公电话">
            <a-input />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="联系地址">
            <a-input />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="邮政编码">
            <a-input />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="电子邮箱">
            <a-input />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="备注信息" :labelCol="{ span: 2 }" :wrapperCol="{ span: 22 }">
            <a-textarea :rows="4" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-form-item :wrapperCol="{ offset: 2 }">
        <a-button type="primary" htmlType="submit" class="margin-right-5">保存</a-button>
        <a-button @click="$router.back()">关闭</a-button>
      </a-form-item>
    </a-card>
  </a-form>
</template>
<script>
export default {
  data () {
    return {
      form: this.$form.createForm(this)
    }
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log(values)
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.sys-office-add-page {
  .ant-form-item {
    display: flex;
    margin-bottom: 16px;
  }
}
</style>
