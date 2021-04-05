<template>
<!-- lägg till id, ref & funktion för att kunna flytta div -->
  <div class="about" ref="moveMydiv" id="move-my-div-container" @mousedown="dragMyDiv">
 <div class="about-border">
          <!-- lägg till en stäng knapp med funktion för att "stänga div'en" -->
          <div class="exit-btn">   
            <a href="#" @click="hide()"><img src="@/assets/images/close.png"></a>
            </div>
          <center>
            <div class="title"><img src="@/assets/images/help.png"></div> Om den här datorn
          </center>
        </div>
        <div class="theText">
          <p class="inside-text">OS X <p class="inside-text blue">&lt;HTML&gt; <p class="inside-text">EDITION</p>
        </div>
       <div class="created">
                  <img src="@/assets/images/apple.png" width="50">
                  <p>Skapad av:</p><p>Marcus Kryle 2020</p>
       </div>
        <img class="me" src="@/assets/images/me.jpg">
        <div class="infotext">Skriven i "Vue.js"</div>
  </div>
</template>

<script>
export default {

  name: 'about',

   data() {
    return {
      // positioner för funktionen att kuna flytta en 'div'
      positions: {
        clientX: undefined,
        clientY: undefined,
        movementX: 0,
        movementY: 0
      }
    }
  },

   methods: {
    // eftersom detta är en child komponent så ber vi 'högkvarteret'
    // om att göm demma komponenten
   hide() {
      this.$emit('about-hide')
      return
    },
    // skaffa in positions för denna div'en
      dragMyDiv(event) {
      // men vill inte kunna flytta den i mobil eller tablet läge
      if (window.matchMedia('(min-width: 1000px)').matches) {
      event.preventDefault()
      // läs in musens position
      this.positions.clientX = event.clientX
      this.positions.clientY = event.clientY
      document.onmousemove = this.divDrag
      document.onmouseup = this.stopDivDrag
    }},
    // flytta denna div'en
    divDrag(event) {
      event.preventDefault()
      this.positions.movementX = this.positions.clientX - event.clientX
      this.positions.movementY = this.positions.clientY - event.clientY
      this.positions.clientX = event.clientX
      this.positions.clientY = event.clientY
      // sätter div'ens position utifån musens position
      this.$refs.moveMydiv.style.top = (this.$refs.moveMydiv.offsetTop - this.positions.movementY) + 'px'
      this.$refs.moveMydiv.style.left = (this.$refs.moveMydiv.offsetLeft - this.positions.movementX) + 'px'
    },
    // släpp denna div'en
    stopDivDrag() {
      document.onmouseup = null
      document.onmousemove = null
    },
    },
    
}
</script>

<style scoped>
.created img {
  position: relative;
  top: -10px;
  left: 60px;
}
.created p {
  position: relative;
  top: -80px;
  left: 120px;
}
.about {
   background: #E9E9E9;
    position: absolute;
    width: 310px;
    top: 170px;
    height: 170px;
    left: 450px;
    border-radius: 10px 10px 0px 0px;
    font: Helvetica Neue,Helvetica,Arial,sans-serif;
}
.about-border {
 background:#DEDEDE; 
 width:310px; 
 height:20px; 
 border-radius: 10px 10px 0px 0px;
}
.exit-btn {
  position:absolute; 
  left:4px; 
  padding-top:2px;
}
.exit-btn img {
  margin-right: -120px;
width: 18px;
height: 18px;
}
.title {
  position:absolute; 
  left:76px; 
  padding-top:1px;
}
.title img {
width: 18px;
height: 18px;
}
.inside-text {
font: bold 1.4rem  Helvetica Neue,Helvetica,Arial,sans-serif;
 display: inline;
}
.blue {
  color: #1120FF;
   display: inline;
}
.theText{
  padding: 24px;
  margin-top: -10px;
}
.me {
  position: relative;
  top: -126px;
    float: right;
   width:50px;
}
.infotext{
  position: relative;
  top: -67px;
   font: small-caps 0.8rem   Cambria,Georgia,serif; 
}
#move-my-div-container {
  position: absolute;
  z-index: 9;
}

