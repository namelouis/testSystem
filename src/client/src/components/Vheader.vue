<template>
    <div id="nav">
        <div class="nav-icon">
            <img src="" alt="">
        </div>
        <div class="index-item" @click="toIndex">首页</div>
        <div class="index-item" @click="back">返回</div>
        <div class="index-item">首页</div>
        <div class="index-item">首页</div>
        <div class="index-item">首页</div>
        <div class="search">
            <input type="text">
        </div>
        <div>
            <div class="login">登录</div>
            <div class="register">注册</div>
        </div>
    </div>
</template>
<script>
    export default{
        methods:{
            back(){
                this.$router.go(-1)
            },
            toIndex(){
                this.$router.push('/index')
            }
        }
    }
</script>