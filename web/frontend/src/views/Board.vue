<template>
  <div id="board_page">
    <div class="board">
        <div v-for="item in boards" v-bind:key="item.idx">
            <p></p>
            <button @click= "get_texts(item.idx)" style="font-size : 16px">{{item.name}}</button>
                <hr />
        </div>
        
    </div>
   
      <T @show = "Detail" @del = "set" v-show = "!show" id="T" v-bind:myindex="myindex"></T>
      <D id="D" v-bind:myindex="myindex" v-show="show"></D>

      <button id="del" v-show="show&&this.$store.state.data.removable" type="submit" v-on:click="del"><b>삭제</b></button>
       <button id="back" v-show="show" type="submit" v-on:click="back"><b>뒤로 가기</b></button>
    
  </div>
</template>


<script>
import T from '@/components/T.vue'
import D from '@/components/Detail.vue'

export default {
  name: 'main',
  props: ['myindex'],
  components:{
      T
      ,D
  },
  data () {
    return {
      myindex: '1',
      board_length: '0',
      show:0,
      role:1,
      t_idx:'',
      boards: [{
      }],
      selected:"",
    }
  },
    created () {
      this.myindex =1;
    this.board_length = this.boards.length;
    this.$http.get('/board')
    .then((response) => {
      this.boards = response.data;
      
    });

  },
 methods: {
    get_texts: function(idx){
    this.myindex = idx;
    console.log("BB"+this.board_length);
    console.log("P"+this.myindex);
    },
    Detail: function(){
      console.log("Detail...");
      this.show = 1;
    },

    back: function(){
      console.log("T...");
      this.show = 0;
    },    
    del: function(){
      console.log("del");
      var idx = this.myindex;
      var t_id = this.t_idx;
      console.log("t_id"+t_id);
        this.$http.get(`/board/${idx}/remove/${t_id}`)
        .then((response) => {
          console.log("rrrrrrrrsuccess");            })


    },
    set: function(t_id){
      this.t_idx = t_id;
      console.log("ttttt"+t_id);
    }
  },

}



</script>
<style scoped>

#board_page{
    padding: 30px;
}

#board_page:after{
  content:"";
  position:absolute;
  top: 0;
  left: 0;
  margin: 0px 0px 60px 0px;
  width:100%;
  height: 155%;
  opacity: 0.5;
  z-index: -1;
  background-image: url("../../public/images/main_5.jpg")
}

.board {
   float: left;
    height: 400px;
    width: 20%;
    border: 3px solid;
    margin: auto;
    padding: 10px;
}
#T {
   float: left;
    height: 600px;
    width: 80%;
}

#D{
   float: left;
    height: 500px;
    width: 80%;
}

#back:hover {
    opacity: 0.8;
    background-color: rgb(167, 77, 41);
    color: white;
}

#back {
  float:right;
   display: inline-block;;
    width: 8%;
    background-color:none;
    color: black;
    padding: 5px 5px;
    margin: 8px 10px;
    border: 2px solid rgb(167, 77, 41);
    border-radius: 8px;
    cursor: pointer;
}

#del:hover {
    opacity: 0.8;
    background-color: red;
    color: white;
}

#del {
  float:right;
   display: inline-block;;
    width: 8%;
    background-color:none;
    color: black;
    padding: 5px 5px;
    margin: 8px 10px;
    border: 2px solid red;
    border-radius: 8px;
    cursor: pointer;
}
</style>