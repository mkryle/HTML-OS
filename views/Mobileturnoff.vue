<template>
  <div class="boot">
    <div class="bootdesk">
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
// svart skärm 1 sekund för att imetera avstängning,
// sen redirect till avstängd apparat
created() {
 setTimeout(() => {
this.$router.push('/startmobile')
 },1000);
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
  background: black;
  overflow: hidden;
}
.bootbg {
  width: 310px;
}
.bootload {
  width: 120px;
  padding-left: 250px;
  padding-top: 650px;
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
  background: black;
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
}
.bootload {
  width: 45px;
  padding-left: 146px;
  padding-top: 380px;
}
}
</style>
