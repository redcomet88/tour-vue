<template>
  <div class="profile-settings">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>个人设置</span>
      </div>
      <el-form :model="form" label-width="100px" :rules="rules" ref="profileForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="真实姓名" prop="realname">
          <el-input v-model="form.realname" ></el-input>
        </el-form-item>
        <!-- 年龄输入框 -->
        <el-form-item label="年龄" >
          <el-input-number
              v-model="form.age"
              :min="0"
              :max="120"
              size="small"
          ></el-input-number>
        </el-form-item>
        <!-- 职业选择框 -->
        <el-form-item label="职业" >
          <el-select v-model="form.job" placeholder="请选择职业">
            <el-option label="学生" value="学生"></el-option>
            <el-option label="公务员" value="公务员"></el-option>
            <el-option label="律师" value="律师"></el-option>
            <el-option label="IT工程师" value="IT工程师"></el-option>
            <el-option label="外卖员" value="外卖员"></el-option>
            <el-option label="文员" value="文员"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="签名" prop="intro">
          <el-input type="textarea" v-model="form.intro"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="addr">
          <el-input v-model="form.addr"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import {get_one, updateUser} from "@/api/user";

export default {
  data() {
    return {
      form: {},
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        age: [
          { required: true, message: '请输入年龄', trigger: 'blur' }
        ],
        profession: [
          { required: true, message: '请输入职业', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { pattern: /^1[3456789]\d{9}$/, message: '手机号码格式不正确', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
        ]
      }
    };
  },
  mounted() {
    const user = JSON.parse(localStorage.getItem('user'));
    get_one(user.id).then(res=>{
      // console.log(res.data)
      this.form = res.data.data
    })
  },
  methods: {
    onSubmit() {
      this.$refs.profileForm.validate((valid) => {
        if (valid) {
          updateUser(this.form.id, this.form).then(res => {
            this.$message(res)
          })
        } else {
          return false;
        }
      });
    },
  }
};
</script>

<style scoped>
.profile-settings {
  padding: 20px;
}
</style>
