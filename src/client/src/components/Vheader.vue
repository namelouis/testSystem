<template>
    <div id="nav">
        <div class="nav-icon">
            <img src="" alt="">
        </div>
        <div class="index-item" @click="toIndex">
            <i class="el-icon-menu"></i>
        </div>
        <div class="index-item" @click="back">
            <i class="el-icon-arrow-left"></i>            
        </div>
        <div class="index-item" @click="forward">
            <i class="el-icon-arrow-right"></i>            
        </div>
        <div class="index-item" @click="refresh">
            <i class="el-icon-refresh"></i>
        </div>
        <div class="index-item" @click="toLogin">登录</div>
        <div class="index-item" @click="toLogin">注册</div>
        <div class="index-item">
            <i class="el-icon-search"></i>
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
            },
            forward(){
                this.$router.go(1)
            },
            refresh(){
                window.location.reload()
            },
            toLogin(){
                this.$router.push('/login')
            }
        }
    }
</script>