@media (min-width: 320px) and (max-width: 374px) { 
.about {
   background: #E9E9E9;
    position: absolute;
    width: 266px;
    top: 0px;
    height: 471px;
    left: 0px;
    border-radius: 10px 10px 0px 0px;
    font: Helvetica Neue,Helvetica,Arial,sans-serif;
}
.about-border {
 background:#DEDEDE; 
 width:266px; 
 height:20px; 
 border-radius: 0px 0px 0px 0px;
}
.title {
  left: 52px; 
}
.exit-btn {
position:absolute; 
left:113px; 
top: 482px;
overflow: visible;
} 
.exit-btn img {
width: 39px;
height:39px;
}
.theText{
  padding: 10px;
  margin-top: 50px;
}
.created img {
  position: relative;
  width: 70px;
  top: 90px;
  left: 20px;
}
.created p {
  position: relative;
  top: 15px;
  left: 110px;
  font-size: 1rem;
}
.me {
  position: relative;
  top: 94px;
  float: right;
   width:70px;
}
.infotext{
  position: relative;
  top: 160px;
  padding: 10px;
   font: small-caps 1rem   Cambria,Georgia,serif; 
}
.inside-text {
font: bold 1.3rem  Helvetica Neue,Helvetica,Arial,sans-serif;
 display: inline;
}
}
@media (min-width: 375px) and (max-width: 424px)  { 

.about {
    height: 554px;
    background: #E9E9E9;
    position: absolute;
    width: 100%;
    top: 0px;
    left: 0px;
    border-radius: 10px 10px 0px 0px;
    font: Helvetica Neue,Helvetica,Arial,sans-serif;
}
.about-border {
 background:#DEDEDE; 
 width:100%; 
 height:20px; 
 border-radius: 0px 0px 0px 0px;
}
.title {
  left: 72px; 
}
.exit-btn {
position:absolute; 
left:130px; 
top: 566px;
overflow: visible;
} 
.exit-btn img {
width: 50px;
height:50px;
}
.theText{
  padding: 15px;
  margin-top: 50px;
}
.created img {
  position: relative;
  width: 70px;
  top: 100px;
  left: 40px;
}
.created p {
  position: relative;
  top: 15px;
  left: 130px;
  font-size: 1.2rem;
}
.me {
  position: relative;
  top: 145px;
  float: right;
   width:70px;
}
.infotext{
  position: relative;
  top: 220px;
  padding: 5px;
   font: small-caps 1.2rem   Cambria,Georgia,serif; 
}
.inside-text {
font: bold 1.4rem  Helvetica Neue,Helvetica,Arial,sans-serif;
 display: inline;
}
}
@media (min-width: 425px) and (max-width: 767px) { 

.about {
    height: 630px;
    background: #E9E9E9;
    position: absolute;
    width: 100%;
    top: 0px;
    left: 0px;
    border-radius: 10px 10px 0px 0px;
    font: Helvetica Neue,Helvetica,Arial,sans-serif;
}
.about-border {
 background:#DEDEDE; 
 width:100%; 
 height:20px; 
 border-radius: 0px 0px 0px 0px;
}

.title {
  left: 72px; 
}
.exit-btn {
position:absolute; 
left:151px; 
top: 646px;
overflow: visible;
} 
.exit-btn img {
width: 53px;
height:53px;
}
.theText{
  padding: 20px;
  margin-top: 50px;
}
.created img {
  position: relative;
  width: 70px;
  top: 100px;
  left: 60px;
}
.created p {
  position: relative;
  top: 15px;
  left: 160px;
  font-size: 1.2rem;
}
.me {
  position: relative;
  top: 209px;
  float: right;
   width:70px;
}
.infotext{
  position: relative;
  top: 280px;
  padding: 5px;
   font: small-caps 1.3rem   Cambria,Georgia,serif; 
}
.inside-text {
font: bold 1.5rem  Helvetica Neue,Helvetica,Arial,sans-serif;
 display: inline;
}
}
@media (min-width: 768px) and (max-width: 999px) {

.about {
   background: #E9E9E9;
    position: absolute;
       width: 100%;
    height: 584px;
    top: 0px;
    left: 0px;
    border-radius: 0px 0px 0px 0px;
    font: Helvetica Neue,Helvetica,Arial,sans-serif;
}
.about-border {
 background:#DEDEDE; 
 width: 782px;
 height:20px; 
 border-radius: 0px 0px 0px 0px;
}
.exit-btn {
position:fixed; 
left:843px; 
top:285px;
overflow: visible;
} 
.exit-btn img {
width: 40px;
height:40px;
}e
.title {
  position:absolute; 
  left:606px; 
  padding-top:1px;
}
.title img {
width: 18px;
height: 18px;
}
.inside-text {
font: bold 2.4rem  Helvetica Neue,Helvetica,Arial,sans-serif;
 display: inline;
}
.blue {
  color: #1120FF;
   display: inline;
}
.theText{
  padding: 70px;
  padding-left: 180px;
  margin-top: 10px;
}
.me {
  position: relative;
  top: -64px;
  float: right;
   width:70px;
}
.infotext{
  position: relative;
  top: -10px;
  padding: 10px;
   font: small-caps 1.8rem   Cambria,Georgia,serif; 
}
.created img {
  position: relative;
  width: 100px;
  top: -10px;
  left: 240px;
}
.created p {
  position: relative;
  top: -150px;
  left: 360px;
  font-size: 2rem;
}
}

</style>
