<template>
    <div class="zuzhi" 
    :id="echartsId">
    </div>
</template>

<script>
// 引入基本模板

export default {
    //props接受父组件传下来的数据，通过computed拼接每一个图表的id
    props:[
        "billClass",
        "idCode"
    ],
    data() {
        return {
            colors:["#EAEA26", "#906BF9", "#FE5656", "#01E17E", "#3DD1F9", "#FFAD05"],
            resizeEcharts:null
        };
    },
    computed:{
        echartsId(){
            return 'echarts' + this.idCode
        }
    },
    mounted() {
        this.echartLoad();
        //实现自适应
        this.resizeEcharts = ()=>{
            this.echarts.init(document.getElementById(this.echartsId)).resize(); //这里的myChart就是要自适应的图表容器Id
        }
        window.addEventListener('resize',this.resizeEcharts)
    },
    //移除事件监听，避免内存泄漏
    beforeDestroy() {
        window.removeEventListener('resize', this.resizeEcharts)
        this.resizeEcharts = null
    },
    methods: {
        echartLoad(){
            let echarts = this.echarts.init(document.getElementById(this.echartsId));
            echarts.setOption({
                color: this.colors,
                grid: {
                    left: -100,
                    top: 50,
                    bottom: 10,
                    right: 10,
                    containLabel: true
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{b} : {c} ({d}%)"
                },
                polar: {},
                angleAxis: {
                    interval: 2,
                    type: 'category',
                    data: [],
                    z: 10,
                    axisLine: {
                        show: false,
                        
                    },
                    axisLabel: {
                        interval: 0,
                        show: true,
                        color: "#0B4A6B",
                        margin: 8,
                        fontSize: 16
                    },
                },
                radiusAxis: {
                    show:false,
                    min: 60,
                    max: 120,
                    interval: 20,
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: "#0B3E5E",
                            width: 1,
                            type: "solid"
                        },
                    },
                    axisLabel: {
                        formatter: '{value} %',
                        show: false,
                        padding: [0, 0, 20, 0],
                        color: "#0B3E5E",
                        fontSize: 16
                    },
                    splitLine: {
                        lineStyle: {
                            color: "#0B3E5E",
                            width: 2,
                            type: "solid",
                        }
                    }
                },
                calculable: true,
                series: [{
                        name:'账单分类',
                        type: 'pie',
                        radius: ["15%", "30%"],
                        hoverAnimation: false,
                        labelLine: {
                            normal: {
                                show: false,
                                length: 25,
                                length2: 50
                            },
                            emphasis: {
                                show: false
                            }
                        },
                        data: [{
                            name: '',
                            value: 0,
                            itemStyle: {
                                normal: {
                                    color: "#0B4A6B"
                                }
                            }
                        }]
                    },{
                        stack: 'a',
                        type: 'pie',
                        radius: ['20%', '80%'],
                        roseType: 'area',
                        zlevel:10,
                        label: {
                            normal: {
                                show: true,
                                formatter: "{b}"+"{c}",
                                textStyle: {
                                    fontSize: 12,
                                },
                                position: 'outside'
                            },
                            emphasis: {
                                show: true
                            }
                        },
                        labelLine: {
                            normal: {
                                show: true,
                                length: 0,
                                length2: 15
                            },
                            emphasis: {
                                show: false
                            }
                        },
                        data: this.billClass
                    }, ]
            });
        }
    }

};
</script>

<style scoped>

</style>
