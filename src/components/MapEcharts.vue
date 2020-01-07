<template>
    <div id="map"></div>
</template>

<script>
import echarts from "echarts"
import "echarts/map/js/china"

export default {
    data() {
        return {
            resizeEcharts : null,
            toolTipData : [ 
                {name:"北京",value:[{name:"科技人才总数",value:95},{name:"理科",value:82}]},
                {name:"天津",value:[{name:"文科",value:22},{name:"理科",value:20}]},
                {name:"河北",value:[{name:"文科",value:60},{name:"理科",value:42}]},
                {name:"山西",value:[{name:"文科",value:40},{name:"理科",value:41}]},
                {name:"内蒙古",value:[{name:"文科",value:23},{name:"理科",value:24}]},
                {name:"辽宁",value:[{name:"文科",value:39},{name:"理科",value:28}]},
                {name:"吉林",value:[{name:"文科",value:41},{name:"理科",value:41}]},
                {name:"黑龙江",value:[{name:"文科",value:35},{name:"理科",value:31}]},
                {name:"上海",value:[{name:"文科",value:12},{name:"理科",value:12}]},
                {name:"江苏",value:[{name:"文科",value:47},{name:"理科",value:45}]},
                {name:"浙江",value:[{name:"文科",value:57},{name:"理科",value:57}]},
                {name:"安徽",value:[{name:"文科",value:57},{name:"理科",value:52}]},
                {name:"福建",value:[{name:"文科",value:59},{name:"理科",value:57}]},
                {name:"江西",value:[{name:"文科",value:49},{name:"理科",value:42}]},
                {name:"山东",value:[{name:"文科",value:67},{name:"理科",value:52}]},
                {name:"河南",value:[{name:"文科",value:69},{name:"理科",value:68}]},
                {name:"湖北",value:[{name:"文科",value:60},{name:"理科",value:56}]},
                {name:"湖南",value:[{name:"文科",value:62},{name:"理科",value:52}]},
                {name:"重庆",value:[{name:"文科",value:47},{name:"理科",value:44}]},
                {name:"四川",value:[{name:"文科",value:65},{name:"理科",value:60}]},
                {name:"贵州",value:[{name:"文科",value:32},{name:"理科",value:30}]},
                {name:"云南",value:[{name:"文科",value:42},{name:"理科",value:41}]},
                {name:"西藏",value:[{name:"文科",value:5},{name:"理科",value:4}]},
                {name:"陕西",value:[{name:"文科",value:38},{name:"理科",value:42}]},
                {name:"甘肃",value:[{name:"文科",value:28},{name:"理科",value:28}]},
                {name:"青海",value:[{name:"文科",value:5},{name:"理科",value:5}]},
                {name:"宁夏",value:[{name:"文科",value:10},{name:"理科",value:8}]},
                {name:"新疆",value:[{name:"文科",value:36},{name:"理科",value:31}]},
                {name:"广东",value:[{name:"文科",value:63},{name:"理科",value:60}]},
                {name:"广西",value:[{name:"文科",value:29},{name:"理科",value:30}]},
                {name:"海南",value:[{name:"文科",value:8},{name:"理科",value:6}]},
            ],
            flyGeo : 
            {
                '洛阳': [112.460299, 34.62677],
                '西安': [108.946466, 34.347269],
                '兰州': [103.84044, 36.067321],
                '乌鲁木齐': [87.62444, 43.830763],
                '包头': [109.846544, 40.662929],
                '西宁': [101.78443, 36.623393],
                '银川': [106.258602, 38.487834],
                '成都': [104.081534, 30.655822],
                '重庆': [106.558434, 29.568996],
                '拉萨': [91.120789, 29.65005],
                '昆明': [102.852448, 24.873998],
                '贵阳': [106.636577, 26.653325],
                '太原': [112.534919, 37.873219],
                '武汉': [114.311582, 30.598467],
                '长沙': [112.945473, 28.234889],
                '南昌': [115.864589, 28.689455],
                '合肥': [117.233443, 31.826578],
                '杭州': [120.215503, 30.253087],
                '广州': [113.271431, 23.135336],
                '北京': [116.413384, 39.910925],
                '天津': [117.209523, 39.093668]
            },
            flyVal : [
                [{name: '北京'}, {name: '洛阳', value: 100}],
                [{name: '北京'}, {name: '西安', value: 35}],
                [{name: '北京'}, {name: '兰州', value: 25}],
                [{name: '北京'}, {name: '乌鲁木齐', value: 55}],
                [{name: '北京'}, {name: '包头', value: 60}],
                [{name: '北京'}, {name: '西宁', value: 45}],
                [{name: '北京'}, {name: '银川', value: 35}],
                [{name: '北京'}, {name: '成都', value: 35}],
                [{name: '北京'}, {name: '重庆', value: 40}],
                [{name: '北京'}, {name: '拉萨', value: 45}],
                [{name: '北京'}, {name: '昆明', value: 50}],
                [{name: '北京'}, {name: '贵阳', value: 55}],
                [{name: '北京'}, {name: '太原', value: 60}],
                [{name: '北京'}, {name: '武汉', value: 65}],
                [{name: '北京'}, {name: '长沙', value: 70}],
                [{name: '北京'}, {name: '南昌', value: 75}],
                [{name: '北京'}, {name: '合肥', value: 80}],
                [{name: '北京'}, {name: '杭州', value: 85}],
                [{name: '北京'}, {name: '广州', value: 90}],
                [{name: '北京'}, {name: '北京', value: 95}],
                [{name: '北京'}, {name: '天津', value: 60}],
            ],
            originName :'北京',
        };
    },
    mounted() {
        this.echartsLoad();
        this.resizeEcharts = () =>{
            this.echarts.init(document.getElementById("map")).resize()
        }
        window.addEventListener('resize',this.resizeEcharts)
        
    },
     //移除事件监听，避免内存泄漏
    beforeDestroy() {
        window.removeEventListener('resize', this.resizeEcharts)
        this.resizeEcharts = null
    },
    methods: {
        echartsLoad(){
            let echarts = this.echarts.init(document.getElementById("map"));

            var toolTipData = this.toolTipData;
            var originName = this.originName;
            var flyGeo = this.flyGeo;
            //飞线数据
            var flyVal = this.flyVal;
            //数据转换，转换后格式：[{fromName:'cityName', toName:'cityName', coords:[[lng, lat], [lng, lat]]}, {...}]
            const convertFlyData = function(data) {
                let res = [];
                for(let i=0;i<data.length;i++) {
                    let dataItem = data[i];
                    let toCoord = flyGeo[dataItem[0].name];
                    let fromCoord = flyGeo[dataItem[1].name];
                    if(fromCoord && toCoord) {
                        res.push({
                            fromName: dataItem[1].name, 
                            toName: dataItem[0].name, 
                            coords: [fromCoord, toCoord]
                        });
                    }
                }
                return res;
            };
            //报表配置
            const flySeries = [];
            [[originName, flyVal]].forEach(function(item, i) {
                flySeries.push({   
                    name: item[0],
                    type: 'lines',
                    zlevel: 1,
                    symbol: ['none', 'none'],
                    symbolSize: 0,
                    effect: { //特效线配置
                        show: true,
                        period: 5, //特效动画时间，单位s
                        trailLength: 0.1, //特效尾迹的长度，从0到1
                        symbol: 'arrow',
                        symbolSize: 5
                    },
                    lineStyle: {
                        normal: {
                            color: '#f19000',
                            width: 1,
                            opacity: 0.6,
                            curveness: 0.2 //线的平滑度
                        }
                    },
                    data: convertFlyData(item[1])
                }, {
                    name: item[0],
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    zlevel: 2,
                    rippleEffect: { //涟漪特效
                        period: 5, //特效动画时长 
                        scale: 4, //波纹的最大缩放比例
                        brushType: 'stroke' //波纹的绘制方式：stroke | fill
                    },
                    label: {
                        normal: {
                            show: false,
                            position: 'right',
                            formatter: '{b}'
                        }
                    },
                    data: item[1].map(function(dataItem) {
                        return {
                            name: dataItem[1].name,
                            value: flyGeo[dataItem[1].name].concat([dataItem[1].value])
                        };
                    })
                }, { //与上层的点叠加
                    name: item[0],
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    zlevel: 3,
                    symbol: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAfCAYAAAAfrhY5AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDplYmY3NjZiYi1iZGVlLTI0NDktOGUxNy1jZDczYmUzYzRlZDQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTU3REMwOEJGM0U3MTFFOUEyQjU5QURFNzZEQzAxQTUiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTU3REMwOEFGM0U3MTFFOUEyQjU5QURFNzZEQzAxQTUiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NjFhNjBhMjEtYzAxMC1jODRhLTk0OTctYmM4ZWI3MDMyZDFkIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOmViZjc2NmJiLWJkZWUtMjQ0OS04ZTE3LWNkNzNiZTNjNGVkNCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PqqcHYsAAAMpSURBVHjaxFdLbIxRFP46M22jYqrTNop6RWhL0BGxoF00oYlN2QkWZSUkFoiV2NvZSBAkFiSEIBKxYCO1bPognq0UtaDttF5TfdDx3X/O387c3tvezkjmTL5k/v+/9557vvO45+YlSuAqRUSECMv/fCJE/CHGid/Ed2KQGHZZMM9BeSmxjFgAd/lJ9BKxTJXPI9YQxchcFBNdwoqz8jJiLRFE9vKXeEcMuCivEIv/tygGvsykXFlcrd5bFlDBVkmUiFsKiDGhdYj4TPywzE0Qb4l+k3K1WNRCtYrudcQiBwu/Eq8sEa9c0O7HQKryjZbgKic2S1q5ikq/tlQrtSB8nqq8VCzTRVm6JQs/twoTuihmYgF5qDQMmC9usMtObu4emnAatZYRUVlHF09fQPwZNgxYP2OqbSdbQxjFTXSgGQ14jL2GUUFZxxS4RYp2tYtV2kfl+zqj0mPMhv3YxoQsp0cHsBVXuY0CEnwcHxjtDbhhmPVMfJ0qPQGL1UuNio+iCiew21P8jYsdxh3vfYzpdh8tWElD1Bi39cI+7bpMLz0nSd8p7Jl8HsYIk2bKmtteDgOHUG9YL2JK34AUClNdT5cJr0iAKkfRR7qXMNjaaPtiFHrvPyEuZarUUid0KQhZgqpw2ptzTI9fpLeVnlYWd+II+VmIhzjIKnCJ3h5J22S65JuCMSRVR9/AuHHCZXRP/m/CNTygYrWBJ9iHl7Q9Wd/6DIrGTdUuILVZl/TSuIshdpfqqlPO9I8skZtwAT08t1djOb/W0eYELuLprOslZSxg+TCY9vSGh0UUNXjEWD7L5FKbKWOsrGBs+BYnKZ/AC22uaT3ZkFueX0cji0rUqaC+Jyc7WHoc83zQUvynDoUNJFYVlEac9/J5gHNUWI3y18XScga3cABXyEI3A1Onvd+g2GPDP1hqDT2aqsn1WXYzKphbiLj2Xp35nf7B0muYGJezNxtpNyiGNB1O53mFMBOco8UdettkO89n62SUC2rm0Mm8tlhs7WT8rqXKoYeLyIb8S0NcAjfjHi7n3WvO+/ac31hyflez3VKLUy4MQaF1LJNb6j8BBgB5Y+v0Tqs+gwAAAABJRU5ErkJggg==',
                    showAllSymbol: true,
                    symbolSize:25,
                    data: item[1].map(function(dataItem) {
                        return {
                            name: dataItem[1].name,
                            value: flyGeo[dataItem[1].name].concat([dataItem[1].value])
                        };
                    })
                });
            });

            //报表配置项
            echarts.setOption ({
                title: {
                    text: '数据来源',
                    x: 'center',
                    top: "20",
                    textStyle: {
                        color: '#31afff',
                        fontSize: 20,
                        fontWeight:500
                    }
                },
                tooltip: {
                    padding: 0,
                    enterable: true,
                    transitionDuration: 1,
                    textStyle: {
                        color: '#000',
                        decoration: 'none',
                    },
                    // position: function (point, params, dom, rect, size) {
                    //   return [point[0], point[1]];
                    // },
                    formatter: function(params) {
                        // console.log(params)
                        var tipHtml = '';
                        tipHtml = '<div style="width:280px;height:180px;background:rgba(22,80,158,0.8);border:1px solid rgba(7,166,255,0.7)">'
                        +'<div style="width:100%;height:40px;line-height:40px;border-bottom:2px solid rgba(7,166,255,0.7);padding:0 20px">'+'<i style="display:inline-block;width:8px;height:8px;background:#16d6ff;border-radius:40px;">'+'</i>'
                        +'<span style="margin-left:10px;color:#fff;font-size:16px;">'+params.name+'</span>'+'</div>'
                        +'<div style="padding:20px">'
                        +'<p style="color:#fff;font-size:12px;">'+'<i style="display:inline-block;width:10px;height:10px;background:#16d6ff;border-radius:40px;margin:0 8px">'+'</i>'
                        +'单位总数：'+'<span style="color:#11ee7d;margin:0 6px;">'+toolTipData.length+'</span>'+'个'+'</p>'
                        +'<p style="color:#fff;font-size:12px;">'+'<i style="display:inline-block;width:10px;height:10px;background:#16d6ff;border-radius:40px;margin:0 8px">'+'</i>'
                        +'总人数：'+'<span style="color:#f48225;margin:0 6px;">'+toolTipData.length+'</span>'+'个'+'</p>'
                        +'<p style="color:#fff;font-size:12px;">'+'<i style="display:inline-block;width:10px;height:10px;background:#16d6ff;border-radius:40px;margin:0 8px">'+'</i>'
                        +'总人数：'+'<span style="color:#f4e925;margin:0 6px;">'+toolTipData.length+'</span>'+'个'+'</p>'
                        +'<p style="color:#fff;font-size:12px;">'+'<i style="display:inline-block;width:10px;height:10px;background:#16d6ff;border-radius:40px;margin:0 8px">'+'</i>'
                        +'总人数：'+'<span style="color:#25f4f2;margin:0 6px;">'+toolTipData.length+'</span>'+'个'+'</p>'
                        +'</div>'+'</div>';
                        return tipHtml;
                    }
                    
                },
                geo: {
                    map: 'china',
                    roam: true, //开启鼠标缩放和漫游
                    zoom: 1, //地图缩放级别
                    selectedMode: false, //选中模式：single | multiple
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                    layoutCenter: ['50%', '50%'], //设置后left/right/top/bottom等属性无效
                    layoutSize: '110%', //保持地图宽高比
                    label: {
                        emphasis: {
                            show: true
                        }
                    },
                    itemStyle: {
                        normal: {
                            areaColor: 'transparent',
                            borderWidth: 1.1,
                            borderColor: '#8af7ff'
                        },
                        emphasis: {
                            areaColor: '#069'
                        }
                    }
                },
                series: flySeries
            });
        }
    }
};
</script>

<style scoped>

</style>
