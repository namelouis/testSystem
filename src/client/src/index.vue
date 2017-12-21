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
                {title:'学生入口',content:'内容'},
                {title:'教师入口',content:'编写试题'},
                {title:'教师入口',content:'修改试题'},
                {title:'教师入口',content:'试题评分'},
                ],
            }
        },
        components:{
            'v-header':vheader
        },
        methods:{
            routePush(index){
                switch (index) {
                    case 0:
                        this.$router.push('/myTest')
                        break;
                    case 1:
                        this.$router.push('/selectTest')
                        break;
                    case 2:
                        this.$router.push('/selectTest')
                        break;
                    case 3:
                        this.$router.push('/upLoadTest')
                        break;
                    case 4:
                        this.$router.push('/selectTest')
                        break;
                    case 5:
                        this.$router.push('/selectTest')
                        break;                                        
                    default:
                        break;
                }
            }
        }
    }
</script>