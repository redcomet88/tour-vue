<template>
  <div>
    <v-chart :option="chartOptions" style="width: 100%; height: 400px;"></v-chart>
  </div>
</template>

<script>
import {getScoreRank} from "@/api/tour";
import * as echarts from "echarts";

export default {
  name: 'TouristSpotRating',
  data() {
    return {
      chartOptions: {
        title: {
          text: '旅游景点评分排名',
        },
        tooltip: {
          trigger: 'axis',
        },
        xAxis: {
          type: 'category',
          data: ['景点A', '景点B', '景点C', '景点D', '景点E'],
        },
        yAxis: {
          type: 'value',
          max: 10,
          min: 8,
        },
        series: [
          {
            name: '评分',
            type: 'bar',
            data: [8.5, 9.0, 7.5, 9.3, 8.0],
            label: {
              show: true,
              position: 'top'
            },
            itemStyle: {
              borderRadius: [5, 5, 0, 0], // 设置柱子的圆角
              color: (params) => {
                // 定义每根柱子的渐变色
                const colorList = [
                  new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 1, color: 'red' },
                    { offset: 0, color: 'pink' }
                  ]),
                  new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 1, color: 'orange' },
                    { offset: 0, color: 'lightyellow' }
                  ]),
                  new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 1, color: 'yellow' },
                    { offset: 0, color: 'lightyellow' }
                  ]),
                  new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 1, color: 'green' },
                    { offset: 0, color: 'lightgreen' }
                  ]),
                  new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 1, color: 'cyan' },
                    { offset: 0, color: 'lightcyan' }
                  ])
                ];
                return colorList[params.dataIndex];
              }
            },
          },
        ],
      },
    };
  },
  mounted() {
    getScoreRank().then(res => {
      // console.log(res.data.data);
      this.chartOptions.xAxis.data = res.data.data.map(item => item.title);
      this.chartOptions.series[0].data = res.data.data.map(item => item.score);
    })
  }
};
</script>

<style scoped>
/* 添加一些样式使图表看起来更好 */
</style>
