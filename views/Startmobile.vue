<template>
  <div>
    <div class="startbg">
      <div class="starttxt"><a href="/mobileboot" alt="click to start"><p>&lt;&lt; click to start</p></a></div>
      <img src="@/assets/images/startmobile.jpg" class="startimg" usemap="#Map">
      <map name="Map">
     <!-- länk för att starta mobilen -->
  <area shape="rect" coords="0,130,50,230" alt="Start" href="/mobileboot">
</map>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Startmobile',
} 
</script>
<style scoped>
.startbg {
width: 100vw;
height: 100vh; 
}
.startbg p {
width:500px;
height:30px; 
position:absolute;
padding-left:40px; 
padding-top:150px;
font: small-caps bold 1.4rem  Helvetica Neue,Helvetica,Arial,sans-serif;
color: #FF0004;
}
.start img{
    width:100%;
}
</style>
