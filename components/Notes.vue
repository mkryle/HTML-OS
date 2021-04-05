<template>
<!-- lägg till id, ref & funktion för att kunna flytta div -->
  <div class="notes" ref="moveMydiv" id="move-my-div-container" @mousedown="dragMyDiv">
    <div class="anteckborder"> 
      <!-- lägg till en stäng knapp med funktion för att "stänga div'en" -->
            <div class="exitbtn">
           <a href="#" @click="hide()"><img src="@/assets/images/close.png"></a>
           </div><center>
            <div class="title">
            <img src="@/assets/images/anteck.png"></div>Anteckningar</center></div>
            <form class="responsive">
            <!-- funktion för att spara aktuell text -->
            <input type="button" id="saveText" value="Spara" v-on:click="saveText()">
            <!-- funktion för att radera aktuell text -->
            <input type="button" id="erase" value="Radera" v-on:click="eraseText()">
            <textarea id="txtarea" NAME="comments" v-model="textSave[0].textSave" COLS="53" ROWS="18"></textarea>
            </form></div>
</template>

<script>
export default {
  name: 'notes',

 data() {
    return {
       // data för aktuella texten
       textSave: [{}],
       // positioner för funktionen att kuna flytta en 'div'
      positions: {
        clientX: undefined,
        clientY: undefined,
        movementX: 0,
        movementY: 0
      }
    }
  },
  created() {
    // hämta aktuell text från backendet
    fetch('http://95.216.198.12/api/')
      .then(response => response.json())
      .then(result => {
        this.textSave = result
      })
  }, 

   methods: {
     //spara aktuell text till backendet
     saveText() {
      // gör text input till en sträng för att förhindra
      // att kod körs i den.
      let stringText = JSON.stringify(this.textSave[0].textSave)
      // hämta frontendserverns IP för godkänning ifrån backend
      let frontendIP = JSON.stringify(location.host)
      fetch('http://95.216.198.12/api/change/marcus', {
        body: '{  "ip": '+ frontendIP + '"textSave": ' + stringText + ', "createdBy": "marcus"}',
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'PUT'
      }).then(function (response) {
        console.log('Saved!')
        alert("Sparat !!")
        return response.json()
      })
    },
    //ta bort aktuell text
    eraseText() {
      this.textSave[0].textSave = null
      alert("Raderat !!")
    },
  // eftersom detta är en child komponent så ber vi 'högkvarteret'
  // om att göm demma komponenten
   hide() {
      this.$emit('notes-hide')
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
#move-my-div-container {
  position: absolute;
  z-index: 9;
}
.notes {
     background: #E9E9E9;
    position: absolute;
    width: 396px;
    overflow: hidden;
    height: 300px;
    top: 50px;
    left: 20px;
    border-radius: 10px 10px 0px 0px;
}
.anteckborder {
  background:#DEDEDE; 
  width:396px; 
  height:20px; 
  border-radius: 10px 10px 0px 0px;
}
.exitbtn {
 position:absolute; 
 left:4px; 
 padding-top:2px;
}
.exitbtn img {
width:16px;
height:16px;
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


@media (min-width: 320px) and (max-width: 374px) { 
   .title {
  left: 70px;
}
.notes {
    background: #E9E9E9;
    position: absolute;
    width: 266px;
    top: 0px;
    height: 471px;
    left: 0px;
    border-radius: 0px 0px 0px 0px;
    overflow: visible;
}
.anteckborder {
  width:100%; 
}
.responsive textarea {
position: absolute;
top: 80px;
left: 10px;
width: 240px;
height: 376px;
}
.responsive input {
  padding: 10px;
  margin: 10px;
}
.exitbtn {
position:absolute; 
left:113px; 
top: 482px;
overflow: visible;
} 
.exitbtn img {
width: 39px;
height:39px;
}
}
@media (min-width: 375px) and (max-width: 424px)  { 
   .title {
  left: 90px;
}
.exitbtn {
position:absolute; 
left:130px; 
top: 566px;
overflow: visible;
} 
.exitbtn img {
width: 50px;
height:50px;
}
.notes {
    height: 554px;
    background: #E9E9E9;
    position: absolute;
    width: 100%;
    top: 0px;
    left: 0px;
    overflow: visible;
    border-radius: 0px 0px 0px 0px;
}
.anteckborder {
  width:100%; 
}
.responsive textarea {
position: absolute;
top: 100px;
left: 15px;
width: 275px;
height: 434px;
}
.responsive input {
  padding: 15px;
  margin: 15px;
}
}
@media (min-width: 425px) and (max-width: 767px) { 
  .title {
  left: 110px;
}
.exitbtn {
position:absolute; 
left:151px; 
top: 646px;
overflow: visible;
} 
.exitbtn img {
width: 53px;
height:53px;
}
.notes {
    height: 630px;
    background: #E9E9E9;
    position: absolute;
    width: 100%;
    top: 0px;
    left: 0px;
    border-radius: 0px 0px 0px 0px;
    overflow: visible;
}
.anteckborder {
  width:100%; 
}
.responsive textarea {
position: absolute;
top: 120px;
left: 20px;
width: 310px;
height: 485px;
}
.responsive input {
  padding: 20px;
  margin: 20px;
}
}


@media (min-width: 768px) and (max-width: 999px) {
  .title {
  position:absolute; 
  left:228px;
  padding-top:1px;
}
.exitbtn {
position:absolute; 
left:254px; 
top: 1090px;
overflow: visible;
} 
.exitbtn img {
width: 90px;
height:90px;
}
.notes {
   position: absolute;
    width: 100%;
    top: 0px;
    left: 0px;
    overflow: visible;
    height: 100%;
}
.anteckborder {
  width:100%; 
}
.responsive textarea {
position: absolute;
top: 100px;
left: 10px;
width: 574px;
height: 950px;
}

.notes {
     background: #E9E9E9;
    position: fixed;
    width: 782px;
    overflow: visible;
    height: 584px;
    top: 0px;
    left: 0px;
    border-radius: 0px 0px 0px 0px;
}
.anteckborder {
  background:#DEDEDE; 
  width:782px; 
  height:20px; 
  border-radius: 0px 0px 0px 0px;
}
.exitbtn {
position:fixed; 
left:843px; 
top:285px;
overflow: visible;
} 
.exitbtn img {
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
.responsive textarea {
position: absolute;
top: 100px;
left: 10px;
width: 676px;
height: 410px;
}
.responsive input {
  padding: 20px;
  margin: 10px;
}
}
</style>
