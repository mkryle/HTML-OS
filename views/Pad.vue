<template>
  <div class="running">
    <div id="desk">
       <div id="topmenu">
        <div id="clock">{{ currentTime }}</div>
       </div>
       <!-- lägger in all appar i from av komponenter, tar emot emits för att kunna 
               dölja specifik komponent när dem ber om det, och visar bara specifik 
               komponent om den är satt till "vivible" i "data".
               "settings" tar även emot emits ifrån vald bakgrund och vilken "flik"
               i "settings" panelen som ska visas -->
          <Settings @settings-hide="Hide('settings')" @bg-number="background" @opentab="settab" v-if="settingsVisible"></Settings>
          <Notes @notes-hide="Hide('notes')" v-if="notesVisible"></Notes>
          <About @about-hide="Hide('about')" v-if="aboutVisible"></About>
          <Tunes @tunes-hide="Hide('tunes')" v-if="tunesVisible"></Tunes>
          <Photo @photo-hide="Hide('photo')" v-if="photoVisible"></Photo> 
          <Webb @webb-hide="Hide('webb')" v-if="webbVisible"></Webb>
          <Activity @activity-hide="Hide('activity')" v-if="activityVisible"></Activity>
     <div>
        <div class="dockapps-row1">
          <ul class="dockicons">
            <!-- länkar till funktion för att visa specifik komponent, skickar med
                 vilken komponent det gäller i samma funktion, samma som högre upp
                 fast designad som en "dock" istället för en meny i överkant -->
            <li>
              <a href="#" @click="Show('tunes')"><img src="@/assets/images/itunes.png"></a>
                <span>Tunes</span>
            </li>
            <li>
              <a href="#" @click="Show('notes')"><img src="@/assets/images/anteck.png"></a>
                <span>Anteckningar</span>
            </li>
            <li>
              <a href="#" @click="Show('photo')"><img src="@/assets/images/iphoto.png"></a>
                <span>Photo</span>
            </li> 
            <li>
              <a href="#" @click="Show('webb')"><img src="@/assets/images/safari.png"></a>
                <span>Webb</span>
            </li>
          </ul>
        </div>
         <!-- dela upp docken i två rader för att kunna justera
             verje rad för sig -->
      <div class="dockapps-row2">
          <ul class="dockicons">
            <li>
              <a href="#" @click="Show('settings')"><img src="@/assets/images/inst.png"></a>
                <span>Inställningar</span>
            </li>
            <li>
              <a href="#" @click="Show('activity')"><img src="@/assets/images/activity.png"></a>
                <span>Aktivitetskontroll</span>
            </li>
            <li>
              <a href="#" @click="Show('about')"><img src="@/assets/images/help.png"></a>
              <span>Hjälp</span>
            </li>
          </ul>
        </div>
      </div>
       </div>
       <div>
        <img src="@/assets/images/pad.jpg" class="bootbg" usemap="#Map">
         <map name="Map">
           <!-- en länk för att kunna stänga av apparaten,
                den kan väl inte vara igång hela tiden eller!? -->
  <area shape="rect" coords="0,550,40,500" alt="Start" href="/padturnoff">
</map> <div class="starttxt"><p>&lt;&lt; click </p><p>to turn off</p></div>
      </div>
      <!-- visa en varning när användaren av någon anledning inte kan-,
             eller kan se mer- än tänkt upplösning och skickar med en 
             länk för att ge användaren bättre användarupplevelse beroende
             på öpplösning / skärmstorlek -->
      <div id="warning-desktop">
           <a href="#" @click="hidewarning"><img src="@/assets/images/white-close.png"></a>
          <p>Entering Desktop mode!</p><a href="#" @click="desktop">Go to Desktop Version!</a></div>
           <div id="warning-mobile">
           <a href="#" @click="hidewarning"><img src="@/assets/images/white-close.png"></a>
          <p>Entering Mobile mode!</p><a href="#" @click="mobile">Go to Mobile Version!</a></div>
       <div class="wrongmode"><p><a href="#" @click="mobile">&lt;-- mobile</a> wrong resolution? <a href="#" @click="desktop">desktop --&gt;</a></p></div>
   </div>
