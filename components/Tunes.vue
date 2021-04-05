<template>
<!-- lägg till id, ref & funktion för att kunna flytta div -->
  <div class="tunes" ref="moveMydiv" id="move-my-div-container" @mousedown="dragMyDiv">
   <div class="tunes-border">
     <!-- lägg till en stäng knapp med funktion för att "stänga div'en" -->
          <div class="exit-btn">
            <a href="#" @click="hide()"><img src="@/assets/images/close.png"></a>
          </div>
          <center>
            <div class="tunes-title"><img src="@/assets/images/itunes.png"></div>Tunes
          </center>
        </div>
  <div class="playlist">
        <!-- lägg till funktion för att spela en speciell sång -->
            <div class="song"><button @click="playTune('House')">Bensound - House</button><p>4:19</p></div>
            <div class="song"><button @click="playTune('Creativeminds')">Bensound - Creative Minds</button><p>2:27</p></div>
            <div class="song"><button @click="playTune('Summer')">Bensound - Summer</button><p>3:37</p></div>
            <div class="song"><button @click="playTune('Ukulele')">Bensound - Ukulele</button><p>2:26</p></div>
  </div>
            <p class="nowplay">  Now Playing:</p>
             <p class="song-title">Bensound - {{nowPlays}} </p>
            <audio v-bind:title="'Bensound -'+nowPlays" id="tuneplayer" class="the-player" :src="musicSrc" controls autoplay>
                Your browser does not support the audio element.
            </audio>
</div>
</template>

