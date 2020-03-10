<template>
<div id="login_page">
        <div class="container">
            <label for="id"><h5><b>ID</b></h5></label>
            <p></p>
            <input type="text" v-model="id" placeholder="Enter ID" name="id" required>
            <p></p>
            <label for="pw"><h5><b>Password</b></h5></label>
            <p></p>
            <input type="password" v-model="pw" placeholder="Enter Password" name="pw" required>
            <p></p>
            <div id="space">
            </div>
            <button type="submit" v-on:click="login_button" id="login"><b>Login</b></button>
            <router-link :to = "{name:'sign_up_user'}"> <button type="button" class="sign_up"><b>Sign up</b></button></router-link>
            <p></p>
            <span class="psw">Forgot <router-link to="/find_pw">password</router-link>?</span>
    </div>
</div>

</template>


<script>

export default{
    data(){
        return {
            id: '',
            pw : ''
        }
    },
    methods: {
    login_button: function(){ //post
      console.log(this.id);
      console.log(this.pw);
      this.$http.post('/login', { id: this.id, pw : this.pw}
            ).then(response => {
                //console.warn(response)
                if(response.data.success == true){
                    this.$store.commit('trueRole');
                    this.$nextTick(()=>{
                    console.log("success"); 
                    this.$router.push({name: 'board'});
                    })
                    }
                else{
                    alert("Login error, Try agian");
                }
            }).catch((ex) => {
                console.warn("ERROR!!!!! : ",ex)
            });

    }
  }
}
</script>

<style scoped>
/* Bordered form */

form {
    border: 3px solid #f1f1f1;
}

* {
    text-align: center;
}

#login_page:after{
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

/* Full-width inputs */

input[type=text],
input[type=password] {
    width: 30%;
    padding: 12px 20px;
    margin: 5px 5px 5px 5px;
    display: inline-block;
    border: 2px solid grey;
    box-sizing: border-box;
    border-radius: 8px;
}


/* Set a style for all buttons */

button {
    width: 15%;
    background-color:none;
    color: black;
    padding: 14px 20px;
    margin: 8px 10px;
    border: 2px solid green;
    border-radius: 8px;
    cursor: pointer;
}


/* Add a hover effect for buttons */

button:hover {
    opacity: 0.8;
    background-color: red;
    color: white;
}

#login:hover {
    opacity: 0.8;
    background-color: green;
    color: white;
}

#space {
    margin: 50px 50px 25px 100px;
}


/* Extra style for the cancel button (red) */

.sign_up {
    width: 15%;
    border: 2px solid red;
}


/* Add padding to containers */


/* The "Forgot password" text */

span.psw {
    padding-top: 16px;
}


/* Change styles for span and cancel button on extra small screens */

@media screen and (max-width: 300px) {
    span.psw {
        display: block;
        float: none;
    }
    .cancelbtn {
        width: 100%;
    }
}

@media(max-width : 768px)/*768 보다 작으면*/
{
    button {
    width: 15%;
    background-color:none;
    color: black;
    padding: 0px 0px;
    margin: 0px 10px;
    border: 2px solid green;
    border-radius: 8px;
    cursor: pointer;
}

}
</style>