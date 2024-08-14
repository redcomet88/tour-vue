<template>
  <div class="tours-container">
      <el-card class="box-card">
        <div slot="header" class="header">
          <span class="header-title">旅游景点管理</span>
          <div class="header-controls">
            <el-input v-model="searchTitle" placeholder="输入标题进行搜索" class="search-input"></el-input>
            <el-button type="primary" @click="fetchData">搜索</el-button>
            <el-button type="success" @click="handleAddTour">添加景点</el-button>
          </div>
        </div>

        <el-table :data="tours" style="width: 100%">
          <el-table-column label="图片" width="120">
            <template slot-scope="scope">
              <el-image
                  :src="scope.row.img"
                  class="tour-image"
                  :alt="scope.row.title"
                  fit="cover"
                  lazy
              />
            </template>
          </el-table-column>
          <el-table-column prop="title" label="景点名称" min-width="180"></el-table-column>
          <el-table-column prop="title_en" label="别名" min-width="180"></el-table-column>
          <el-table-column prop="comments" label="评论数" min-width="100"></el-table-column>
          <el-table-column prop="score" label="评分" min-width="100"></el-table-column>
          <el-table-column prop="nation" label="国家" min-width="120"></el-table-column>
          <el-table-column prop="city" label="城市" min-width="120"></el-table-column>
          <el-table-column label="操作" min-width="180">
            <template slot-scope="scope">
              <el-button @click="handleEditTour(scope.row)" type="text" size="small">编辑</el-button>
              <el-button @click="handleDeleteTour(scope.row)" type="text" size="small">删除</el-button>
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
        <el-form-item label="景点图片地址" :label-width="formLabelWidth">
          <el-input v-model="form.img"></el-input>
        </el-form-item>
        <el-form-item label="景点名称" :label-width="formLabelWidth">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="别名" :label-width="formLabelWidth">
          <el-input v-model="form.title_en"></el-input>
        </el-form-item>
        <el-form-item label="评论数" :label-width="formLabelWidth">
          <el-input v-model="form.comments" type="number"></el-input>
        </el-form-item>
        <el-form-item label="评分" :label-width="formLabelWidth">
          <el-input v-model="form.score" type="number"></el-input>
        </el-form-item>
        <el-form-item label="精选评论" :label-width="formLabelWidth">
          <el-input v-model="form.select_comment"></el-input>
        </el-form-item>
        <el-form-item label="国家" :label-width="formLabelWidth">
          <el-input v-model="form.nation"></el-input>
        </el-form-item>
        <el-form-item label="城市" :label-width="formLabelWidth">
          <el-input v-model="form.city"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSaveTour">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {tours, addTour, updateTour, deleteTour} from '@/api/tour'
import { Message } from 'element-ui';

export default {
  data() {
    return {
      searchTitle: '',
      tours: [],
      // tours: [
      //   { id: 1, name: '东京迪士尼度假区', alias: 'Tokyo Disney Resort', reviewCount: 1500, rating: 4.8, featuredReview: '非常美丽的景点', country: '日本', city: '东京' },
      //   { id: 2, name: '东京塔', alias: 'Tokyo Tower', reviewCount: 2500, rating: 4.9, featuredReview: '历史悠久，气势恢宏', country: '日本', city: '东京' },
      //   { id: 3, name: '三鹰之森吉卜力美术馆', alias: 'Ghibli Museum', reviewCount: 1800, rating: 4.7, featuredReview: '象征自由的地标', country: '日本', city: '东京' }
      // ],
      dialogVisible: false,
      form: { },
      formLabelWidth: '100px',
      totalItems: 0,
      currentPage: 1,
      pageSize: 10,
      dialogTitle: '',
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
        tours(this.searchTitle, this.currentPage, this.pageSize).then(res => {
          // console.log(res.data.data.records);
          this.tours = res.data.data.records
          this.totalItems = res.data.data.total
        })
    },
    handleAddTour() {
      this.dialogTitle = '新增景点'
      this.dialogVisible = true;
      this.form = {
        img: '',
        title: '',
        title_en: '',
        comments: 0,
        score: 0,
        select_comment: '',
        nation: '',
        city: ''
      };
    },
    handleEditTour(tour) {
      this.dialogTitle = '编辑景点'
      this.dialogVisible = true;
      this.form = {...tour};
    },
    handleDeleteTour(tour) {
      deleteTour(tour.id).then(res=>{
        this.$message(res); // 使用封装的 $message 函数
      })
    },
    handleSaveTour() {
      if (this.form.id) {
        updateTour(this.form.id, this.form).then(res=>{
          // console.log(res.data.message)
          this.$message(res); // 使用封装的 $message 函数
        })
      } else {
        addTour(this.form).then(res=>{
          console.log(res.data.message)
          this.$message(res); // 使用封装的 $message 函数
        })
      }
      this.dialogVisible = false;
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
};
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
