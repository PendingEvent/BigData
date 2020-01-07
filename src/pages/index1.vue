<template>
    <el-main>
        <el-row>
            <el-col :span="6">
                <div class="map-left">
                    <ul class="gk-zuzhi-list" >
                        <li class="gk-zuzhi-item dj-flex">
                            <div class="dzz">
                                <p class="red">{{TotalConsumption}}</p>
                                <p class="num-title">总消费</p>
                            </div>
                            <ul class="zbs dj-flex">
                                <li v-for = "(item,key) in billClass" :key="key">
                                    <p class="zb-num yellow">{{item.value}}</p>
                                    <p class="zb-title" :title="item.name">{{item.name}}</p>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <bill-class :billClass = billClass></bill-class>
                </div>
            </el-col>
            <el-col :span="11">
                <map-echarts class="map-box map"></map-echarts>
            </el-col>
            <el-col :span="6">
                <line-charts
                 class="map-box map"
                :loading="timeLoading"
                :option="timeLineOption">
                </line-charts>
            </el-col>
        </el-row>
    </el-main>
</template>

<script>
import BillClass from '../components/BillClass'
import LineCharts from '../components/LineCharts'
import MapEcharts from '../components/MapEcharts'

export default {
    components:{
        BillClass,
        LineCharts,
        MapEcharts
    },
    name: 'index1',
    data() {
        return {
            colors:["#EAEA26", "#906BF9", "#FE5656", "#01E17E", "#3DD1F9", "#FFAD05"],
            timeLineOption: {},
            timeLoading: false, 
            "billClass":[
                {value: 10,name: '餐饮美食'},
                {value: 5,name: '服饰美容'},
                {value: 15,name: '生活用品'},
                {value: 25,name: '日常缴费'},
                {value: 20,name: '交通出行'},
                {value: 35,name: '休闲娱乐'}
            ]
        };
    },
    computed:{
        TotalConsumption () {
            let total = 0;
            for(let i in this.billClass){
                total += this.billClass[i].value
            }
            return total 
        }
    },
    created() {
        // console.log(this.billClass)
    },
    mounted() {
        this.setLineOption()
    },
    methods: {
        setLineOption() {
            this.timeLineOption = {
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
            }
        },
    }
};
</script>

<style scoped>
    .map-box{
        min-height: 450px;
        margin: 0 15px;
    }
    .map-right{
        min-height: 350px;
        padding: 15px;
    }
    .map img{
        width: 80%;
        height: 80%;
        margin: 60px auto 0;
    }
    .wrapper-content{
        padding: 0 20px 20px;
    }
    .gk-zuzhi-list{
        background-image: url(../assets/images/border.png) no-repeat;
        background-size: 100% 100%;
        padding: 15px;
    }
    .gk-zuzhi-item{
        width: 100%;
        align-items: center;
    }
    .zuzhi{
        height: 200px;
        margin-top: 15px;
    }
    .dzz{
        width: 40%;
        height: 90px;
        font-size: 14px;
        padding-top: 16px;
        background: url(../assets/images/dh02.png) no-repeat;
        background-size: 100% 100%;
    }
    .num-title::after{
        content: '';
        width: 14px;
        height: 15px;
        float: left;
        margin-left: 36px;
        margin-right: 4px;
        margin-top: 4px;
        background: url(../assets/images/dh012.png) no-repeat;
        background-size: contain;
    }
    .red{
        color: #ff5a37;
        margin-left: 8px;
    }
    .dzz .red{
        font-weight: 600;
        font-size: 20px;
        text-align: center;
    }
    .dzz .purple{
        color: #7370c9;
        margin-left: 8px;
        font-size: 22px;
        font-weight: 600;
    }
    .zbs{
        width: 60%;
        flex-wrap: wrap;
        justify-content: center;
    }
    .zbs li{
        width: 40%;
        height: 60px;
        text-align: center;
        margin-top:10px;
        margin-right: 10px;
    }
    .zbs li:nth-of-type(2n){
        margin-right: 0;
    }
    .zb-title{
        width: 100%;
        cursor: pointer;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        color: #0090ff;
    }
    .zb-num{

        font-size: 20px;
    }
    .map-right{
        padding-left: 15px;
    }
    .djhd-top{
        border-bottom: 1px dashed #22759f;
    }
    .djhd img{
        width: 35px;
        height: 35px;
        margin-right: 10px;
    }
    .part-build{
        width: 100%;   
        height: 60px;
        margin: 0px 0 5px;
    }
    .djhd-cont{ 
        text-align: center;
        align-items: center;
    }
    .yellow{
        color: #c5bc2b;
    }
    .green{
        font-size: 20px;
        color: #08f55d;
    }
    .djhd-title{
        font-size: 16px;
    }
    
    .djhd-top .djhd:nth-of-type(1) .djhd-cont .djhd-title{
        color: #ff5a37;
    }
    .djhd-top .djhd:nth-of-type(2) .djhd-cont .djhd-title{
        color: #c5bc2b;
    }
    .djhd-top .djhd:nth-of-type(3) .djhd-cont .djhd-title{
        color: #08f55d;
    }
    .djhd-charts .djhd .djhd-cont .djhd-title{
        color: #329dc7;
    }
    .blue{
        color: #329dc7;
        font-size: 20px;
    }
    .small{
        font-size: 14px;
    }
    .fk{
        margin-top: 15px;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px dashed #236f86;
    }
    .djhd-charts .djhd-cont{
        margin-top: 20px;
    }
    .fk-charts{
        width: 100%;
        height: 180px;
    }
    .dzzs-box{
        justify-content: space-between;
    }
    .bdqs{
        width: 49.5%;
    }
    .dzzs-title{
        font-size: 16px;
        line-height: 16px;
        color: #31afff;
        letter-spacing: 2px;
    }
    .dzzs-title::before{
        content: '';
        float: left;
        margin-right: 5px;
        text-align: center;
        width: 16px;
        height: 16px;
        background: url(../assets/images/title.png) no-repeat;
        background-size: 100% 100%;
    }
    .navbar-default .dzzs-title{
        margin-left: 20px;
        margin-top: -5px;
    }
    .last-box{
        width: 100%;
        justify-content: space-around;
        margin-top: 20px;
        margin-bottom: 15px;
    }
    .dfsj{
        width: 50%;
    }
    .dfsj-cont{
        width: 100%;
        height: 300px;
    }
    .dfsj-title{
        margin-left: 40px;
    }
    .dzzs{
        width: 100%;
        height: 330px;
    }

</style>
