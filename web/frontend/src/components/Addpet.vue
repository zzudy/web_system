<template>
    <div class = "container">
        <label for="p_name"><h5>Pet Name</h5></label>
            <input type="text" v-model="p_name" placeholder="Enter pet name" name="p_name" required>
            <div class="space">
            </div>
            <div id="select">
            <b>sex</b> : 
        <input type="radio" class="sex" value="female" v-model="p_sex">
        <label for="female">female</label>
        <input type="radio" class="sex" value="male" v-model="p_sex">
        <label for="male">male</label>
          <div class="space">
            </div>
        <b>type</b> : 
        <input type="radio" class="type" value="dog" v-model="p_type">
        <label for="dog">dog</label>
        <input type="radio" class="type" value="cat" v-model="p_type">
        <label for="cat">cat</label>
         <div class="space">
            </div>
            </div>
        <label for="p_age"><h5>Pet age</h5></label>
            <input type="text" v-model="p_age" placeholder="Enter pet age" name="p_age" required>
            <div class="space">
            </div>
        <button type="button" v-on:click = "register"><b>Register pet</b></button>
    </div>
</template>

<script>
export default {
  data(){
    return {
        p_name:'',
        p_age:'',
        p_sex:'',
        p_type:'',
    }
  },
  methods: {
    register : function(){
      console.log(this.p_name);
      console.log(this.p_age);
      console.log(this.p_sex);
      console.log(this.p_type);
      this.$http.post('/mypet/addpet', 
      {p_name:this.p_name,p_sex:this.p_sex,p_type:this.p_type,p_age:this.p_age}).then(response => {
                console.warn(response)
                this.result = response.data
                this.no = response.data.no 
                this.$router.replace({name: 'mypet'});
                    
            }).catch((ex) => {
                console.warn("ERROR!!!!! : ",ex)
            })
    }
  },
    
}
</script>


<style scoped>
.container{
    display: inline-block;
    width: 40%;
    height: 50%;
    background-color:none;
    color: black;
    padding: 14px 20px 20px;
    margin: 70px 0px;
    border: 2px solid rgb(167, 77, 41);
    border-radius: 8px;
}
.container:after{
  
  content:"";
  position:absolute;
  top: 0;
  left: 0;
  margin: 0px 0px 60px 0px;
  width:100%;
  height: 100%;
  opacity: 0.5;
  z-index: -1;
  background-image: url("../../public/images/main_5.jpg")
}

#select{
  font-size:large;
}

input[type="radio"]+ label{
  margin: 0px 10px 0px 5px;
}

input[type=text] {
    width: 50%;
    padding: 12px 10px;
    margin: 8px 0px 0px 8px;
    display: inline-block;
    border: 2px solid grey;
    box-sizing: border-box;
    border-radius: 8px;
}

button:hover {
    opacity: 0.8;
    background-color:  rgb(167, 77, 41);
    color: white;
}

.space{
  padding: 20px 20px;
}


button {
   display: inline-block;
    width: 30%;
    background-color:none;
    color: black;
    padding: 14px 20px;
    margin: 8px 10px;
    border: 2px solid  rgb(167, 77, 41);
    border-radius: 8px;
    cursor: pointer;
}
</style>