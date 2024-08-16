<template>
  <div class="users-container">
    <el-card class="box-card">
      <div slot="header" class="header">
        <span class="header-title">用户管理</span>
        <div class="header-controls">
          <el-input v-model="searchParam" placeholder="输入标题进行搜索" class="search-input"></el-input>
          <el-button type="primary" @click="fetchData">搜索</el-button>
          <el-button type="success" @click="handleAdd">添加用户</el-button>
        </div>
      </div>
      <el-table :data="records" style="width: 100%">
        <el-table-column prop="id" label="ID" width="50"></el-table-column>
        <el-table-column prop="username" label="用户名" min-width="180"></el-table-column>
        <el-table-column prop="realname" label="姓名" min-width="180"></el-table-column>
        <el-table-column prop="age" label="年龄" min-width="180"></el-table-column>
        <el-table-column prop="job" label="职业" min-width="180"></el-table-column>
        <el-table-column prop="phone" label="电话" min-width="180"></el-table-column>
        <el-table-column prop="addr" label="地址" min-width="180"></el-table-column>
<!--        <el-table-column prop="intro" label="签名" min-width="180"></el-table-column>-->
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pageSize"
          :total="totalItems"
          layout="total, sizes, prev, pager, next, jumper"
      />
    </el-card>

    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="form.realname"></el-input>
        </el-form-item>
        <!-- 年龄输入框 -->
        <el-form-item label="年龄" :label-width="formLabelWidth">
          <el-input-number
              v-model="form.age"
              :min="0"
              :max="120"
              size="small"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth">
          <el-input v-model="form.addr"></el-input>
        </el-form-item>
        <!-- 职业选择框 -->
        <el-form-item label="职业" :label-width="formLabelWidth">
          <el-select v-model="form.job" placeholder="请选择职业">
            <el-option label="学生" value="学生"></el-option>
            <el-option label="公务员" value="公务员"></el-option>
            <el-option label="律师" value="律师"></el-option>
            <el-option label="IT工程师" value="IT工程师"></el-option>
            <el-option label="外卖员" value="外卖员"></el-option>
            <el-option label="文员" value="文员"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="签名" :label-width="formLabelWidth">
          <el-input v-model="form.intro"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSave">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {users, addUser, updateUser, deleteUser} from "@/api/user";

export default {
  data() {
    return {
      dialogTitle: '',
      searchParam: '',
      records: [],
      dialogVisible: false,
      form: {},
      formLabelWidth: '80px',
      totalItems: 0,
      currentPage: 1,
      pageSize: 10,
    };
  },
  mounted() {
    this.currentPage = 1
    this.loadData()
  },
  methods: {
    fetchData() {
      this.loadData()
    },
    //加载数据
    loadData() {
      users(this.searchParam, this.currentPage, this.pageSize).then(res => {
        this.records = res.data.data.records
        this.totalItems = res.data.data.total
      })
    },
    handleAdd() {
      this.dialogTitle = '新增用户'
      this.dialogVisible = true;
      this.form = {};
    },
    handleEdit(record) {
      this.dialogTitle = '编辑用户'
      this.dialogVisible = true;
      this.form = {...record};
    },
    handleDelete(record) {
      deleteUser(record.id).then(res => {
        this.$message(res); // 使用封装的 $message 函数
      })
    },
    handleSave() {
      if (this.form.id) {
        updateUser(this.form.id, this.form).then(res => {
          // console.log(res.data.message)
          this.$message(res); // 使用封装的 $message 函数
        })
      } else {
        addUser(this.form).then(res => {
          console.log(res.data.message)
          this.$message(res); // 使用封装的 $message 函数
        })
      }
      this.dialogVisible = false;
      this.loadData()
    },
    handleCurrentChange(page) {
      this.currentPage = page;
      this.loadData();
    },
    handleSizeChange(size) {
      this.pageSize = size;
      this.loadData();
    },
  }
}
</script>

<style scoped>
.tours-container {
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
}

.dialog-footer {
  text-align: right;
}

.header-title {
  font-size: 18px;
  font-weight: bold;
}

.header-controls {
  display: flex;
  align-items: center;
}

.search-input {
  width: 300px;
  margin-right: 10px; /* Adjust spacing between input and buttons */
}
</style>
