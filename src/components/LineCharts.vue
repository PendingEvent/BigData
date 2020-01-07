<template>
    <div
        :id="timeLine"
        :style="{height:height,width:width}">
    </div>
</template>

<script>

export default {
    props:{
        timeLine: { // 折线图图表id
            type: String,
            default() {
                // return 'line'
                return 'pie'
            }
        },
        height: { // 折线图高
            type:String,
            default() {
                return '100%'
            }
        },
        width: { // 折线图宽
            type: String,
            default() {
                return '100%'
            }
        },
        option: { // 折线图配置
            type: Object,
            required: true // 数据
        },
        loading: { // 图形加载
            type: Boolean,
            default() {
                return false
            }
        },
        enabledClick: { // 折线图是否配置点击事件
            type: Boolean,
            default: false
        },
    },
    data() {
        return {
            line: null,
            empty: false,
        };
    },
    computed:{
        lineOption() {
            return this.option.series
        },
        pieToolInfoStatus() {
            let arr = Object.keys(this.toolInfo)
            if (arr.length > 0) {
                return true
            }
            return false
        },
    },
    watch:{
      lineOption() {
            this.option.series.length === 0 ? this.empty = true : (this.option.series[0].data.length === 0 ? this.empty = true : this.empty = false)
            if (this.empty) {
                this.line.clear()
                this.option.yAxis.data = []
                this.option.xAxis.data = []
                this.line.setOption(this.option)
            } else {
                this.drawLine()
            }
        },  
    },
    mounted() {
        if (this.line === null) {
            this.line = this.echarts.init(document.getElementById(this.timeLine), null,)
        }
        /**
         * 设置折线图点击事件
         */
        if (this.enabledClick) {
            this.line.getZr().on('click', (params) => {
                let pointInPixel = [params.offsetX, params.offsetY]
                if (this.line.containPixel('grid', pointInPixel)) {
                    let pointInGrid = this.line.convertFromPixel({ seriesIndex: 0 }, pointInPixel)
                    let xIndex = pointInGrid[[0]]
                    let op = this.line.getOption()
                    let xValue = op.xAxis[0].data[xIndex]
                    this.$emit('onDetail', xValue, op.series[1].data[xIndex].groupTime)
                }
            })
        }
        /**
         * 设置图例最少一个选中
         */
        this.line.on('legendselectchanged', params => {
            let legendObj = params.selected
            let selectedNum = 0
            for (const key in legendObj) {
                if (legendObj.hasOwnProperty(key)) {
                    const element = legendObj[key]
                    if (element) {
                        selectedNum += 1
                    }
                }
            }
            if (selectedNum === 0) {
                legendObj[params.name] = true
                this.option.legend.selected = legendObj
                this.line.setOption(this.option)
            }
        })
        //实现自适应
        this.resizeEcharts = ()=>{
            this.echarts.init(document.getElementById(this.timeLine)).resize(); //这里的myChart就是要自适应的图表容器Id
        }
        window.addEventListener('resize',this.resizeEcharts)
    },
    beforeDestroy() {
        if (this.line !== null && this.line !== '' && !(typeof this.line === 'undefined')) {
            this.line.clear()
        }
    },
    methods: {
        /**
         * 折线图
         */
        drawLine: function() {
            if (this.line === null && this.line !== '' && !(typeof this.line === 'undefined')) {
                this.line = this.echarts.init(document.getElementById(this.timeLine), null, this.opts)
            }
            this.line.setOption(this.option)
        },
    }
};
</script>

<style scoped>

</style>

