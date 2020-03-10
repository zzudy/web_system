<template>

    <div class="mypet">
        <div v-for="item in pet_list" v-bind:key="item.idx">
            <p></p>
            <div>
                <button style="font-size : 16px">{{item.idx}}
                {{item.p_name}}
                </button>
                <hr />
            </div>
        </div>
       <router-link :to="{name:'addpet'}"><b>Addpet</b></router-link>
    </div>

</template>


<script>
export default {
  name: 'Mypet',
  data () {
    return {
      pet_list: [],
      selected:"",
    }
  },
   created () {
    this.$http.get('/mypet')
    .then((response) => {
      this.pet_list = response.data;
      
      console.log(this.pet_list[0]);
    })
  },
  computed:{
      
  }
}


</script>

<style scoped>
.mypet {
  float: left;
    height: 300px;
    width: 20%;
    border: 3px solid;
    margin: 120px 0px 30px 30px;
    padding: 40px;
}
@media (max-width: 768px) {
  .mypet {
    float:none;
    width: 80%;
    height: 10%;
}
}
</style>