<script>
export default {
  name: 'tunes',

    data() {
    return {
      // aktuell sång & titel source
   musicSrc: "http://kryle.se/data/bensound-House.mp3",
    nowPlays: "House",
    // positioner för funktionen att kuna flytta en 'div'
      positions: {
        clientX: undefined,
        clientY: undefined,
        movementX: 0,
        movementY: 0
      },
    }
  },

   methods: {
     // funktion för att ändra sången som spelas
     // vilken gämför namn på sång med filnamnet som ska läsas in
     // t.ex. bensound-House.mp3
     playTune(tuneName){
       this.musicSrc = 'http://kryle.se/data/bensound-'+ tuneName + '.mp3'
       let player = document.getElementById('tuneplayer')
       this.nowPlays = tuneName
       player.play()
     },

   hide() {
     // eftersom detta är en child komponent så ber vi 'högkvarteret'
     // om att göm demma komponenten
      this.$emit('tunes-hide')
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
p {
  font: small-caps 0.9rem   Cambria,Georgia,serif; 
  text-align: left;
  padding-left: 10px;
  margin-bottom: 0px;
}
.song-title {
font-size:  1.4rem;
text-align: center;
margin: 0px;
}
.song {
  display: inline;
 background-color: #555555;
}
.song p{
  color: white;
  position: relative;
  top: 1px;
  padding: 1px;
  display: inline;
  background-color: #555555;
}
.tunes{
    background: #E9E9E9;
    position: absolute;
    width: 326px;
    overflow: hidden;
    height: 300px;
    top: 50px;
    left: 100px;
    border-radius: 10px 10px 0px 0px;
}
.tunesborder {
 background:#DEDEDE; 
 width:326px; 
 height:20px; 
 border-radius: 10px 10px 0px 0px;
}
.exit-btn {
position:absolute; 
left:4px; 
padding-top:2px;
} 
.exit-btn img {
width:16px;
height:16px;
}
.tunes-title {
  position:absolute; 
  left:122px; 
  padding-top:1px;
}
.tunes-title img {
width:18px;
height:18px;
}
.playlist{
  padding: 20px;
  margin: 20px;
   border-radius: 10px 10px 10px 10px;
  background-color: #555555;
}
.playlist button{
  color: white;
  width: 200px;
  text-align: left;
  background-color: #555555;
}
.the-player {
    padding-top: 10px;
    display:block;
    margin: auto;
    border: none;
    outline: none; 
}
#move-my-div-container {
  position: absolute;
  z-index: 9;
}


@media (min-width: 320px) and (max-width: 374px) { 
  .tunes{
    position: fixed;
    top:0;
    left: 0;
    border-radius: 0px 0px 0px 0px;
    width: 100%;
    overflow: hidden;
    height: 100%;
    overflow: visible;
}
.tunesborder {
 background:#DEDEDE; 
 width:326px; 
 height:20px; 
 border-radius: 0px 0px 0px 0px;
}
.tunes-title img{
  position: relative;
  left:-30px; 
}
.exit-btn {
position:absolute; 
left:42%; 
top:102%;
overflow: visible;
} 
.exit-btn img {
width: 40px;
height:40px;
}
.playlist{
  padding: 15px;
  margin: 15px;
   border-radius: 10px 10px 10px 10px;

}
.playlist button{
  margin-left: -10px;
  color: white;
  width: 180px;
  height: 40px;
  text-align: left;
  background-color: #555555;
}
.nowplay{
   padding-top: 15px;
   padding-bottom: 15px;
   }
.song-title{
     padding-top: 15px;
   padding-bottom: 15px;
 }
 .song p{
  color: white;
  position: relative;
  top: 3px;
  padding:0px;
  display: inline;
  background-color: #555555;
}
audio {
  width: 100%;
}
}
@media (min-width: 375px) and (max-width: 424px)  { 
  .tunes{
    position: fixed;
    top:0;
    left: 0;
    border-radius: 0px 0px 0px 0px;
    width: 100%;
    overflow: hidden;
    height: 100%;
    overflow: visible;
}
.tunesborder {
 background:#DEDEDE; 
 width:326px; 
 height:20px; 
 border-radius: 0px 0px 0px 0px;
}
.tunes-title img{
  position: relative;
  left:-10px; 
}
.exit-btn {
position:absolute; 
left:42.6%; 
top:102.4%;
overflow: visible;
} 
.exit-btn img {
width: 45px;
height:45px;
}
.playlist{
  padding: 15px;
  margin: 15px;
  margin-top: 50px;
   border-radius: 10px 10px 10px 10px;

}
.playlist button{
  margin-left: -10px;
  color: white;
  width: 200px;
  height: 40px;
  text-align: left;
  background-color: #555555;
}
.nowplay{
   padding-top: 15px;
   padding-bottom: 15px;
   }
.song-title{
     padding-top: 15px;
   padding-bottom: 15px;
 }
 .song p{
  color: white;
  position: relative;
  top: 3px;
  padding:10px;
  display: inline;
  background-color: #555555;
}
audio {
  width: 100%;
}
}
@media (min-width: 425px) and (max-width: 767px) { 
  .tunes{
    position: fixed;
    top:0;
    left: 0;
    border-radius: 0px 0px 0px 0px;
    width: 100%;
    overflow: hidden;
    height: 100%;
    overflow: visible;
}
.tunesborder {
 background:#DEDEDE; 
 width:326px; 
 height:20px; 
 border-radius: 0px 0px 0px 0px;
}
.tunes-title img{
  position: relative;
  left: 15px; 
}
.exit-btn {
position:absolute; 
left:43%; 
top:102.5%;
overflow: visible;
} 
.exit-btn img {
width: 50px;
height:50px;
}
.playlist{
  padding: 15px;
  margin: 15px;
  margin-top: 100px;
   border-radius: 10px 10px 10px 10px;
}
.song-title {
padding: 30px;
}
.nowplay {
  padding: 20px;
}
}
@media (min-width: 768px) and (max-width: 999px) {
p {
  font: small-caps 1rem   Cambria,Georgia,serif; 
  text-align: left;
  padding-left: 10px;
}
.song-title {
font-size:  1.8rem;
text-align: center;
margin: 0px;
}
.song {
  display: inline;
 background-color: #555555;
}
.song p{
  color: white;
  position: relative;
  top: 3px;
  padding: 23px;
  display: inline;
  background-color: #555555;
}
.tunes{
    background: #E9E9E9;
    position: fixed;
    width: 100%;
    overflow: hidden;
    height: 100%;
    top: 0px;
    left: 0px;
    border-radius: 0px 0px 0px 0px;
}
.tunesborder {
 background:#DEDEDE; 
 width: 100%;
 height:20px; 
 border-radius: 10px 10px 0px 0px;
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
.tunes-title {
  position:absolute; 
  left:440px; 
  padding-top:1px;
}
.tunes-title img {
width:18px;
height:18px;
}
.playlist{
  padding: 20px;
  margin: 20px;
   border-radius: 10px 10px 10px 10px;
}
.playlist button{
  color: white;
  width: 500px;
  height: 60px;
  text-align: left;
  background-color: #555555;
}
.the-player {
    padding-top: 10px;
    display:block;
    margin: auto;
    border: none;
    outline: none; 
}
}
</style>
