<template>
  <div>
    <div class="startbg">
      <div class="starttxt"><p>click to start >></p></div>
      <img src="@/assets/images/start.jpg" class="startimg" usemap="#Map"/>
      <map name="Map">
        <!-- länk för att starta desktop -->
      <area shape="circle" coords="876,555,17" href="/boot" alt="START">
      </map>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Start',
  // kolla användarens skärmstorlek och skicka om 
  // till mobil elelr padda version
created() {
if (window.matchMedia('(max-width: 767px)').matches) {
   
  this.$router.push('/startmobile')

} else if (window.matchMedia('(max-width: 999px)').matches) {

  this.$router.push('/startpad')
}
}

} 
</script>
<style scoped>
.startbg {
width:1000px;
}
.startbg p {
width:200px;
height:30px; 
position:absolute;
padding-left:670px; 
padding-top:522px;
font: small-caps bold 1.4rem  Helvetica Neue,Helvetica,Arial,sans-serif;
color: #FF0004;
}
.startimg{
  width:1000px;
}
</style>
