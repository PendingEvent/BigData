<template>
  <div id="app">
      <!-- <div v-if="$route.meta.keepAlive"> -->
        <!-- <nav v-show="$router.name!='login'"></nav> -->
        <div class="login" v-show="$router.name!='login'">
            <div class="head">
            <div class="timer dj-flex" id="clock">{{ date}} - {{time}}</div>
            <div class="head-left"><img src="./assets/images/head-left.png" alt=""></div>
            <div class="header">{{ title }}</div>
            <div class="head-right"><img src="./assets/images/head-right.png" alt=""></div>
        </div>
        <div class="data-nav">
            <ul class="navs">
                <li v-for = "(item,index) of nav" :key = index>
                    <router-link tag="a" 
                    to="item.path" 
                    exact-active-class="cur"
                    >
                    {{item.pathName}}
                    </router-link>
                </li>
            </ul>
        </div>
        </div>
        
        <router-view/>
      <!-- </div> -->
      <!-- <router-view v-if="!$route.meta.keepAlive"></router-view> -->
  </div>
</template>

<script>
// import Nav from './components/Nav'
export default {
//   components:{Nav},
  name: 'App',
  data() {
        return {
            title: "2019剁手记录",
            date: '',
            time:'',
            nav:[
                {"path" : "/","pathName" : "党建概况"},
                {"path" : "/","pathName" : "党员发展"},
                {"path" : "/","pathName" : "组织画像"},
                {"path" : "/","pathName" : "支部活动"},
                {"path" : "/","pathName" : "教育学习"},
                {"path" : "/","pathName" : "党建月历"}
            ],
        };
    },
    created() {
      this.updateTime()
  },
    methods:{
        updateTime() {
            let _this = this;

            _this.date = new Date();

            _this.time = _this.zeroPadding(_this.date.getHours(), 2) + ':' + _this.zeroPadding(_this.date.getMinutes(), 2) + ':' + _this.zeroPadding(_this.date.getSeconds(), 2);

            _this.date = _this.zeroPadding(_this.date.getFullYear(), 4) + '-' + _this.zeroPadding(_this.date.getMonth()+1, 2) + '-' + _this.zeroPadding(_this.date.getDate(), 2);
        },
        zeroPadding(num, digit) {
            var zero = '';
            for(var i = 0; i < digit; i++) {
                zero += '0';
            }
            return (zero + num).slice(-digit);
        },
    },
    beforeDestroy() {
        if (this.timer) {
            clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
        }
    }
}
</script>

<style scoped>
.head {
    width: 100%;
    margin-top: 20px;
    display: table;
    position: relative;
}
/* 时间 */
.timer{
    position: absolute;
    left: 20px;
    top: 0;
}
.timer img{
    width: 8px;
    height: 14px;
}
#clock {
  font-family: 'Share Tech Mono', monospace;
  color: #ffffff;
  position: absolute;
  left: 0;
  top: 0;
  color: #daf6ff;
  text-shadow: 0 0 10px #0aafe6, 0 0 10px rgba(10, 175, 230, 0);
  font-size: 16px;
  padding: 0 5px;
  letter-spacing: .05em;
}
.header,.head-left,.head-right {
    display: table-cell;
    vertical-align: middle;
    height:60px;
}

.head-left,.head-right {
    width: 40%; 
    /* height:70px; */
}

.head-left img {
    width: 100%;
    height: 100%;
}

.head-right img {
    width: 100%;
    height: 100%;
}
.header{
    width: 20%;
    padding: 0 20px;
    color: #31afff;
    font-size:28px;
    font-weight: bold;
    letter-spacing:2px;
    background: url(./assets/images/head-bg.png) no-repeat;
    background-size: 100% 100%;
    text-align:center;
    white-space: nowrap;
}
.data-nav{
    padding:0 5%;
    margin: 2% 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.navs{
width: 100%;
display: flex;
justify-content: center;
}
.navs li{
width: 20%;
height:45px;
line-height:45px;
margin-right: 6%;
}
.navs li:last-of-type{
margin-right: 0;
}
.navs li a{
width: 100%;
height:45px;
color: #31afff;
font-size: 18px;
line-height: 45px;
text-align: center;
background: url(./assets/images/nav.png) no-repeat;
background-size: 100% 100%;
}
.navs li a:focus,.navs li a:hover{
color: #ffef00;
text-decoration:none; 
background: url(./assets/images/nav-cur.png) no-repeat;
background-size:  100% 100%;
}
.nav-left li:last-of-type{
    margin-right: 0;
}
.nav-right li:last-of-type{
    margin-right: 0;
}
.navs li .cur{
    color: #ffef00;;
    background: url(./assets/images/nav-cur.png) no-repeat;
    background-size:  100% 100%;
}
</style>
