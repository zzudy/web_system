<template>
<div id="app">
<section class="banner-area" id="home">
        <div class="container">
            <div class="about-content col-lg-12">
                <h1 class="text-white" style="font-size:40px; color: white; line-height: 200px;">
                    Modify your Information
                </h1>
            </div>
        </div>
    </section>

    <div id="modify_form">
            <label for="pw"><b>Password</b></label>
            <input type="password" v-model="pw"  placeholder="Password length must be 6 to 12" required="">
            <br>
            <label for="pw2"><b>Password Confirm </b></label>
            <input type="password" v-model="pw2"  placeholder="Please password check" required="">
            <br>
            <label for="p_num"><b>User Phone number</b></label>
            <input type="text" v-model="p_num" placeholder="Enter p_num" maxlength="100" required="">
            <br>
            
            <label for="nickname"><b>User nickname</b></label>
            <input type="text" v-model="nickname" placeholder="Enter nickname" required="">
            <br>
            <label for="address"><b>User Address</b></label>
            <input type="text" v-model="address" placeholder="Enter address" maxlength="100" required="">
            <button v-on:click="post_code">우편번호 찾기</button>
            <br>

            <label for="email"><b>User Email</b></label>
            <input type="text" v-model="email" placeholder="Enter email" maxlength="100" required="">
            <br>
            <button type="submit" id="submit" v-on:click="submit_button">submit</button>
        </div>

</div>

</template>


 <script>
export default{
    data(){
        return {
            pw : '',
            pw2: '',
            nickname : '',
            address : '',
            p_num: '',
            email: ''
        }
    },
    created() {
      this.$http.get('/mypage')
    .then((response) => {
        this.p_num = response.data.p_num;
        this.nickname = response.data.nickname;
        this.email = response.data.email;
        this.address = response.data.address;
      
    });
        
    },
    methods: {
    submit_button: function(){ //post
       console.log(this.pw.length);
        if(this.pw != this.pw2 || this.pw.length <6 || this.pw.length>=12){
            alert("Please check password");
            this.pw ='';
            this.pw2 ='';
            }
        else if(!this.email.includes("@")){
            alert("Please check email");
            this.email ='';
            }
        else{ 
            this.$http.post('/mypage/modify', {pw : this.pw, nickname: this.nickname, address : this.address, email: this.email, p_num: this.p_num}
                ).then(response => {
                   if(response.data.success == true){
                    console.log("success"); 
                    this.$router.push({name: 'home'});
                    }  
                }).catch((ex) => {
                    console.warn("ERROR!!!!! : ",ex)
                })
            }
    },
        post_code: function(){
        const scope=this;

        new daum.Postcode({
            oncomplete: function(data) {
                // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.
                
                var addr = ''; // 주소 변수

                if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                    addr = data.roadAddress;
                } else { // 사용자가 지번 주소를 선택했을 경우(J)
                    addr = data.jibunAddress;
                }

                //주소 정보를 해당 필드에 넣는다.
                scope.address = addr;

                // 주소-좌표 변환 객체를 생성합니다
                var geocoder = new kakao.maps.services.Geocoder();

                // 주소로 좌표를 검색합니다
                geocoder.addressSearch(scope.address, function(result, status) {

                // 정상적으로 검색이 완료됐으면 
                if (status === kakao.maps.services.Status.OK) {

                    console.log(result[0].y)
                    console.log(result[0].x)
                } 
            }); 
            }
        }).open();


        

    }
}
}
</script>

<style scoped>
*{
    text-align: center;
}
.banner-area {
    background: url(../../public/images/call-bg.jpg) center;
    background-size: cover;
    width: 100%;
    height: 400px;
    line-height: 100px;
    margin:  0 auto;
  }
  #submit{
    background-color: gray;
    border-radius: 15px;
    margin-top: 20px;
    margin-bottom: 20px;
    width: 80px;
    height: 30x;
  }

   input{
      margin: 5px 0px 10px 5px;
      width: 200px;
       border-radius: 8px;
       border: 1px solid burlywood;
  }
</style>