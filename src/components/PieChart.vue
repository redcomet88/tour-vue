<template>
  <div>
    <v-chart :option="chartOptions" style="width: 100%; height: 400px;"></v-chart>
  </div>
</template>

<script>
import {getCityRank} from "@/api/tour";


export default {
  name: 'PieChart',
  data() {
    return {
      chartOptions: {
        title: {
          text: '日本景点城市分布'
        },
        tooltip: {},
        series: [{
          type: 'pie',
          selectedMode: 'single',    //注意这个必须有，否则设置selected无效
          data: [
            {name:'东京',value:104},
            {name:'大阪',value:81},
            {name:'京都',value:47},
            {name:'横滨',value:51},
            {name:'名古屋',value:62}],
          label: {
            normal: {
              position: 'outside', // 标签显示在饼图外部
              formatter: '{b}({d}%)' // 标签格式
            }
          },
        }]
      },
    };
  },
  mounted() {
    getCityRank().then(res => {
      // console.log(res.data);
      // 获取最大值对应的索引
      const maxIndex = res.data.data.findIndex(item => item.value === Math.max(...res.data.data.map(i => i.value)));

      // 选中最大值对应的扇区
      this.chartOptions.series[0].data = res.data.data
      this.chartOptions.series[0].data[maxIndex].selected = true;
      // console.log(this.chartOptions.series[0].data[maxIndex])
    })
  }
};
</script>

<style scoped>
/* 添加一些样式使图表看起来更好 */
</style>
