<template>
    <div>Transaction Page</div>
    <q-card class="q-mx-xl" style="width:400px">
        <div id="chart" >
            <apexchart type="polarArea" height="400" :options="chartOptions" :series="series" ></apexchart>
        </div>
    </q-card>

    <q-card class="q-mx-xl q-my-xl" style="width:400px">
        <apexchart type="radar" height="350" :options="chart2.chartOptions" :series="chart2.series"></apexchart>
    </q-card>

    <div id="chart">
        <apexchart type="bar" height="350" width="600" :options="chart3.chartOptions" :series="chart3.series"></apexchart>
    </div>
</template>


<script setup lang="ts">
    import { ref } from 'vue';
    const chartOptions = ref({
        chart: {
            //   width: 300,
              type: 'polarArea',
            },
            title: {
              text: 'Basic Pie Chart'
            },
            labels: ['Washer', 'Dryer', 'Water', 'Fuel', 'Exchange'],
            stroke: {
              opacity:1,
              colors: ['#fff']
            },
            fill: {
              opacity: 1
            },
            yaxis: {
              show: true
            },
            legend: {
                  position: 'bottom'
            },
            responsive: [{
              breakpoint: 480,
              options: {
                chart: {
                  width: 200
                },
                legend: {
                  position: 'bottom'
                }
              }
            }]
    })
    const series = ref([14, 23, 21, 17, 15])

    const chart2 = ref({
        series: [
            {
                name: 'RGH18',
                data: [80, 50, 30, 40, 100, 20],
            },
            {
                name: 'SkyView',
                data: [40, 30, 40, 80, 10, 100],
            }
        ],
        chartOptions: {
            chart: {
              height: 350,
              type: 'radar',
            },
            title: {
              text: 'Basic Radar Chart'
            },
            yaxis: {
              stepSize: 20
            },
            xaxis: {
              categories: ['Washer', 'Dryer', 'Water', 'Fuel', 'Exchange','Vending']
            }
        }
    })

    const chart3 = ref({
      series: [{
            name: 'Net Profit',
            data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
          }, {
            name: 'Revenue',
            data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
          }, {
            name: 'Free Cash Flow',
            data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
          }],
          chartOptions: {
            chart: {
              type: 'bar',
              height: 350
            },
            plotOptions: {
              bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded'
              },
            },
            dataLabels: {
              enabled: false
            },
            stroke: {
              show: true,
              width: 2,
              colors: ['transparent']
            },
            xaxis: {
              categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
            },
            yaxis: {
              title: {
                text: '$ (thousands)'
              }
            },
            fill: {
              opacity: 1
            },
            tooltip: {
              y: {
                formatter: function (val:any) {
                  return "$ " + val + " thousands"
                }
              }
            }
          },
    })
    
</script>