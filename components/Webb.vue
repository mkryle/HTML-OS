<template>
<!-- lägg till id, ref & funktion för att kunna flytta div -->
<div class="webb" ref="moveMydiv" id="move-my-div-container" @mousedown="dragMyDiv">
        <div class="webb-border">
          <!-- lägg till en stäng knapp med funktion för att "stänga div'en" -->
          <div class="exitbtn">
            <a href="#" @click="hide()"><img src="@/assets/images/close.png"></a>
         </div>
          <center>
            <div class="title"><img src="@/assets/images/safari.png"></div>
            <p>Webb</p>
          </center>
        </div>
        <div class="webframe">
          <div class="buttons">
            <!-- lägg till funktion för att kunna gå bakåt i surfhistoriken -->
            <a href="#" @click="back()">
                <img src="@/assets/images/backsmall.gif" alt="Bakåt"></a>
          </div>
              <!-- lägg till funktion för att kunna gå frammåt i surfhistoriken -->
              <div class="buttons">
                <a href="#" @click="forward()">
                <img src="@/assets/images/forwardsmall.gif" alt="Frammåt"></a>
                </div>
            <div class="buttons">
              <form class="src-bar">
                <!-- lägg till funktion för att synca texten ifån input -->
               <input type="text" v-model="newSrc" class="textinput" autofocus>
               <!-- lägg till funktion för att läsa in sidan ifrån adressen i input -->
               <input name="button2" type="button" class="submit" title="Surfa" v-on:click="surf()" value="Surfa">
               <!-- lägg till funktion för att återgå till startsidan -->
               <input name="button4" type="button" class="submit" title="Hem" v-on:click="home()" value="Hem">
              </form>
            </div>
        </div>
        <!-- lägg till funktion för att synca texten ifån input -->
        <iframe :src="browseSrc" class="web-src" scrolling="yes">
          You need a frames enabled browser to use this feature!
        </iframe>
      </div>
</template>

<script>
export default {
  name: 'webb',
   data() {
    return {
      // positioner för funktionen att kuna flytta en 'div'
      positions: {
        clientX: undefined,
        clientY: undefined,
        movementX: 0,
        movementY: 0
      },
      // spara input fältet
       browseSrc: "http://www.kryle.se/",
      newSrc: "http://www.kryle.se/",
    }
  },

   methods: {
    // eftersom detta är en child komponent så ber vi 'högkvarteret'
    // om att göm demma komponenten
   hide() {
      this.$emit('webb-hide')
      return
    },
    // synca data ifrån input fältet till iframe'en
     surf() {
      this.browseSrc = this.newSrc
      return

    },
    // navigera iframe till kryle.se
    home() {
     this.browseSrc = "http://www.kryle.se/"
    },
    // navigera iframe bakåt i historiken
    back() {
      history.back()
      return false
    },
    // navigera iframe frammåt i historiken
    forward() {
      history.forward()
      return false
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
.webb {
    background: #FFFFFF;
    position: absolute;
    width: 505px;
    height: 320px;
    top: 50px;
    left: 170px;
    border-radius: 10px 10px 0px 0px;
}
.webb-border {
  margin-top: -20px;
  background:#DEDEDE; 
  width: 505px; 
  height:20px; 
  border-radius: 10px 10px 0px 0px;
}
.buttons {
  display: inline;
  
}
.buttons form {
  display: inline;
  position: relative;
  top: -7px;
}
.exitbtn {
position:absolute; 
left:2px; 
padding-top:2px;
}
.exitbtn img {
width:16px;
height:16px;
}
.title {
position:absolute; 
left:162px; 
padding-top:1px;
}
.title img {
  margin-right: -120px;
width: 18px;
height: 18px;
}
.webframe {
  width: 500px;
  border: 0;
  
  }
.webframe img {
 width: 30px;
 height: 29px;
  }
  .textinput {
   width:270px;
  }
.web-src {
  width: 500px; 
  height: 260px;
} 
.src-bar {
  padding-left: 10px;
  z-index: 20;
}
.src-bar input {
  margin-left: 10px;
}
#move-my-div-container {
  position: absolute;
  z-index: 9;
}


@media (min-width: 320px) and (max-width: 374px) { 
.webb {
  position: absolute;
  top:2px;
  left:0;
  border-radius: 0px 0px 0px 0px;
  width: 100%;
  height: 469px;
  margin-top: 2px;
  
}
.webb-border {
  margin-top: -20px;
  background:#DEDEDE; 
  width: 505px; 
  height:20px; 
  border-radius: 0px 0px 0px 0px;
  margin-top: -20px;
  width: 100%;
}
.title {
position:absolute; 
left:40px; 
padding-top:1px;
}
  .textinput {
   width:50px;
  }
.web-src {
  width: 98%; 
  height: 410px;
} 
.exitbtn {
position:absolute; 
left:113px; 
top: 478px;
overflow: visible;
} 
.exitbtn img {
width: 39px;
height:39px;
}
}
@media (min-width: 375px) and (max-width: 424px)  { 
.webb {
  position: absolute;
  top:2px;
  left:0;
  border-radius: 0px 0px 0px 0px;
  width: 100%;
    height: 550px;
    margin-top: 2px;
}
.webb-border {
  margin-top: -20px;
  width: 100%;
  border-radius: 0px 0px 0px 0px;
}
.title {
position:absolute; 
left:40px; 
padding-top:1px;
}
  .textinput {
   width:90px;
  }
.web-src {
  width: 98%; 
  height: 491px;
} 
.exitbtn {
position:absolute; 
left:130px; 
top: 560px;
overflow: visible;
} 
.exitbtn img {
width: 50px;
height:50px;
}
}
@media (min-width: 425px) and (max-width: 767px) { 
.webb {
   position: absolute;
  top:3px;
  left:0;
  border-radius: 0px 0px 0px 0px;
  width: 100%;
    height: 625px;
    margin-top: 0px;
}
.webb-border {
  margin-top: -20px;
  width: 100%;
  border-radius: 0px 0px 0px 0px;
}
.title {
position:absolute; 
left:90px; 
padding-top:1px;
}
  .textinput {
   width:130px;
  }
.web-src {
  width: 98%; 
  height: 567px;
} 
.exitbtn {
position:absolute; 
left:151px; 
top: 640px;
overflow: visible;
} 
.exitbtn img {
width: 53px;
height:53px;
}
}

@media (min-width: 768px) and (max-width: 999px) {

.webb {
    background: #FFFFFF;
    position: absolute;
  width: 100%;
    height: 584px;
    top: 2px;
    left: 0px;
    border-radius: 0px 0px 0px 0px;
}
.webb-border {
  margin-top: -20px;
  background:#DEDEDE; 
  width: 782px;
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
left:302px; 
padding-top:1px;
}
.title img {
  margin-right: -120px;
width: 18px;
height: 18px;
}
.webframe {
  width: 700px;
  border: 0;
  }
.webframe img {
 width: 30px;
 height: 29px;
  }
  .textinput {
   width:270px;
  }
.web-src {
  width: 776px; 
  height: 526px;
} 
.src-bar {
  padding-left: 10px;
  z-index: 20;
}
.src-bar input {
  margin-left: 10px;
}
}
</style>
