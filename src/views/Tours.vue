<template>
  <div class="tours-container">
    <el-card class="box-card">
      <div slot="header" class="header">
        <span>旅游景点管理</span>
        <el-button type="primary" @click="handleAddTour">添加景点</el-button>
      </div>
      <el-table :data="tours" style="width: 100%">
        <el-table-column prop="name" label="景点名称" width="180"></el-table-column>
        <el-table-column prop="alias" label="别名" width="180"></el-table-column>
        <el-table-column prop="reviewCount" label="评论数" width="100"></el-table-column>
        <el-table-column prop="rating" label="评分" width="100"></el-table-column>
        <el-table-column prop="featuredReview" label="精选评论"></el-table-column>
        <el-table-column prop="country" label="国家" width="120"></el-table-column>
        <el-table-column prop="city" label="城市" width="120"></el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button @click="handleEditTour(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="handleDeleteTour(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog title="编辑景点" :visible.sync="dialogVisible">
      <el-form :model="form">
        <el-form-item label="景点名称" :label-width="formLabelWidth">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="别名" :label-width="formLabelWidth">
          <el-input v-model="form.alias"></el-input>
        </el-form-item>
        <el-form-item label="评论数" :label-width="formLabelWidth">
          <el-input v-model="form.reviewCount" type="number"></el-input>
        </el-form-item>
        <el-form-item label="评分" :label-width="formLabelWidth">
          <el-input v-model="form.rating" type="number"></el-input>
        </el-form-item>
        <el-form-item label="精选评论" :label-width="formLabelWidth">
          <el-input v-model="form.featuredReview"></el-input>
        </el-form-item>
        <el-form-item label="国家" :label-width="formLabelWidth">
          <el-input v-model="form.country"></el-input>
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
export default {
  data() {
    return {
      tours: [
        { id: 1, name: '东京迪士尼度假区', alias: 'Tokyo Disney Resort', reviewCount: 1500, rating: 4.8, featuredReview: '非常美丽的景点', country: '日本', city: '东京' },
        { id: 2, name: '东京塔', alias: 'Tokyo Tower', reviewCount: 2500, rating: 4.9, featuredReview: '历史悠久，气势恢宏', country: '日本', city: '东京' },
        { id: 3, name: '三鹰之森吉卜力美术馆', alias: 'Ghibli Museum', reviewCount: 1800, rating: 4.7, featuredReview: '象征自由的地标', country: '日本', city: '东京' }
      ],
      dialogVisible: false,
      form: {
        name: '',
        alias: '',
        reviewCount: 0,
        rating: 0,
        featuredReview: '',
        country: '',
        city: ''
      },
      formLabelWidth: '100px'
    };
  },
  methods: {
    handleAddTour() {
      this.dialogVisible = true;
      this.form = { name: '', alias: '', reviewCount: 0, rating: 0, featuredReview: '', country: '', city: '' };
    },
    handleEditTour(tour) {
      this.dialogVisible = true;
      this.form = { ...tour };
    },
    handleDeleteTour(tour) {
      this.tours = this.tours.filter(t => t.id !== tour.id);
    },
    handleSaveTour() {
      if (this.form.id) {
        const index = this.tours.findIndex(t => t.id === this.form.id);
        if (index !== -1) {
          this.$set(this.tours, index, { ...this.form });
        }
      } else {
        const newTour = { ...this.form, id: this.tours.length + 1 };
        this.tours.push(newTour);
      }
      this.dialogVisible = false;
    }
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
}

.dialog-footer {
  text-align: right;
}
</style>
