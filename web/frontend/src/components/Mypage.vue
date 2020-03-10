<template>
<div>
  <div class="check_pw">
  <b>Please Enter Password</b>
  <br>
  <br>
  <input type="password" id="pw" v-model="pw" placeholder="Enter Password" name="pw" required>
  </div>
  <p></p>
  <button type="submit" v-on:click="check_button"><b>Check</b></button>
</div>
</template>



<script>

export default {
    name: 'Myinfo',
   data(){
        return {
            pw:''
        }
    },
    methods: {
    check_button: function(){ //post
      this.$http.post('/mypage', { pw : this.pw}
            ).then(response => {
                if(response.data.success == true){
                    console.log("success"); 
                    this.$router.replace({name: 'modify'});
                    }
                    else{
                        alert("password error");
                        this.pw='';
                    }
            }).catch((ex) => {
                console.warn("ERROR!!!!! : ",ex)
            });

    }
  }
}
</script>

<style scoped>

* {
    text-align: center;
}

.check_pw{
    display: inline-block;
width: 40%;
height: 50%;
    background-color:none;
    color: black;
    padding: 14px 0px 20px 0px;
    margin: 70px 0px;
    border: 2px solid burlywood;
    border-radius: 8px;
}
button {
   display: inline-block;
    width: 15%;
    background-color:none;
    color: black;
    padding: 14px 10px;
    border: 2px solid green;
    border-radius: 8px;
    cursor: pointer;
}
.space{
  padding: 20px 20px;
}

@media(max-width : 768px)/*768 보다 작으면*/
{
    button {
    width: 15%;
    background-color:none;
    color: black;
    padding: 14px 10px;
    border: 2px solid green;
    border-radius: 8px;
    cursor: pointer;
}

}

</style>