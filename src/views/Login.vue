<template>
  <div id="login-page">
    <el-container>
      <el-header>
        <h1>🏝 旅游分析系统登录</h1>
      </el-header>
      <el-main class="main-content">
        <div class="login-container">
          <el-form :model="form" class="login-form" status-icon>
            <el-form-item
                prop="username"
                :rules="[{ required: true, message: '请输入用户名', trigger: 'blur' }]"
            >
              <el-input v-model="form.username" placeholder="用户名"></el-input>
            </el-form-item>

            <el-form-item
                prop="password"
                :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]"
            >
              <el-input
                  v-model="form.password"
                  placeholder="密码"
                  type="password"
              ></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="handleLogin">登录</el-button>
              <el-button @click="resetForm">重置</el-button>
            </el-form-item>
          </el-form>
          <div class="register-link">
            <span>还没有账号？</span>
            <el-button type="text" @click="goToRegister">去注册</el-button>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: '',
        password: ''
      }
    };
  },
  methods: {
    handleLogin() {
      console.log('登录', this.form);
      // 这里可以添加登录逻辑
    },
    resetForm() {
      this.form.username = '';
      this.form.password = '';
    },
    goToRegister() {
      // 这里可以添加跳转到注册页面的逻辑
      this.$router.push('/register'); // 假设你的路由设置了注册页面的路径
    }
  }
};
</script>

<style scoped>
#login-page {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
}

.login-container {
  width: 100%;
  max-width: 400px;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}


.main-content {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%; /* 使主内容区域占满剩余高度 */
}

.el-header {
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
}

.register-link {
  text-align: center;
  margin-top: 20px;
}

</style>
