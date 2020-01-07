<template>
  <div class="map" id="s-map">
    <div id="main" class="chartGauge" ></div>
  </div>
</template>

<script>
import echarts from 'echarts'
import 'echarts/map/js/china'

export default {
  components: {},
  data() {
    return {
      font: "12"
    };
  },
  props: {
    width: {
      type: String,
      default: "300px"
    },
    height: {
      type: String,
      default: "520px"
    }
  },
  watch: {},
  methods: {
    drawmap() {
   
    }
  },
  filters: {},
  computed: {},
  created() {},
  mounted() {
	 var data = 
			[
				{
					name:'沈阳',
					value:100
				},
				{
					name:'长春',
					value:101
				},
				{
					name:'哈尔滨',
					value:150
				},
				{
					name:'北京',
					value:100
				},
				{
					name:'天津',
					value:100
				},
				{
					name:'呼和浩特',
					value:151
				},
				{
					name:'银川',
					value:151
				},
				{
					name:'太原',
					value:151
				},
				{
					name:'石家庄',
					value:151
				},
				{
					name:'济南',
					value:151
				},
				{
					name:'郑州',
					value:151
				},
				{
					name:'西安',
					value:151
				},
				{
					name:'武汉',
					value:151
				},
				{
					name:'南京',
					value:151
				},
				{
					name:'合肥',
					value:151
				},
				{
					name:'上海',
					value:151
				},
				{
					name:'长沙',
					value:151
				},
				{
					name:'南昌',
					value:151
				},
				{
					name:'杭州',
					value:151
				},
				{
					name:'福州',
					value:151
				},
				{
					name:'广州',
					value:151
				},
				{
					name:'台北',
					value:151
				},
				{
					name:'海口',
					value:151
				},
				{
					name:'南宁',
					value:151
				},
				{
					name:'重庆',
					value:151
				},
				{
					name:'昆明',
					value:151
				},
				{
					name:'贵阳',
					value:151
				},
				{
					name:'成都',
					value:151
				},
				{
					name:'兰州',
					value:151
				},
				{
					name:'西宁',
					value:200
				},
				{
					name:'拉萨',
					value:151
				},
				{
					name:'乌鲁木齐',
					value:151
				},
				{
					name:'香港',
					value:151
				},
				{
					name:'澳门',
					value:151
				},
			];
			

			var geoCoordMap = {
				'沈阳': [123.429092,41.796768],
				'长春': [125.324501,43.886841],
				'哈尔滨': [126.642464,45.756966],
				'北京': [116.405289,39.904987],
				'天津': [117.190186,39.125595],
				'呼和浩特': [111.751990,40.841490],
				'银川': [106.232480,38.486440],
				'太原': [112.549248,37.857014],
				'石家庄': [114.502464,38.045475],
				'济南': [117.000923,36.675808],
				'郑州': [113.665413,34.757977],
				'西安': [108.948021,34.263161],
				'武汉': [114.298569,30.584354],
				'南京': [118.76741,32.041546],
				'合肥': [117.283043,31.861191],
				'上海': [121.472641,31.231707],
				'长沙': [112.982277,28.19409],
				'南昌': [115.892151,28.676493],
				'杭州': [120.15358,30.287458],
				'福州': [119.306236,26.075302],
				'广州': [113.28064,23.125177],
				'台北': [121.5200760,25.0307240],
				'海口': [110.199890,20.044220],
				'南宁': [108.320007,22.82402],
				'重庆': [106.504959,29.533155],
				'昆明': [102.71225,25.040609],
				'贵阳': [106.713478,26.578342],
				'成都': [104.065735,30.659462],
				'兰州': [103.834170,36.061380],
				'西宁': [101.777820,36.617290],
				'拉萨': [91.11450,29.644151],
				'乌鲁木齐': [87.616880,43.826630],
				'香港': [114.165460,22.275340],
				'澳门': [113.549130,22.198750]
			};

			let convertData = function(data) {
				var res = [];
				for (var i = 0; i < data.length; i++) {
					var geoCoord = geoCoordMap[data[i].name];
					// let dataItem = data[i];
					// let toCoord = flyGeo[dataItem[0].name];
					// let fromCoord = flyGeo[dataItem[1].name];
					
					if (geoCoord) {
						res.push({
							name: data[i].name,
							value: geoCoord.concat(data[i].value)
						});
					}
					
				}
				return res;
			};
			let option = {
				backgroundColor: '#fffffff',
				title: {
					left: 'center',
					textStyle: {
						color: '#090909'
					}
				},
				tooltip: {
					trigger: 'item'      //鼠标悬浮效果， 删除可以不显示悬浮框
				},
				legend: {
					orient: 'vertical',
					y: 'bottom',
					x: 'right',
					textStyle: {
						color: '#090909'
					}
				},
				geo: {
					map: 'china',
					zoom:1, //默认显示级别
					scaleLimit:{min:0,max:3},  //缩放级别
					label: {
						emphasis: {   //对应鼠标悬浮效果
							show: false
						}
					},
					roam: true,  // 是否允许拖拽。
					itemStyle: {
						normal: {
							areaColor: '#9b9b9b',
							borderColor: '#111'
						},
						emphasis: {
							areaColor: '#109dff'
						}
					}
				},
				series: [{
						type: 'scatter',
						coordinateSystem: 'geo',
						data: convertData(data),
						symbolSize: function(val) {
							return val[2] / 15;
						},
						label: {
							normal: {
								formatter: '{b}',
								position: 'right',
								show: false
							},
							emphasis: {
								show: true
							}
						},
						itemStyle: {
							normal: {
								color: '#9eff9e'
							}
						}
					},
					{
						name: 'Top 5',
						type: 'effectScatter',
						coordinateSystem: 'geo',
						data: convertData(data.sort(function(a, b) {
							return b.value - a.value;
						}).slice(0, 40)),
						symbolSize: function(val) {
							return val[2] / 15;
						},
						showEffectOn: 'render',
						rippleEffect: {
							brushType: 'stroke'
						},
						hoverAnimation: true,
						label: {
							normal: {
								formatter: '{b}',
								position: 'right',
								show: true
							}
						},
						itemStyle: {
							normal: {
								color: '#90ee90',
								shadowBlur: 10,
								shadowColor: '#0a99ff'
							}
						},
						zlevel: 1
					}
				]
			};
			var myChart = echarts.init(document.getElementById('main'));
			myChart.setOption(option)

  },
  destroyed() {}
};
</script>

<style  scoped>
	.chartGauge{
		width: 600px;
		height: 600px;
	}
</style>