<template>
  <div id="app">
    <div id="nav">
      <span key="first" id="logo">
      <router-link to="/"><img id="dog" src="../public/images/logo.svg" height="72" width="62"><h1>아프지말개냥</h1></router-link>
      </span>
      <div id="menu">
        <h3>

        <span v-show ="this.$store.state.role==0">
        <router-link to="/login">Login</router-link> | </span>
        <span v-show = "this.$store.state.role==1">
        <button v-on:click= "logout"><b>Logout</b></button> |
        <button v-on:click= "mypage"><b>My Info</b></button> |
      <router-link to="/board">Board</router-link> |
      <router-link to="/mypet">My Pet</router-link> |
      <router-link to="/map">Booking</router-link>
        </span>
      <p></p>
        </h3>
      </div>
    </div>
    <router-view/>
  </div>
</template>


<script>


export default {
   data() {
    return {
      authenticated: 0,
    };
  },

  created(){
     this.$http.get('/info')
    .then((response) => {
      if(response.data.id!=null){
      this.$store.commit('trueRole');

      }else{
        
      this.$store.commit('falseRole');
      }
    });
      
    
  },
  compute(){
    console.log("setroororo"+ this.$store.state.role);
    console.log("너뭐야...__"+this.authenticated); 
  },
  methods: {
    logout(){
      this.$store.commit('falseRole');
      console.log("이제 false"+this.$store.state.role)
   this.$http.get('/logout')
    .then((response) => {
      console.log("ddddddsuccess");
      this.$router.replace({name: 'home'});
      
    })
    },
    
    mypage(){ // 정보 수정 페이지 

      this.$router.replace({name: 'mypagee'});
   },
  }
  
}
</script>


<style lang="scss">
#dog{
  padding: 30px 0px 0px 0px;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#menu{
  padding-right: 100px;
  text-align: right;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>



