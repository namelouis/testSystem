<template>
    <div>
        <div class="login-icon"></div>
        <div class="login-card bkgw">
            <div class="login-title">
                <span @click="changeType(1)" :class="{active:type=='1'}">登录</span>·<span @click="changeType(2)" :class="{active:type=='2'}">注册</span>
            </div>
            <div class="login-input" v-show="type=='1'">
                <input type="text" placeholder="请输入账号" v-model="loginId">
                <input type="text" placeholder="请输入密码" v-model="loginPwd">
            </div>
            <div class="login-input" v-show="type=='2'">
                <input type="text" placeholder="请输入账号" v-model="registerId">
                <input type="text" placeholder="请输入密码" v-model="registerPwd1">
                <input type="text" placeholder="请再次输入密码" v-model="registerPwd2">
            </div>
            <div class="login-btn" @click="login">
                {{btnMessage}}
            </div>
        </div>
    </div>
</template>
<script>
    require('./assets/css/index.css')
    export default{
        data(){
            return {
                type:'1',
                registerId:'',
                registerPwd1:'',
                registerPwd2:'',
                loginId:'',
                loginPwd:''
            }
        },
        computed:{
            btnMessage(){
                if(this.type=='1'){
                    return '登录'
                }else if(this.type =='2'){
                    return '注册'
                }
            },
            registerPwd(){
                if(this.registerPwd1==this.registerPwd2){
                    return this.registerPwd1
                }else{
                    return false
                }
            }
        },
        methods:{
            changeType(type){
                this.type = type
            },
            login(){
                var self = this
               if(this.type=='1'){
                 $.ajax({
                       url: 'http://localhost:3000/login',
                       data:{
                           loginId:self.loginId,
                           loginPwd:self.loginPwd
                       },
                       type: 'post',
                       success: function (res) {
                           if(res.status=='0000'){
                                alert(res.msg)
                                self.$router.push('/index')
                           }else if(res.status=='0002'){
                                alert(res.msg)
                                self.$router.push('/index')
                           }else{
                               alert(res.msg)
                           }
                       }
                   })
               }else if(this.type=='2'){
                if(self.registerPwd){
                    $.ajax({
                        url: 'http://localhost:3000/register',
                        data: {
                            registerId: self.registerId,
                            registerPwd: self.registerPwd1
                        },
                        type: 'post',
                        success: function (res) {
                            console.log(res)
                        }
                    })
                }else{
                    alert('两次输入密码不一致')
                }

               }
            }
        }
    }
</script>
<style>

</style>