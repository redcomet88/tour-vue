<template>
  <el-container class="container">
    <el-aside width="200px" class="aside" style="">
      <el-menu :default-active="activeIndex"
               background-color="#545c64"
               text-color="#fff"
               active-text-color="#ffd04b"
               class="el-menu-vertical">
        <el-menu-item index="/dashboard" @click="navigateTo('/dashboard')">
          <i class="el-icon-s-marketing"></i>
          数据驾驶舱</el-menu-item>
        <el-menu-item index="/tours" @click="navigateTo('/tours')">
          <i class="el-icon-s-promotion"></i>
          景点管理</el-menu-item>
        <el-menu-item index="/users" @click="navigateTo('/users')">
          <i class="el-icon-s-custom"></i>
          用户管理</el-menu-item>
        <el-menu-item index="/profile" @click="navigateTo('/profile')">
          <i class="el-icon-s-tools"></i>
          个人设置</el-menu-item>
        <!-- 其他菜单项 -->
      </el-menu>
    </el-aside>
    <el-container>
      <el-header class="header">
<!--        <div class="logo">My Admin</div>-->
        <div class="header-content">
          <div class="current-path">
            当前路径: {{ $route.path }}
          </div>

          <div class="user-info">
            <img :src="avatarUrl" alt="Avatar" class="avatar">
            <span class="username">{{ username }}</span>
            <el-button type="text" >退出</el-button>
          </div>
        </div>
      </el-header>

      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>

  </el-container>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: '/dashboard',
      username: '麦麦大数据', // 替换为实际用户名
      // avatarUrl: 'https://via.placeholder.com/40' // 替换为实际头像 URL
      avatarUrl: require("@/assets/avatar.png") // 也可以使用 require 语法引入图片
    };
  },
  mounted() {
    console.log('当前路径:', this.$route.path)
    this.activeIndex = this.$route.path
  },
  methods: {
    navigateTo(path) {
      console.log(this.activeIndex);
      if (this.$route.path !== path) {
        this.activeIndex = path;
        this.$router.push(path);
      }
    }
  }
};
</script>

<style scoped>
.container{
  height: 100vh;
  /*border: 1px solid #eee;*/
}

.aside{
  background-color: #545c64;;
}

.header {
  background-color: #ffffff;
  text-align: center;
  line-height: 60px;
  border-bottom: 1px solid #ebeef5;
  /*display: flex;*/
  /*justify-content: space-between;*/
  /*align-items: center;*/
  /*padding: 0 20px;*/
}


.el-menu-vertical{
  border-right: 0px ;
}

.main {
  padding: 20px;
}

.header-content {
  display: flex;
  /*justify-content: space-between;*/
  /*align-items: center;*/
  /*width: 100%;*/
}

.user-info {
  display: flex;
  align-items: center;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
}

.username {
  margin-right: 10px;
}

.current-path {
  margin-right: auto;
  /*padding-left: 20px;*/
}
</style>
