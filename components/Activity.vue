<template>
<!-- lägg till id, ref & funktion för att kunna flytta div -->
  <div class="activity" ref="moveMydiv" id="move-my-div-container" @mousedown="dragMyDiv">
    <div class="activity-border">
          <!-- lägg till en stäng knapp med funktion för att "stänga div'en" -->
          <div class="exit-btn">
             <a href="#" @click="hide()"><img src="@/assets/images/close.png"></a>
          </div>
          <center>
            <div class="title"><img src="@/assets/images/activity.png"></div>Aktivitetskontroll
          </center>
        </div>
        <!-- lägg in backend status -->
        <p class="backend">HTML OS Backend status: <p class="status">{{backendON}} </p>
      <p class="info">Du är ansluten till: <a href="http://osx.kryle.se/" target="_blank">http://osx.kryle.se/</a>,</p>
         <!-- lägg in klientens ip -->
         <p class="info">ifrån ip-nummer:   {{theConnectedIP.ip}} </p>
            <!-- lägg in klientens OS -->
            <p class="info">Ditt operativsystem: {{theConnectedOS}}</p>
  </div>
</template>

<script>
export default {

  name: 'activity',

 created() {
    //gör en fetch ipify för den anslutna kientens ip
    fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(result => {
      this.theConnectedIP = result
      }) 

      //kollar vilket OS den anslutna kliented surfar med
      let WhatOS = "Okänt OS"
            if (navigator.appVersion.indexOf("Win")!=-1) WhatOS="Windows"
            if (navigator.appVersion.indexOf("Mac")!=-1) WhatOS="MacOS"
            if (navigator.appVersion.indexOf("X11")!=-1) WhatOS="UNIX"
            if (navigator.appVersion.indexOf("Linux")!=-1) WhatOS="Linux"
            this.theConnectedOS = WhatOS

      // gör en fetch till backendet för att se om det är igång eller inte
       fetch('http://95.216.198.12/api/')
      .then(response => response.json())
      .then(result => {
        if (result !== undefined) {
           this.backendStatus = true
           this.backendON = "Running"
        }
      }) 
     
  },

   methods: {
  // eftersom detta är en child komponent så ber vi 'högkvarteret'
  // om att göm demma komponenten
   hide() {
      this.$emit('activity-hide')
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

     data() {
    return {
       // data för klient ip & OS
       theConnectedIP: {},
       theConnectedOS: "",
       // data för backendstatus
       backendON: "Offline",
       backendStatus: false,
       // positioner för funktionen att kuna flytta en 'div'
        positions: {
          clientX: undefined,
          clientY: undefined,
          movementX: 0,
          movementY: 0
        }
    }
  },
}
</script>

<style scoped>
.activity{
   background: #E9E9E9;
    position: absolute;
    width: 300px;
    height: 230px;
    left: 280px;
    top: 50px;
    border-radius: 10px 10px 0px 0px;
    z-index: 10;
}
.activity-border {
  margin-top: -10px;
  background:#DEDEDE; 
  width: 300px; 
  height:20px; 
  border-radius: 10px 10px 0px 0px;
}
.exit-btn {
  position:absolute; 
  left:4px; 
  padding-top:2px;
}
.exit-btn img{
width: 18px;
height: 18px;
}
.title {
  position:absolute; 
  left:62px; 
  padding-top:1px;
}
.title img{
width: 18px;
height: 18px;
}
.info {
  text-align: center;
  font: small-caps 1.0rem   Cambria,Georgia,serif; 
}
.backend {
  text-align: center;
font: small-caps 1.1rem   Cambria,Georgia,serif; 

}
.status{
  text-align: center;
  font: bold small-caps 1.2rem   Cambria,Georgia,serif; 
}



@media (min-width: 320px) and (max-width: 374px) { 
  .activity{
  height: 461px;
  width: 100%;
  position: absolute;
  top:10px;
  left:0;
  border-radius: 0px 0px 0px 0px;
}
.activity-border {
  margin-top: -10px;
  background:#DEDEDE; 
  width: 100%; 
  height:20px; 
  border-radius: 0px 0px 0px 0px;
}
   .title {
  left: 54px;
}
.exit-btn {
position:absolute; 
left:113px; 
top: 472px;
overflow: visible;
} 
.exit-btn img {
width: 39px;
height:39px;
}
.backend {
  padding-top: 50px;
}
.info {
  text-align: center;
  font: small-caps 1.0rem   Cambria,Georgia,serif; 
}
.backend {
  text-align: center;
font: small-caps 1.1rem   Cambria,Georgia,serif; 

}
.status{
  text-align: center;
  font: bold small-caps 1.2rem   Cambria,Georgia,serif; 
}}
@media (min-width: 375px) and (max-width: 424px)  { 
  .activity{
  height: 544px;
  width: 100%;
  position: absolute;
  top:10px;
  left:0;
  border-radius: 0px 0px 0px 0px;
}
.activity-border {
  margin-top: -10px;
  background:#DEDEDE; 
  width: 100%; 
  height:20px; 
  border-radius: 0px 0px 0px 0px;

}
   .title {
  left:74px;
}
.exit-btn {
position:absolute; 
left:130px; 
top: 556px;
overflow: visible;
} 
.exit-btn img {
width: 50px;
height:50px;
}
.backend {
  padding-top: 50px;
}
.info {
  text-align: center;
  font: small-caps 1.2rem   Cambria,Georgia,serif; 
}
.backend {
  text-align: center;
font: small-caps 1.3rem   Cambria,Georgia,serif; 

}
.status{
  text-align: center;
  font: bold small-caps 1.5rem   Cambria,Georgia,serif; 
}}
@media (min-width: 425px) and (max-width: 767px) { 
  .activity{
  height: 620px;
  width: 100%;
  position: absolute;
  top:10px;
  left:0;
  border-radius: 0px 0px 0px 0px;
}
.activity-border {
  margin-top: -10px;
  background:#DEDEDE; 
  width: 100%; 
  height:20px; 
  border-radius: 0px 0px 0px 0px;
}
   .title {
  left: 100px;
}
.exit-btn {
position:absolute; 
left:151px; 
top: 636px;
overflow: visible;
} 
.exit-btn img {
width: 53px;
height:53px;
}
.backend {
  padding-top: 50px;
}
.info {
  text-align: center;
  font: small-caps 1.2rem   Cambria,Georgia,serif; 
}
.backend {
  text-align: center;
font: small-caps 1.3rem   Cambria,Georgia,serif; 

}
.status{
  text-align: center;
  font: bold small-caps 1.5rem   Cambria,Georgia,serif; 
}}
@media (min-width: 768px) and (max-width: 999px) {
  .activity{
  height: 553px;
}

.activity-border {
  width: 100%;
}
.title {
  left:212px; 
}
.exit-btn {
position:absolute; 
left:254px; 
top:1080px;
overflow: visible;
} 
.exit-btn img {
width: 90px;
height:90px;
}
.backend {
  padding-top: 200px;
}
}
@media (min-width: 768px) and (max-width: 999px) {
.activity{
   background: #E9E9E9;
    position: absolute;
       width: 100%;
    height: 584px;
    top: 10px;
    left: 0px;
    border-radius: 0px 0px 0px 0px;
}
.activity-border {
  margin-top: -10px;
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
}
.title {
  position:absolute; 
  left:312px; 
  padding-top:1px;
}
.title img{
width: 18px;
height: 18px;
}
.info {
  text-align: center;
  font: small-caps 2.0rem   Cambria,Georgia,serif; 
}
.backend {
  text-align: center;
font: small-caps 2.1rem   Cambria,Georgia,serif; 

}
.status{
  text-align: center;
  font: bold small-caps 2.2rem   Cambria,Georgia,serif; 
}
}
@media (min-width: 768px) and (max-width: 999px) {
.activity{
   background: #E9E9E9;
    position: absolute;
       width: 100%;
    height: 584px;
    top: 10px;
    left: 0px;
    border-radius: 0px 0px 0px 0px;
}
.activity-border {
  margin-top: -10px;
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
}
.title {
  position:absolute; 
  left:312px; 
  padding-top:1px;
}
.title img{
width: 18px;
height: 18px;
}
.info {
  text-align: center;
  font: small-caps 2.0rem   Cambria,Georgia,serif; 
}
.backend {
  margin-top: -100px;
  text-align: center;
font: small-caps 2.1rem   Cambria,Georgia,serif; 

}
.status{
  text-align: center;
  font: bold small-caps 2.2rem   Cambria,Georgia,serif; 
}
}

</style>
