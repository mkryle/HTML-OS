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
        <img src="@/assets/images/iphone.jpg" class="bootbg" usemap="#Map">
         <map name="Map">
           <!-- en länk för att kunna stänga av apparaten,
                den kan väl inte vara igång hela tiden eller!? -->
  <area shape="rect" coords="0,60,20,145" alt="Start" href="/mobileturnoff">
</map> <div class="starttxt"><p>&lt;&lt; click to turn off</p></div>
      </div>
      <!-- visa en varning när användaren av någon anledning inte kan-,
             eller kan se mer- än tänkt upplösning och skickar med en 
             länk för att ge användaren bättre användarupplevelse beroende
             på öpplösning / skärmstorlek -->
           <div id="warning">
           <a href="#" @click="hidewarning"><img src="@/assets/images/white-close.png"></a>
          <p>Entering Pad mode!</p><a href="#" @click="pad">Go to Pad Version!</a></div>
       <div class="wrongmode"><p>wrong resolution? <a href="#" @click="pad">pad --&gt;</a></p></div>
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
   //länk till pad-versionen
 pad() {
this.$router.push('/pad')
 },
//ger användaren möjlighet att vara kvar i vald upplösning
//även om min kod inte tycker den är optimal.
  hidewarning(){
 let warning = document.getElementById('warning')
    warning.style.visibility = "hidden"
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
left: 2px; 
top:  110px;
font: small-caps bold 0.8rem  Helvetica Neue,Helvetica,Arial,sans-serif;
color: #FF0004;
writing-mode: vertical-rl;
text-orientation: mixed;
}
#warning {
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
#warning img {
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
  font: small-caps bold 0.7rem Helvetica Neue,Helvetica,Arial,sans-serif;
  position: relative;
  left: 0px;
  color: white;
}
.dockicons  {
text-align: center;
}
#desk {
margin-top: 97px;
margin-left: 30px;
width:355px;
height:630px;
  position: absolute;
  background-image: url('~@/assets/images/back.jpg');
  background-size: cover;
  overflow: visible;
}

.bootbg {
  width: 310px;
}
#topmenu {
    width: 100%;
    height: 30px;
    position: absolute;
}
#clock {
    left: 64%;
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
   top: 70px; 
   left: 0px;
 }
 .dockapps-row2 {
   position: absolute; 
   top: 180px; 
   left: 0px;
 }
  .dockapps-row2 span {
 padding: 3px;
 }
ul.dockicons li a {
    display: block;
    background: none;
    height: 45px;
    margin: 0;
    transition: 0.15s linear;
    transition-property: -webkit-transform margin;
    -webkit-box-reflect: below 2px -webkit-gradient(linear, left top, left bottom, from(transparent), color-stop(0.7, transparent), to(rgba(255, 255, 255, .5)));
}
ul.dockicons li a img {
    width: 40px;
    background: none;
    padding-left: 0px;
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
@media (min-width: 767px) {
#warning {
  visibility: visible;
}
}
@media (min-width: 320px) {
#desk {
margin-top: 72px;
margin-left: 22px;
 width:266px;
  height:471px;
  position: absolute;
  }
  ul.dockicons li a img {
    padding-left: 0px;
    width: 39px;
}
    .dockapps-row2 span {
 padding: 0px;
 }
}

@media (min-width: 375px) {
.starttxt{
position: fixed;
left: 3px; 
top:  130px;
font: small-caps bold 0.9rem  Helvetica Neue,Helvetica,Arial,sans-serif;
}
.bootbg {
  width: 365px;
}
#desk {
margin-top: 85px;
margin-left: 26px;
 width:313px;
height:554px;
position: absolute;
}
ul.dockicons li a img {
    padding-left: 10px;
}
  .dockapps-row2 span {
 padding: 10px;
 }
 #clock {
    left: 69%;
}
}
@media (min-width: 425px) {
.starttxt{
position: fixed;
left: 2px; 
top:  150px;
font: small-caps bold 1rem  Helvetica Neue,Helvetica,Arial,sans-serif;
}
.bootbg {
  width: 415px;
}
#desk {
margin-top: 97px;
margin-left: 30px;
width:355px;
height:630px;
position: absolute;
}
ul.dockicons li a img {
    padding-left: 10px;
    width: 55px;
}
  .dockapps-row2 span {
 padding: 10px;
 }
 #clock {
    left: 73%;
}
  .dockapps span {
 padding: 10px;
 }
}
</style>
