<template>
<div class="pages">
     <div class="login-box">
        <div class="reg login" id="tabcontent_10">
            <form action="" method="post" name="form1" id="login_form">
                <dl>
                    <dt>
                        <span class="title">密码：</span>
                        <input class="reg_input" id="t_UserPass" name="password" type="password">
                    </dt>
                </dl>
                <div class="btn-box">
                    <button type="submit" class="btn ajaxlogin">登录</button>
                </div>
            </form>
        </div>
    </div>
</div>
   
    
</template>

<script>
export default {
    data() {
        return {

        };
    },
    created() {

    },
    mounted() {
        // document.querySelector("body").setAttribute("style","background:url(../assets/images/log-bg.jpg);background-size:100% 100%")
    },
    methods: {

    },
    beforeDestroy(){
        // document.querySelector('body').removeAttribute('style')
    }
};
</script>

<style scoped>
.pages{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background:url(../assets/images/log-bg.jpg);
    background-size:100% 100%;
}
.login-box {
    position: absolute;
    left: 50%;
    margin-left: -150px;
    top: 50%;
    margin-top: -70px;
    padding: 30px 30px 0;
    width: 300px;
    height: 150px;
    overflow: hidden;
    /* background: url(../assets/images/log-bg.jpg) no-repeat;
    background-size: 100% 100%; */
}
.reg {
    width: 100%;
}
.reg dl {
    font-size: 18px;
    color: #fff;
}
.reg dl dt {
    width: 100%;
    display: table;
    margin-top: -5px;
}
.reg_input {
    border-radius: 4px;
    height: 25px;
    background-color: #fff;
    border: 1px solid rgba(0,120,255,.4);
    border-radius: 8px;
    padding: 2px 5px;
}
.btn-box {
    width: 100%;
    text-align: center;
    margin-top: 30px;
    margin-left: -30px;
}
.btn {
    background: url(../assets/images/search_btn.png) no-repeat;
    background-size: 100% 100%;
    border: none;
    outline: none;
    padding: 5px 20px;
    font-size: 16px;
    letter-spacing: 3px;
    color: #fff;
    cursor: pointer;
}
</style>