</template>

<script>
// importerar alla appar i form av komponenter
import Settings from '@/components/Settings.vue'
import About from '@/components/About.vue'
import Notes from '@/components/Notes.vue'
import Tunes from '@/components/Tunes.vue'
import Photo from '@/components/Photo.vue'
import Webb from '@/components/Webb.vue'
import Activity from '@/components/Activity.vue'

export default {
  components: {
    Settings,
    About,
    Notes,
    Tunes,
    Photo,
    Webb,
    Activity,
  },

  data(){
    return{
      // en sträng för aktuell tid
      currentTime: "",
      // göm alla appar (komponenter)
      settingsVisible: false,
      notesVisible: false,
      aboutVisible: false,
      tunesVisible: false,
      photoVisible: false,
      webbVisible: false,
      activityVisible: false,
      // ljud på eller av
    soundIsMuted: false,
    }
  },

created() {
  // uppdaterar strängen för klockan varje sekund
  setInterval(this.theTime, 1000)
 },
 
 methods: {
   //länk till mobil-versionen
 mobile() {
this.$router.push('/mobile')
 },
 //länk till desktop-versionen
 desktop() {
this.$router.push('/running')
 },
//ger användaren möjlighet att vara kvar i vald upplösning
//även om min kod inte tycker den är optimal.
  hidewarning(){
 let warningMob = document.getElementById('warning-mobile')
    warningMob.style.visibility = "hidden"
     let warningDesk = document.getElementById('warning-desktop')
    warningDesk.style.visibility = "hidden"
  },
  //stäng av ljudet och ändra högtalarikonen till "muted"
   Mute() {
     if (this.soundIsMuted === false) {
    let picture = document.getElementById('speaker-ico')
     picture.src="http://kryle.se/data/images/speakeroff.png"
     let sound = document.getElementById("tuneplayer")
     if (sound) {
    sound.muted = true
    }
        this.soundIsMuted = true
     } else if (this.soundIsMuted === true) {
       let picture = document.getElementById('speaker-ico')
     picture.src="http://kryle.se/data/images/speaker.png"
     let sound = document.getElementById("tuneplayer")
       if (sound) {
    sound.muted = false
       }
          this.soundIsMuted = false
     }
     return
   },
//tar emot emits med en "payload" vilken innehåller ett nummer,
//ändrar bakgrunden till specifik fil vilka är namngivna 
//back1.jpg, back2.jpg osv.
 background(number) {
    let bg = document.getElementById('desk')
    bg.style.backgroundImage = "url('http://kryle.se/data/images/back" + number + ".jpg')"
  },
//tar emot emits med en "payload" vilken innehåller ett ord,
//ändrar "fliken" i settings till specifik flik beroende
//på om "background" skickas med eller inte.
 settab(tab) {
  let background = document.getElementById('background')
  let menu = document.getElementById('menu')
  if (tab ==="background") {
     menu.style.visibility = "hidden"
     background.style.visibility = "visible"
  } else   {
     background.style.visibility = "hidden"
     menu.style.visibility = "visible"
    }
  },
  //kolla vad det är för tid (nu).
  theTime() {
  let today = new Date();
  let theTime = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
  this.currentTime = theTime
  },
  //funktion för att kunna 'gömma' vald komponent (app).
  Hide(app) {
    if (app === 'settings')
  this.settingsVisible = false
  else if (app === 'notes')
  this.notesVisible = false
    else if (app === 'about')
  this.aboutVisible = false
      else if (app === 'tunes')
  this.tunesVisible = false
       else if (app === 'photo')
  this.photoVisible = false
         else if (app === 'webb')
  this.webbVisible = false
         else if (app === 'activity')
  this.activityVisible = false
 return
    },
//funktion för att kunna 'visa' vald komponent (app).
  Show(app) {
if (app === 'settings')
  this.settingsVisible = true
  else if (app === 'notes')
  this.notesVisible = true
   else if (app === 'about')
  this.aboutVisible = true
    else if (app === 'tunes')
  this.tunesVisible = true
     else if (app === 'photo')
  this.photoVisible = true
    else if (app === 'webb')
  this.webbVisible = true
    else if (app === 'activity')
  this.activityVisible = true
 return
    },
 }
}
</script>

