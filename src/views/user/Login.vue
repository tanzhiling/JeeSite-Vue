<template>
  <div class="login-page">
    <div class="container">
      <div class="container-left">Auth平台</div>
      <div class="container-right">
        <div class="title">登录</div>
        <a-form :form="form">
          <a-form-item>
            <a-input
              size="large"
              v-decorator="['username', { rules: [{ required: true, message: '请输入账号' }] }]"
              placeholder="登录账号"
            />
          </a-form-item>
          <a-form-item>
            <a-input
              type="password"
              size="large"
              v-decorator="['password', { rules: [{ required: true, message: '请输入密码' }] }]"
              placeholder="登录密码"
            />
          </a-form-item>
          <a-form-item>
            <a-checkbox>记住账号</a-checkbox>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" size="large" @click="check" block>登录</a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: this.$form.createForm(this)
    }
  },
  mounted () {
    this.form.setFieldsValue({ password: 'admin', username: 'admin' })
  },
  methods: {
    check () {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$store.dispatch({ type: 'user/login', payload: values })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login-page {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background: #e3e7ec;
  .container {
    width: 1000px;
    height: 540px;
    display: flex;

    &-left {
      position: relative;
      width: 500px;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 30px;
      font-weight: 700;
      color: #fff;
      background: linear-gradient(0deg, #1a4ec5 0%, #4d82f8 100%);
    }

    &-left::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      background: url('../../assets/images/login-left.png') no-repeat 0 0;
    }

    &-right {
      padding: 60px;
      width: 50%;
      box-sizing: border-box;
      background: #fff;
      .title {
        font-size: 30px;
        font-weight: 700;
        color: #666;
        margin-bottom: 40px;
      }
    }
  }
}
</style>
