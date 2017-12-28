<template>
    <div id="setUser">
        <v-header></v-header>
        <div class="content-r">
            <el-table :data="usersList" style="width: 100%">
                <el-table-column prop="id" label="用户名" width="180">
                </el-table-column>
                <el-table-column label="用户类型">
                    <template slot-scope="scope">
                        <el-switch style="display: block" v-model="scope.row.userType" active-color="#13ce66" inactive-color="#ff4949" active-text="教师"
                            inactive-text="学生" active-value="1" inactive-value="2">
                        </el-switch>
                    </template>
                </el-table-column>
            </el-table>
        <div class="btn-group">
            <el-button type="success" @click="submit">提交修改</el-button>
            <el-button type="info" @click="goBack">取消修改</el-button>
        </div>
        </div>
    </div>
</template>
<script>
    require('./assets/css/index.css')
    import Vheader from "./components/Vheader.vue";
    export default{
        data(){
            return {
                usersList:[]
            }
        },
        components:{
            'v-header':Vheader
        },
        mounted(){

            var self = this
            $.ajax({
                url:'http://localhost:3000/api/getUserList',
                type:'post',
                success:function(res){
                    self.usersList = res.data
                }
            })
        },
        methods: {
            submit(){
                var usersList = JSON.stringify(this.usersList)
                $.ajax({
                    url:'http://localhost:3000/api/setUserList',
                    type:'post',
                    data:{
                        data: usersList
                    },
                    success:function(res){
                        alert(res.msg)
                        window.location.reload()
                    }
                })
            },
            goBack(){
                this.$router.go(-1)
            }
        }

    }
    
</script>