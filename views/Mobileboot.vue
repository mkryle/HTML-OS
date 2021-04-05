<template>
  <div class="boot">
    <div class="bootdesk">
     <img src="@/assets/images/load.gif" class="bootload"> 
    </div>
    <div>
      <img src="@/assets/images/iphone.jpg" class="bootbg">
    </div>
  </div>
</template>

<script>
export default {
  name: 'Boot',
  components: {
  },
// "loading" skärm i 3 sekunder för att imetera uppstart,
// då den läses in för fort, sen redirect till mobil OS'et.
// det här skapar mer "feeling" i produkten!
created() {
 setTimeout(() => {
this.$router.push('/mobile')
 },3000);
  }
}
</script>

<style scoped>
.bootdesk {
margin-top: 97px;
margin-left: 30px;
width:355px;
height:630px;
  position: absolute;
  background-image: url('~@/assets/images/bootbackmobile.jpg');
  background-size: cover;
  overflow: hidden;
}
.bootbg {
  width: 310px;
}
.bootload {
  width: 50px;
  padding-left: 120px;
  padding-top: 335px;
}
.boot {
  width:100%;
  
}
.bootbg {
   width: 100%;
}
@media (min-width: 320px) {
.bootdesk {
margin-top: 71px;
margin-left: 22px;
 width:260px;
  height:461px;
  background-image: url('~@/assets/images/bootbackmobile.jpg');
  background-size: cover;
  overflow: hidden;
}
.bootload {
  width: 40px;
  padding-left: 106px;
  padding-top: 280px;
}
}
@media (min-width: 375px) {
.bootdesk {
margin-top: 84px;
margin-left: 26px;
 width:307px;
height:544px;
position: absolute;
}
.bootload {
  width: 40px;
  padding-left: 128px;
  padding-top: 320px;
}
}
@media (min-width: 425px) {
.bootdesk {
margin-top: 96px;
margin-left: 30px;
width:350px;
height:620px;
  background-image: url('~@/assets/images/bootbackmobile.jpg');
  background-size: cover;
  overflow: hidden;
}
.bootload {
  width: 45px;
  padding-left: 146px;
  padding-top: 380px;
}
}
</style>
