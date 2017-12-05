<template>
    <div id="index">
        <v-header></v-header>
        <div class="select-list" >
            <div class="select-item" v-for="item in selectList">
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
                {title:'标题',content:'内容'},
                {title:'标题',content:'内容'},
                {title:'标题',content:'内容'},
                {title:'标题',content:'内容'},
                {title:'标题',content:'内容'},
                {title:'标题',content:'内容'},
                ],
            }
        },
        components:{
            'v-header':vheader
        },
        methods:{

        }
    }
</script>