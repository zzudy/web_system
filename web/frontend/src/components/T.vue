<template>
  <div>
  <div id="head">
        검색 :
        <select v-model="selected" id="selected">
                <option value="title">제목</option>
                <option value="writer">작성자</option>
        </select> 
        <input type="text" v-model="text_name" placeholder="검색" />
         <span id="write">
    <router-link :to="{name:'register', params: {idx:myindex}}"> 
        <input type="button" value="글쓰기">
    </router-link>
  </span>
    </div> 
        
    <div id="text">
        <table id="table">
            <thead>
                <tr>
                    <th>No</th>
                    <th>제목</th>
                    <th>작성자</th>
                    <th class="col_2">작성시간</th>
                    <th class="col_2">조회수</th>
                 </tr>
            </thead>
                <tbody id="contents">
                    <tr id="only" v-on:click = "view(item.idx)" v-for="item in filtered" v-bind:key="item.idx">
                        <td>{{item.idx}}</td>
                        <td>{{item.title}}</td>
                        <td>{{item.writer}}</td>
                        <td class="col_1">{{item.time}}</td>
                        <td class="col_1">{{item.view}}</td>
                    </tr>
                </tbody>
            </table>
    </div>
    <hr>
            <div class="btn-cover">
            <button :disabled="pageNum === 0" @click="prevPage" class="page-btn">
                이전 
            </button>
            <span class="page-count">{{ pageNum + 1 }}/{{ pageCount }} 페이지</span>
            <button :disabled="pageNum >= pageCount - 1" @click="nextPage" class="page-btn">
                다음
            </button>
        </div>
  </div>
</template>


<script>
import eventBus from '../../eventBus.js'
export default {
  name: 'T',
  props: ['myindex'],
  data () {
    return {
        myindex:1,
        pageNum: 0,
        pageCount:0,
        text_length:0,
        text_name: '',
        array_text: '',
      texts: [],
      selected:"title",
    }
  },
   created () { //초기에는 무조건 첫번째 게시판의 1페이지
   let idx = 1;
   let p_id = 1;
   this.pageNum =0;
    this.$http.get(`/board/${idx}/${p_id}`)
    .then((response) => {
      this.texts = response.data.text;
     this.text_length =response.data.text_length;
      console.log("게시판 글 수는!!"+this.text_length);
        let page = Math.floor(this.text_length / 10);
        if (this.text_length  % 10 > 0) page += 1;
        this.pageCount = page;
      console.log("page____num"+this.pageNum);
    })
  },
  computed:{
      filtered(){
            let name = this.text_name;
            console.log(name);
            if (this.selected == "title") {
                return this.texts.filter(txt => {
                    return txt.title.includes(name);
                });
            } 
            else {
                return this.texts.filter(txt => {
                    return txt.title.includes(name);
                });
            }

            return this.texts;

        },
       
  },
  watch: {
    myindex: function(){
        console.log("sssssss"+this.myindex);
        let idx = this.myindex;
        this.pageNum =0;
        this.$http.get(`/board/${idx}/1`)
        .then((response) => {
            this.texts = response.data.text;
            this.text_length =response.data.text_length;
            let page = Math.floor(this.text_length / 10);
            if (this.text_length  % 10 > 0) page += 1;
            this.pageCount = page;
      console.log("게시판 글 수는!!"+this.text_length);
            })
      
  }
},
methods: {
    view(t_idx){
        let idx = this.myindex;
        console.log("글 보여줘");   
        this.$emit('show',1);
        console.log
        this.$emit('del',t_idx);
         this.$http.get(`/board/${idx}/text/${t_idx}`)
          .then((response) => {
              console.log("rererere"+ response.data.removable);
              this.$store.commit('setData', response.data);
              console.log("rererere"+ this.$store.state.data.removable);
       });
    },
    nextPage () {
      this.pageNum += 1;
      let idx = this.myindex;
       let p_id= this.pageNum+1;
       this.$http.get(`/board/${idx}/${p_id}`)
    .then((response) => {
      this.texts = response.data.text;
     this.text_length =response.data.text_length;
      console.log("next page"+p_id);
    })

    },
    prevPage () {
      this.pageNum -= 1;
      let idx = this.myindex;
       let p_id= this.pageNum+1;
       this.$http.get(`/board/${idx}/${p_id}`)
    .then((response) => {
      this.texts = response.data.text;
     this.text_length =response.data.text_length;
     
      console.log("prev page"+p_id);
    })
    }
},
}
</script>

<style scoped>
div {
    text-align: center;
    font-size: small;
}
button{
    padding: 5px 5px 5px 5px;
    margin: 5px 15px 15px 15px;
    border: 1px solid grey;
    border-radius: 8px;
}
#text td,
#text th {
    text-align: center;
    border-collapse: collapse;
    border-bottom: 1px solid #ddd;
    color: black;
    padding: 13px;
}

#text tr#only:hover {
    background-color: #f5f5f5;
}

#text thead tr {
    color: black;
}

#text {
    width: 100%;
    float: left;
    padding-left: 10%;
}

#table {
    width: 90%;
}

#write{
    float: right;
}
#head{
    padding-right: 70px;
}

button:hover {
    opacity: 0.8;
    background-color: grey;
    color: white;
}

input[type=text] {
    width: 30%;
    padding: 12px 10px;
    margin: 8px 0px 0px 8px;
    display: inline-block;
}

@media (max-width: 768px) {
    td.col_1{
        display:none;
        width:0;
        height:0;
        opacity:0;
        visibility: collapse;       
    } 
    th.col_2{
        display:none;
        width:0;
        height:0;
        opacity:0;
        visibility: collapse;       
    } 
}

</style>