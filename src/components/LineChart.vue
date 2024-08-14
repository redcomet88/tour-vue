<template>
  <div>
    <v-chart :option="chartOptions" style="width: 100%; height: 300px;"></v-chart>
  </div>
</template>

<script>
import {getCommentsRank} from "@/api/tour"
import * as echarts from "echarts";

export default {
  name: 'TouristSpotRanking',
  data() {
    return {
      chartOptions: {
        title: {
          text: '旅游景点评论排名',
        },
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          data: ['评论数'],
        },
        xAxis: {
          type: 'category',
          data: ['景点A', '景点B', '景点C', '景点D', '景点E'],
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            name: '评论数',
            type: 'line',
            data: [820, 932, 901, 934, 1290],
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(80,215,237,0.99)'
                },
                {
                  offset: 1,
                  color: 'rgb(28,70,206)'
                }
              ])
            },
          },
        ],
      },
    };
  },
  mounted() {
    getCommentsRank().then(res => {
      console.log(res.data.data);
      this.chartOptions.xAxis.data = res.data.data.map(item => item.title);
      this.chartOptions.series[0].data = res.data.data.map(item => item.comments);
    })
  }
};
</script>

<style scoped>
/* 添加一些样式使图表看起来更好 */
</style>
