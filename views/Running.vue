<template>
  <div class="running">
    <div id="desk">
       <div id="topmenu">
          <ul id="drop-nav">
            <li><a href="#"> <img src="@/assets/images/apple.png" class="a-logo"></a>
          <ul>
            <!-- länkar till funktion för att visa specifik komponent, skickar med
                 vilken komponent det gäller i samma funktion -->
            <li><a href="#" @click="Show('about')"><img src="@/assets/images/help.png" class="menuicon"> Om den här datorn</a></li>
            <li><a href="/turnoff">Stäng av...</a></li>
            <li id="5"><a href="/restart">Starta om...</a></li>
          </ul>
          </li>
          <li><a href="#"><b>Program</b></a>
            <ul>
              <li><a href="#" @click="Show('notes')"><img src="@/assets/images/anteck.png" class="menuicon"> Anteckningar</a></li>
              <li><a href="#" @click="Show('tunes')"><img src="@/assets/images/itunes.png" class="menuicon"> Tunes</a></li>
              <li><a href="#" @click="Show('photo')"><img src="@/assets/images/iphoto.png" class="menuicon"> Photo</a></li>
              <li><a href="#" @click="Show('webb')"><img src="@/assets/images/safari.png" class="menuicon"> Webb</a></li>
            </ul>
          </li>
          <li><a href="#"><b>Verktyg</b></a>
            <ul>
              <li><a href="#" @click="Show('settings')"><img src="@/assets/images/inst.png" class="menuicon"> Inställningar</a></li>
              <li><a href="#" @click="Show('activity')"><img src="@/assets/images/activity.png" class="menuicon"> Aktivitetskontroll</a></li>
            </ul>
          </li>
          <li><a href="#"><b>Hjälp</b></a>
            <ul>
              <li><a href="#" @click="Show('about')"><img src="@/assets/images/help.png" class="menuicon"> Om den här datorn</a></li>
            </ul>
          </li>
         </ul>
        <div class="speaker"><a href="#" @click="Mute()"><img id="speaker-ico" src="@/assets/images/speaker.png"></a></div>
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
      <div class="dockshelf">
       <img src="@/assets/images/dock.png">
      </div>
     <div>
      <center>
        <div class="dockapps">
          <ul class="dockicons">
            <!-- länkar till funktion för att visa specifik komponent, skickar med
                 vilken komponent det gäller i samma funktion, samma som högre upp
                 fast designad som en "dock" istället för en meny i överkant -->
            <li>
              <span>Tunes</span>
              <a href="#" @click="Show('tunes')"><img src="@/assets/images/itunes.png"></a>
            </li>
            <li>
              <span>Anteckningar</span>
              <a href="#" @click="Show('notes')"><img src="@/assets/images/anteck.png"></a>
            </li>
        <li>
              <span>Photo</span>
              <a href="#" @click="Show('photo')"><img src="@/assets/images/iphoto.png"></a>
            </li> 
            <li>
              <span>Webb</span>
              <a href="#" @click="Show('webb')"><img src="@/assets/images/safari.png"></a>
            </li>
            <li>
              <span>Inställningar</span>
              <a href="#" @click="Show('settings')"><img src="@/assets/images/inst.png"></a>
            </li>
            <li>
              <span>Aktivitetskontroll</span>
              <a href="#" @click="Show('activity')"><img src="@/assets/images/activity.png"></a>
            </li>
            <li>
              <span>Hjälp</span>
              <a href="#" @click="Show('about')"><img src="@/assets/images/help.png"></a>
            </li>
          </ul>
        </div>
      </center>
      </div>
       </div>
       <div>
        <img src="@/assets/images/back.png" class="bootbg">
      </div>
        <!-- visa en varning när användaren av någon anledning inte kan-,
             eller kan se mer- än tänkt upplösning och skickar med en 
             länk för att ge användaren bättre användarupplevelse beroende
             på öpplösning / skärmstorlek -->
        <div id="warning">
           <a href="#" @click="hidewarning"><img src="@/assets/images/white-close.png"></a>
          <p>Entering Pad mode!</p><a href="#" @click="pad">Go to pad Version!</a></div>
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
 pad(){
   this.$router.push('/pad')
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
//ger användaren möjlighet att vara kvar i vald upplösning
//även om min kod inte tycker den är optimal.
  hidewarning(){
 let warning = document.getElementById('warning')
    warning.style.visibility = "hidden"
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
#warning {
  background-color: red;
  position: fixed;
  top:180px;
  left:300px;
  width: 400px;
  height: 240px;
  text-align: center;
  font: small-caps bold 1.4rem Helvetica Neue,Helvetica,Arial,sans-serif;
  z-index: 30;
  visibility: hidden;
}
#warning img{
  position: relative;
  top:0;
  left: -165px;
  width: 50px;
  padding: 10px;
}
#desk {
  width: 898px;
  height: 510px;
  position: absolute;
  margin-left: 51px;
  margin-top: 38px;
  background-image: url('~@/assets/images/back.jpg');
  overflow: hidden;
}
.bootbg {
  width: 1000px;
}
#topmenu {
    width: 898px;
    height: 30px;
    position: absolute;
    background: #DEDEDE;
    font:  1.01rem  Helvetica Neue,Helvetica,Arial,sans-serif;
}
.a-logo {
  width: 14px; 
  height: 14px;
}
.menuicon {
 width: 18px;
 height: 18px;
 position: relative;
 top: 3px;
 padding-right: 2px;
}
#clock {
    left: 810px;
    top: 4px;
    height: 30px;
    position: absolute;
    font: small-caps bold 1.2rem  Helvetica Neue,Helvetica,Arial,sans-serif;
}
.speaker {
    left: 775px;
    height: 24px;
    padding-top: 4px;
    position: absolute;
}
.speaker img {
    width: 20px;
    height: 20px;
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
.dockshelf {
   position: absolute; 
   top: 460px; 
   left:260px;
 }
.dockshelf img{
  width: 385px;
  height: 50px;
 }
.dockapps {
   position: absolute; 
   top: 440px; 
   left: 275px;
 }
ul.dockicons li a {
    display: block;
    background: none;
    height: 50px;
    padding: 0 1px;
    margin: 0;
    transition: 0.15s linear;
    transition-property: -webkit-transform margin;
    -webkit-box-reflect: below 2px -webkit-gradient(linear, left top, left bottom, from(transparent), color-stop(0.7, transparent), to(rgba(255, 255, 255, .5)));
}
ul.dockicons li a img {
    width: 48px;
    background: none;
}
ul.dockicons li:hover {
    margin-left: 9px;
    margin-right: 9px;
    z-index: 200;
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
    z-index: 100;
    background: none;
}
ul.dockicons li.nearby a {
    transform-origin: center bottom;
    transform: scale(1.25);
    background: none;
}
ul.dockicons li span {
    background: rgba(0, 0, 0, 0.75);
    position: absolute;
    background: none;
    bottom: 80px;
    margin: 0 auto;
    display: none;
    width: auto;
    font-size: 11px;
    font-weight: bold;
    padding: 3px 6px;
    border-radius: 6px;
    color: #fff;
}
ul.dockicons li:hover span {
    display: block;
    background: none;
}
#tunes{
  background-color: red;
    position: absolute;
    width: 326px;
    overflow: hidden;
    height: 308px;
    top: 50px;
    left: 100px;
    border-radius: 10px 10px 0px 0px;
}

@media (max-width: 999px) {
#warning {
  visibility: visible;
}
}
@media (min-width: 1000px) {
#warning {
  visibility: hidden;
}}
</style>
