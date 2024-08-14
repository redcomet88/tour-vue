<template>
  <div>
    <el-row :gutter="20">
      <!-- Top chart -->
      <el-col :span="24">
        <div class="chart" style="background-color: #f4eeee; height: 300px;">
          <line-chart/>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin-top: 20px;">
      <!-- Bottom left chart -->
      <el-col :span="12">
        <div class="chart" style="background-color: #f4eeee; height: 400px;">
          <bar-chart/>
        </div>
      </el-col>
      <!-- Bottom right chart -->
      <el-col :span="12">
        <div class="chart" style="background-color: #f4eeee; height: 400px;">
          <pie-chart/>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import LineChart from "@/components/LineChart";
import BarChart from "@/components/BarChart";
import PieChart from "@/components/PieChart";

export default {
  name: 'Dashboard',
  components: {
    LineChart, BarChart, PieChart
  },
  mounted() {

  }
};
</script>

<style scoped>
.chart {
  /*display: flex;*/
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
  border-radius: 10px;
}
</style>
