<template>
<!-- lägg till id, ref & funktion för att kunna flytta div -->
  <div class="settings" ref="moveMydiv" id="move-my-div-container" @mousedown="dragMyDiv">
       <div class="settings-border">
           <div class="exit-btn"> 
             <!-- lägg till en stäng knapp med funktion för att "stänga div'en" -->
           <a href="#" @click="hide()"><img src="@/assets/images/close.png"></a>
           </div><center>
              <div class="title">
            <img src="@/assets/images/inst.png"></div>
            Inställningar
            </center>
        </div>
        <ul class="settings-menu">
          <!-- lägg till 2 funktioner för att kunna ha två "flikar" i "inställningar" -->
          <li><a href="#" @click="open('background')">Bakgrunder</a></li>
         <li><a href="#" @click="open('meny')">Klocka</a></li>   
            </ul>
        <div id="menu">
        <!-- lägg till 2 knappar för att kunna ändra färg på "klockan" -->
         <button @click="clock('black')">Svart</button>
         <button @click="clock('white')">Vit</button>
        </div>
        <div id="background">
          <!-- funktioner för att ändra "bakgrundsbild"
              varje nummer representerar varsin bild 1-6 -->
         <a href="#" @click="background('1')"><img src="@/assets/images/back.jpg"></a>
         <a href="#" @click="background('2')"><img src="@/assets/images/back2.jpg"></a>
         <a href="#" @click="background('3')"><img src="@/assets/images/back3.jpg"></a>
         <a href="#" @click="background('4')"><img src="@/assets/images/back4.jpg"></a>
         <a href="#" @click="background('5')"><img src="@/assets/images/back5.jpg"></a>
         <a href="#" @click="background('6')"><img src="@/assets/images/back6.jpg"></a>
          </div>
  </div>
</template>

<script>
export default {
  name: 'settings',

 methods: {
    // eftersom detta är en child komponent så ber vi 'högkvarteret'
    // om att göm demma komponenten
   hide() {
      this.$emit('settings-hide')
      return
    },
  // eftersom detta är ett "child" så körs en "emit" med en playload
  // som innehåller ett nummer för den bild som klickas på
   background(number) {
      this.$emit('bg-number', number)
    },
  // eftersom detta är ett "child" så körs en "emit" med en playload
  // som innehåller namn på den fliken som ska visas
       open(tab) {
      this.$emit('opentab', tab)
    },
    
  // en funkition som älndrar klockans färg med css.
 clock(color) {
    let clock = document.getElementById('clock')
    clock.style.color =  color 
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
      // positioner för funktionen att kuna flytta en 'div'
      positions: {
        clientX: undefined,
        clientY: undefined,
        movementX: 0,
        movementY: 0
      },
  
    }

 }
 }
</script>
<style scoped>
.settings {
    background: #E9E9E9;
    position: absolute;
    top: 50px;
    width: 410px;
    height: 230px;
    left: 200px;
    border-radius: 10px 10px 0px 0px;
    z-index: 10;
}
.settings-border {
 background:#DEDEDE; 
 width:410px; 
 height:20px; 
 border-radius: 10px 10px 0px 0px;
}
.exit-btn {
  position:absolute; 
  left:4px; 
  padding-top:2px;
  }
.exit-btn img {
width: 16px;
height: 16;
  }
.title {
  position:absolute; 
  left:138px;
  padding-top:1px;
}
.title img{
height: 18px;
width: 18px;
}
.settings-menu {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
}
.settings-menu li {
    float: left
}
.settings-menu li a {
    color: black;
    display: block;
    padding: 8px 16px;
    font-family: Helvetica Neue,Helvetica,Arial,sans-serif;
      
}
.settings-menu li a:hover {
    color: black;
    background-color: #1E9DFA
}
.settings-menu a {
    text-decoration: none;
}
#menu button {
    padding: 10px;
    margin: 10px;
    width: 70px;
}
#menu {
   position: absolute;
  top: 54px;
  left: 0;
  background-color: #E9E9E9;
  height: 180px;
  width: 410px;
  visibility: visible;
}
#menu img {
height: 16px;
position: relative;
top: 2px;
padding-left: 20px;
padding-right: 20px;
}
#menu p {
  padding: 20px;
  font: small-caps  1.2rem  Helvetica Neue,Helvetica,Arial,sans-serif;
}
#background {
   position: absolute;
  top: 54px;
  left: 0;
  background-color: #E9E9E9;
  height: 180px;
  width: 410px;
 visibility: visible;
}
#background img {
  width: 120px;
  padding: 8px;
}


@media (min-width: 320px) and (max-width: 374px) { 
   .title {
  left: 70px;
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
.settings {
    background: #E9E9E9;
    width:266px;
    z-index: 10;
    height: 417px;
    position: absolute;
    left: 0px;
    top: 0px;
    border-radius: 0px 0px 0px 0px;
    
}
.settings-border {
 border-radius: 0px 0px 0px 0px;
 background:#DEDEDE; 
 width:100%;
 height:20px; 
}
#background {
   position: absolute;
  top: 54px;
  left: 0;
  background-color: #E9E9E9;
  height: 417px;
  width: 100%;
 visibility: visible;
  overflow: scroll;

}
#background img {
  width: 245px;
  padding: 10px;
  display: block;
}
.settings ul li {
  width: 50%;
}
#menu {   
  position: absolute;
  top: 54px;
  left: 0;
  background-color: #E9E9E9;
  height: 417px;
  width: 100%;
 visibility: visible;
  overflow: scroll;
  text-align: center;
}
#menu button {   
  margin-top: 50px;
  padding: 20px;
}
 }
