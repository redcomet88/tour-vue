<template>
  <div class="users-container">
    <el-card class="box-card">
      <div slot="header" class="header">
        <span>用户管理</span>
        <el-button style="float: right; " type="primary" @click="handleAddUser">添加用户</el-button>
      </div>
      <el-table :data="users" style="width: 100%">
        <el-table-column prop="id" label="ID" width="50"></el-table-column>
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button @click="handleEditUser(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="handleDeleteUser(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog title="添加用户" :visible.sync="dialogVisible">
      <el-form :model="form">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSaveUser">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [
        { id: 1, name: '张三', email: 'zhangsan@example.com' },
        { id: 2, name: '李四', email: 'lisi@example.com' },
        { id: 3, name: '王五', email: 'wangwu@example.com' }
      ],
      dialogVisible: false,
      form: {
        name: '',
        email: ''
      },
      formLabelWidth: '80px'
    };
  },
  methods: {
    handleAddUser() {
      this.dialogVisible = true;
      this.form = { name: '', email: '' };
    },
    handleEditUser(user) {
      this.dialogVisible = true;
      this.form = { ...user };
    },
    handleDeleteUser(user) {
      this.users = this.users.filter(u => u.id !== user.id);
    },
    handleSaveUser() {
      if (this.form.id) {
        // Edit existing user
        const index = this.users.findIndex(u => u.id === this.form.id);
        if (index !== -1) {
          this.$set(this.users, index, { ...this.form });
        }
      } else {
        // Add new user
        const newUser = { ...this.form, id: this.users.length + 1 };
        this.users.push(newUser);
      }
      this.dialogVisible = false;
    }
  }
};
</script>

<style scoped>
.users-container {
  padding: 20px;
}

.header{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
