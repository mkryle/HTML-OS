<template>
  <div>
    <div class="startbg">
      <div class="starttxt"><a href="/padboot" alt="click to start"><p>&lt;&lt; click to start</p></a></div>
      <img src="@/assets/images/startpad.jpg" class="startimg" usemap="#Map">
      <map name="Map">
        <!-- länk för att stata paddan -->
  <area shape="rect" coords="10,4,110,70" alt="Start" href="/padboot">
</map>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Startpad',
} 
</script>
<style scoped>
.startbg {
width:1000px; 
}
.startbg p {
width:500px;
height:30px; 
position:absolute;
padding-left: 220px; 
margin-top:  50px;
font: small-caps bold 3.4rem  Helvetica Neue,Helvetica,Arial,sans-serif;
color: #FF0004;
}
.startimg{
    width:500px;
    margin-left: 100px;
    margin-top: 50px;
}
</style>
