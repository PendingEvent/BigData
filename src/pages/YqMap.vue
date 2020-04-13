<template>
    <!-- <div refs="mapbox" style="height:400px;width:600px"></div> -->
    <div ref="mapbox" style="height:400px;width:600px"></div>

</template>

<script>
import echarts from 'echarts'
import "echarts/map/js/china"
const option = {
    title : {
        text : "新型冠状病毒疫情地图",
        link:'https://voice.baidu.com/act/newpneumonia/newpneumonia/?from=osari_pc_3',
        color:'#fff'
    },
    series:[{
        name:"确诊人数",
        type:'map',//渲染一个地图
        map:'china',//渲染一个中国地图
        label:{
            show:true,
            color:"red",
            fontSize:10,
        },
        itemStyle:{
            // borderColor:"blue"  //边框颜色
        },
        zoom:1.2,
        emphasis:{
            //控制鼠标滑过之后的背景色和字体颜色
            label: {
                color:"yellow",
                fontSize:11,
            },
            itemStyle: {
                areaColor:"#83b6bf"
            }
        },
        data:[],//展示后台数据  键值对的数据格式
    }],
    visualMap:[{
        type:"piecewise",
        show:true,
        pieces:[
            {min:10000},
            // {min:10000,label: '67760（湖北省）', color: '#bfbc4'},
            // {value: 67760, label: '67760（自定义特殊颜色）', color: '#bfbc4'},
            {min:1000,max:9999},
            {min:100,max:999},
            {min:10,max:99},
            {min:1,max:9},
        ],
        align:"left",//默认left
        // orient:horizontal,
        showLabel:true,
        text: ['确诊病例'], // 文本，默认为数值文本
        calculable: true,
        // color:"#fff",
        // inRange:{
        //     // symbol:'circle'
        //     // color: ['lightskyblue','yellow', 'orangered']
        // }
    }],
    tooltip:{
        trigger:"item"
    },
}
export default {
    name:'YqMap',
    mounted() {

        this.getData();
        this.mychart = echarts.init(this.$refs.mapbox);
        this.mychart.setOption(option);
        // var myObj ={
        //     name:"极客时间",
        //     showThis : function(){
        //         console.log(this)
        //     }
        // }
        // myObj.showThis()
    },
    methods: {
        
        getData(){
            this.$jsonp("https://interface.sina.cn/news/wap/fymap2020_data.d.json?_=1580892522427",option).then(data => {
                console.log(data.data.list)
                let list = data.data.list.map(item =>({name:item.name,value:item.value}))
                option.series[0].data = list;
                this.mychart.setOption(option)
            }).catch(err => {
                console.log(err)
            })
        }
    }
};
</script>

<style scoped>
</style>

