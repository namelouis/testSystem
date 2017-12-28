<template>
    <div id="index">
        <v-header></v-header>
        <div class="select-list" >
            <div class="select-item" v-for="(item,index) in selectList" @click="routePush(index)">
                <p>{{item.title}}</p>
                <p>{{item.content}}</p>
            </div>
        </div>
    </div>
</template>
<script>
    require('./assets/css/index.css')
    import vheader from './components/Vheader.vue'
    export default{
        data(){
            return {
                selectList:[
                {title:'学生入口',content:'查看我的试卷'},
                {title:'学生入口',content:'进行测试'},
                {title:'管理员入口',content:'修改用户权限'},
                {title:'教师入口',content:'编写试题'},
                {title:'教师入口',content:'修改试题'},
                {title:'教师入口',content:'试题评分'},
                ],
                userType:''
            }
        },
        components:{
            'v-header':vheader
        },
        mounted(){
            var cookieArr = document.cookie.split(';')
            for (var i = 0; i < cookieArr.length; i++) {
                var arr = cookieArr[i].split('=')
                if (arr[0].indexOf('userType') > -1) {
                    this.userType = arr[1]
                }
            }

        },
        methods:{
            routePush(index){
                switch (index) {
                    case 0:
                        if(this.userType=='2'){
                            this.$router.push('/myTest')
                        }else{
                            alert('您没有权限')
                        }
                        break;
                    case 1:
                        if (this.userType == '2') {
                            this.$router.push('/selectTest')
                        } else {
                            alert('您没有权限')
                        }
                        break;
                    case 2:
                        if (this.userType == '0') {
                            this.$router.push('/setUser')
                        } else {
                            alert('您没有权限')
                        }
                        break;
                    case 3:
                        if (this.userType == '1') {
                            this.$router.push('/upLoadTest')
                        } else {
                            alert('您没有权限')
                        }
                        break;
                    case 4:
                        if (this.userType == '1') {
                            this.$router.push('/selectTest')
                        } else {
                            alert('您没有权限')
                        }
                        break;
                    case 5:
                        if (this.userType == '1') {
                            this.$router.push('/selectTest')
                        } else {
                            alert('您没有权限')
                        }                                                            
                    default:
                        break;
                }
            }
        }
    }
</script>