@media (min-width: 375px) and (max-width: 424px)  { 
   .title {
  left: 96px;
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
.settings {
    position: absolute;
       width: 100%;
    height: 417px;position: absolute;
    left: 0px;
    top: 0px;
    border-radius: 0px 0px 0px 0px;
}
.settings-border {
 border-radius: 0px 0px 0px 0px;
 width: 100%;
}
#background {
   position: absolute;
  top: 54px;
  left: 0;
  background-color: #E9E9E9;
  height: 500px;
  width: 100%;
 visibility: visible;
  overflow: scroll;

}
#background img {
  width: 280px;
  padding: 15px;
  display: block;
}
.settings ul li {
  width: 50%;
}
#menu {   
   position: absolute;
  top: 54px;
  left: 0;
  background-color: #E9E9E9;
  height: 500px;
  width: 100%;
 visibility: visible;
  overflow: scroll;
  text-align: center;
}
#menu button {   
  margin-top: 70px;
  padding: 25px;
}
 }
@media (min-width: 425px) and (max-width: 767px) { 
  .title {
  left: 110px;
}
.settings {
    position: absolute;
       width: 100%;
    height: 417px;position: absolute;
    left: 0px;
    top: 0px;
    border-radius: 0px 0px 0px 0px;
}
.settings-border {
 border-radius: 0px 0px 0px 0px;
 width: 100%;
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
#background {
   position: absolute;
  top: 54px;
  left: 0;
  background-color: #E9E9E9;
  height: 576px;
  width: 100%;
 visibility: visible;
  overflow: scroll;

}
#background img {
  width: 310px;
  padding: 20px;
  display: block;
}
.settings ul li {
  width: 50%;
}
#menu {   
   position: absolute;
  top: 54px;
  left: 0;
  background-color: #E9E9E9;
  height: 576px;
  width: 100%;
 visibility: visible;
  overflow: scroll;
  text-align: center;
}
#menu button {   
  margin-top: 80px;
  padding: 30px;
}}

@media (min-width: 768px) and (max-width: 999px) {
.settings {
    position: absolute;
       width: 100%;
    height: 1063px;
}
.settings-border {
 width: 100%;
}
.title {
  position:absolute; 
  left:228px;
  padding-top:1px;
}
  .exit-btn {
position:absolute; 
left:254px; 
top:1090px;
overflow: visible;
} 
.exit-btn img {
width: 90px;
height:90px;
}
#background {
   position: absolute;
  top: 54px;
  left: 0;
  background-color: #E9E9E9;
  height: 990px;
  width: 100%;
 visibility: visible;
}
#background img {
  width: 268px;
  padding: 8px;
  display: block;
  padding-left: 160px;
}

#menu button {
    padding: 50px;
    margin: 10px;
    width: 170px;
}
.settings {
    background: #E9E9E9;
    position: absolute;
       width: 782px;
    height: 584px;
    top: 0px;
    left: 0px;
    border-radius: 0px 0px 0px 0px;
}
.settings-border {
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
  left:328px;
  padding-top:1px;
}
.title img{
height: 18px;
width: 18px;
}
.settings-menu {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
}
.settings-menu li {
    float: left
}
.settings-menu li a {
    color: black;
    display: block;
    padding: 8px 16px;
    font-family: Helvetica Neue,Helvetica,Arial,sans-serif;
      
}
.settings-menu li a:hover {
    color: black;
    background-color: #1E9DFA
}
.settings-menu a {
    text-decoration: none;
}
#menu {
   position: absolute;
  top: 54px;
  left: 10;
  background-color: #E9E9E9;
  height: 180px;
  width: 410px;
  visibility: visible;
}
#menu img {
height: 16px;
position: relative;
top: 2px;
padding-left: 20px;
padding-right: 20px;
}
#menu p {
  padding: 20px;
  font: small-caps  1.2rem  Helvetica Neue,Helvetica,Arial,sans-serif;
}
#background {
   position: absolute;
  top: 54px;
  left: 0;
  height: 472px;
  width: 704px;
 visibility: visible;
}
#background img {
  width: 330px;
  padding: 10px;
  display: inherit;
}
}

@media (min-width: 768px) and (max-width: 999px) {
#menu button {
    padding: 50px;
    margin: 10px;
    width: 170px;
}
.settings {
    background: #E9E9E9;
    position: absolute;
       width: 782px;
    height: 584px;
    top: 0px;
    left: 0px;
    border-radius: 0px 0px 0px 0px;
}
.settings-border {
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
  left:328px;
  padding-top:1px;
}
.title img{
height: 18px;
width: 18px;
}
.settings-menu {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
}
.settings-menu li {
    float: left
}
.settings-menu li a {
    color: black;
    display: block;
    padding: 8px 16px;
    font-family: Helvetica Neue,Helvetica,Arial,sans-serif;
      
}
.settings-menu li a:hover {
    color: black;
    background-color: #1E9DFA
}
.settings-menu a {
    text-decoration: none;
}
#menu {
   position: absolute;
  top: 54px;
  left: 10;
  background-color: #E9E9E9;
  height: 180px;
  width: 410px;
  visibility: visible;
}
#menu img {
height: 16px;
position: relative;
top: 2px;
padding-left: 20px;
padding-right: 20px;
}
#menu p {
  padding: 20px;
  font: small-caps  1.2rem  Helvetica Neue,Helvetica,Arial,sans-serif;
}
#background {
   position: absolute;
  top: 54px;
  left: 0;
  background-color: #E9E9E9;
  height: 180px;
  width: 782px;
 visibility: visible;
}
#background img {
  width: 218px;
  padding: 8px;
}
}
</style>