<style scoped>
.starttxt{
position: fixed;
padding-left: 20px; 
margin-top:  -86px;
font: small-caps bold 1rem  Helvetica Neue,Helvetica,Arial,sans-serif;
color: #FF0004;
}
#warning-desktop {
  background-color: red;
  position: fixed;
  top:160px;
  left:250px;
  width: 400px;
  height: 240px;
  text-align: center;
  font: small-caps bold 1.4rem Helvetica Neue,Helvetica,Arial,sans-serif;
  z-index: 30;
  visibility: hidden;
  z-index: 30;
}
#warning-desktop img {
  position: relative;
  top:0;
  left: -165px;
  width: 50px;
  padding: 10px;
}
#warning-mobile {
  background-color: red;
  position: fixed;
  top:160px;
  left:250px;
  width: 400px;
  height: 240px;
  text-align: center;
  font: small-caps bold 1.4rem Helvetica Neue,Helvetica,Arial,sans-serif;
  z-index: 30;
  visibility: hidden;
  z-index: 30;
}
#warning-mobile img {
  position: relative;
  top:0;
  left: -165px;
  width: 50px;
  padding: 10px;
}
.wrongmode{
  text-align: center;
}
.dockicons span {
  font: small-caps bold 1.1rem Helvetica Neue,Helvetica,Arial,sans-serif;
  position: relative;
  left: 25px;
  color: white;
}
.dockicons  {
text-align: center;
}
#desk {
  width: 705px;
  height: 526px;
  position: absolute;
  margin-left: 97px;
  margin-top: 35px;
  background-image: url('~@/assets/images/back.jpg');
  background-size: cover;
  overflow: hidden;
}
.bootbg {
  width: 900px;
}
#topmenu {
    width: 705px;
    height: 30px;
    position: absolute;
}
#clock {
    left: 610px;
    top: 4px;
    height: 30px;
    position: absolute;
    font: small-caps bold 1.4rem Helvetica Neue,Helvetica,Arial,sans-serif;
    color: white;
}
ul {
    list-style: none;
    padding: 0px;
    margin: 0px;
}
ul li {
    display: block;
    position: relative;
    float: left;
}
li ul {
    display: none;
}
ul li a {
    display: block;
    background: #DEDEDE;
    padding: 5px 10px 5px 10px;
    text-decoration: none;
    white-space: nowrap;
    color: #000;
}
ul li a:hover {
    background: #DEDEDE;
}
li:hover ul {
    display: block;
    position: absolute;
}
li:hover li {
    float: none;
}
li:hover a {
    background: #DEDEDE;
}
li:hover li a:hover {
    background: #1E9DFA;
}
#drop-nav li ul li {
    border-top: 0px;
}
.dockapps-row1 {
   position: absolute; 
   top: 100px; 
   left: 30px;
 }
 .dockapps-row2 {
   position: absolute; 
   top: 300px; 
   left: 30px;
 }
ul.dockicons li a {
    display: block;
    background: none;
    height: 100px;
    padding: 0 1px;
    margin: 0;
    transition: 0.15s linear;
    transition-property: -webkit-transform margin;
    -webkit-box-reflect: below 2px -webkit-gradient(linear, left top, left bottom, from(transparent), color-stop(0.7, transparent), to(rgba(255, 255, 255, .5)));
}
ul.dockicons li a img {
    width: 100px;
    background: none;
    padding-left: 50px;
}
ul.dockicons li:hover {
    margin-left: 9px;
    margin-right: 9px;
    z-index: 2;
    background: none;
}
ul.dockicons li:hover a {
    transform-origin: center bottom;
    transform: scale(1.5);
    background: none;
}
ul.dockicons li.nearby {
    margin-left: 6px;
    margin-right: 6px;
    z-index: 1;
    background: none;
}
ul.dockicons li.nearby a {
    transform-origin: center bottom;
    transform: scale(1.25);
    background: none;
}
@media (max-width: 767px) {
#warning-mobile {
  visibility: visible;
}
}
@media (min-width: 999px) {
#warning-desktop {
  visibility: visible;
}}
</style>
