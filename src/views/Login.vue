<template>
  <div class="login">
    <div class="box">
      <div class="avatar">
        <img src="../assets/logo.png" alt="" />
      </div>
      <div class="form">
        <!-- 
          ref（是Vue的语法，不是ElementUI的）为标签引用属性，
          可以通过 this.$refs.xxx 获取，如果是自定义组件，则是组件实例，
          如果是原生标签（div、input），则是 dom 对象。
        -->
        <!-- model	表单数据对象 -->
        <!-- rules	表单验证规则 -->
        <el-form ref="loginForm" :model="form" :rules="rules">
          <!-- 每个 el-form-item 都是一个表单项 -->
          <!-- prop	表单域 model 中的字段，在使用 validate、resetFields 方法的情况下，该属性是必填的 -->
          <el-form-item prop="username">
            <el-input v-model="form.username" prefix-icon="el-icon-user-solid" maxlength="16" clearable></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <!-- el-input 属于ElementUI组件的自定义组件，不是原生的input标签，有没有该事件取决于该组件内部是否触发了该自定义事件 -->
            <el-input v-model="form.password" prefix-icon="el-icon-lock" show-password maxlength="16" @change="login"></el-input>
          </el-form-item>
          <el-form-item style="text-align: right;">
            <el-button type="primary" size="medium" @click="login">登录</el-button>
            <el-button type="info" size="medium" @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from 'axios';

export default {
  name: 'Login',
  data() {
    return {
      form: {
        username: '',
        password: '',
      },
      rules: {
        username: [
          // trigger 表示触发验证的动作：blur（失去焦点）、change（当值改变时），注意：可以同时配置两个
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 5, max: 16, message: '长度在 5 到 16 个字符', trigger: ['change', 'blur'] },
        ],
        password: [
          // { required: true, message: '请输入密码', trigger: 'blur' },
          // { min: 5, max: 16, message: '长度在 5 到 16 个字符', trigger: ['change', 'blur'] },
          {
            // 自定义验证函数，让验证规则更加灵活
            validator: (rule, value, cb) => {
              console.log(rule, value, cb);
              if (value === '') {
                cb(new Error('请输入密码'));
              } else if (value.length < 5 || value.length > 16) {
                cb(new Error('长度在 5 到 16 个字符'));
              } else if (value.includes('xxx')) {
                cb(new Error('密码不能包含xxx'));
              } else {
                // 调用此函数，如果不传参，则表示验证通过
                cb();
              }
            },
            trigger: ['change', 'blur'],
          },
        ],
      },
    };
  },
  methods: {
    login() {
      // 在发送登录请求之前，先要对表单数据进行校验
      // // 回调函数的写法
      // // validate 方法的该回调函数会在校验结束后被调用
      // // valid: 验证结果, boolean
      // // errFields: 错误字段, object
      // this.$refs.loginForm.validate((valid, errFields) => {
      //   // 如果没通过，则函数直接over
      //   if (!valid) return;

      //   // 获取到数据，发送登录请求
      // });
      // // /回调函数的写法

      // Promise写法（拿不到错误字段，只能拿到校验结果）
      this.$refs.loginForm
        .validate()
        .then((valid) => {
          // 通过了，获取数据，发送登录请求
          console.log('then...', valid);
          return this.$request.post('login', this.form);
        })
        .then((res) => {
          console.log(res, 'res');
          // 登录失败
          if (res.data.meta.status !== 200) {
            this.$message.error(res.data.meta.msg);
            return;
          }
          // 登录成功
          // 1. 把token存储到sessionStorage中
          // 2. 跳转到登录之后的页面（首页）
          this.$message.success('登录成功');
          sessionStorage.setItem('token', res.data.data.token);
          // 编程式导航
          this.$router.push('/home');
        })
        // catch在链式调用时，最好放在最后面
        .catch((valid, errFields) => {
          // 没通过
          console.log('catch...', valid, errFields);
        });
      // /Promise写法

      // // async/await写法（拿不到错误字段，只能拿到校验结果）
      // try {
      //   const result = await this.$refs.loginForm.validate();
      //   console.log(result, '通过了...');
      // } catch(err) {
      //   console.log(err, '没通过...');
      // }
      // // /async/await写法

      // OPTIONS 请求属于预检请求，当存在跨域并且属于复杂请求时，浏览器自动发送的
      // 简单请求（无公害，不会改变数据）：如果请求方法是： GET  POST  HEADE，并且请求请求头中只包涵了基本的请求（如：Content-Type、Accept、Accept-Type、...）
      // 复杂请求（会修改数据）：不是简单请求就是复杂请求
      // 为什么会有这个预检请求？
      // 因为我们跨域是浏览器的限制，服务端不存在跨域，请求是能发送出去的，如果存在跨域，按道理，服务端不应该做处理，
      // 所以浏览器会在真正的请求发出去之前会事先发送一个 OPTIONS 预检请求检查是否存在跨域（非法）
      // 如果存在跨域（非法），那么真正的请求不会发送，反之，才会发送真正的请求
    },
    reset() {
      // 在 el-form 这个表单组件上，有一个 resetFields 方法，可以对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
      // 如何获取到这个表单组件的 vm 实例对象？  可以通过 ref 属性
      this.$refs.loginForm.resetFields();
    },
  },
};
</script>

<style lang="less" scoped>
.login {
  height: 100%;
  background-color: #2b4b6b;

  .box {
    width: 450px;
    height: 300px;
    background-color: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 5px;

    .avatar {
      width: 150px;
      height: 150px;
      box-sizing: border-box;
      border: 1px solid #eee;
      border-radius: 50%;
      padding: 10px;
      box-shadow: 0 0 10px #ddd;
      position: relative;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #fff;

      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #eee;
      }
    }

    .form {
      padding: 20px 20px 0 20px;
      position: absolute;
      bottom: 0;
      width: 100%;
      box-sizing: border-box;
    }
  }
}
</style>
