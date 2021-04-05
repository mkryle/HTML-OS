<template>
<!-- lägg till id, ref & funktion för att kunna flytta div -->
   <div class="photo" ref="moveMydiv" id="move-my-div-container" @mousedown="dragMyDiv">
       <div class="photo-border">
           <!-- lägg till en stäng knapp med funktion för att "stänga div'en" -->
           <div class="exit-btn"> 
           <a href="#" @click="hide()"><img src="@/assets/images/close.png"></a>
           </div><center>
              <div class="title">
            <img src="@/assets/images/iphoto.png"></div>
            Photo
            </center>
        </div>
        <div id="inside">
         <!-- funktioner för att ändra bilden som visas när man klickar på den
              varje nummer representerar varsin bild 1-6 -->
         <a href="#" @click="changebg('1')"><img src="@/assets/images/back.jpg"></a>
         <a href="#" @click="changebg('2')"><img src="@/assets/images/back2.jpg"></a>
         <a href="#" @click="changebg('3')"><img src="@/assets/images/back3.jpg"></a>
         <a href="#" @click="changebg('4')"><img src="@/assets/images/back4.jpg"></a>
         <a href="#" @click="changebg('5')"><img src="@/assets/images/back5.jpg"></a>
         <a href="#" @click="changebg('6')"><img src="@/assets/images/back6.jpg"></a>
        </div>
      <div id="ontop">
        <!-- lägg till en stäng knapp med funktion för att "stänga den öppna bilden -->
      <div class="close-btn"> 
           <a href="#" @click="closeImg()"><img src="@/assets/images/white-close.png"></a>
           </div>
        </div>
  </div>
</template>

<script>
export default {
  name: 'photo',

   methods: {
    // eftersom detta är en child komponent så ber vi 'högkvarteret'
    // om att göm demma komponenten
   hide() {
      this.$emit('photo-hide')
      return
    },
    // funktion för att ändra bilden som visas med ett nummer som i sin
    // tur representerar bildernas filnamn ex "back3.jpg"
    changebg(number){
      let image = document.getElementById('ontop')
      image.style.visibility = 'visible'
       let bg = document.getElementById('ontop')
    bg.style.backgroundImage = "url('http://kryle.se/data/images/back" + number + ".jpg')"
    },
    // funktion för att "stänga den öppna bilden (eller gömma:)
    closeImg(){
      let image = document.getElementById('ontop')
      image.style.visibility = 'hidden'
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
.photo {
    background: #E9E9E9;
    position: absolute;
    top: 50px;
    width: 410px;
    height: 260px;
    left: 200px;
    border-radius: 10px 10px 0px 0px;
    z-index: 10;
}
.photo-border {
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
height: 16px;
  }
.title {
  position:absolute; 
  left:160px;
  padding-top:1px;
}
.title img{
height: 18px;
width: 18px;
}
#inside {
   position: absolute;
  top: 50px;
  left: 0;
  background-color: #E9E9E9;
  height: 170px;
  width: 410px;
 visibility: visible;
}
#inside img {
  width: 120px;
  padding: 8px;
}
#ontop {
  background-image: url('~@/assets/images/back.jpg');
  background-size: 100% 100%;
  position: absolute;
  top: 30px;
  left: 6px;
  width: 394px;
  height: 224px;
  visibility: hidden;
}
#ontop p {
  padding: 100px;

}
.close-btn {
  position:absolute; 
  left:4px; 
  padding-top:4px;
  }
.close-btn img {
width: 20px;
height: 20px;
  }
  
@media (min-width: 320px) and (max-width: 374px) { 
   .title {
  left: 90px;
}
 .photo {
    position: absolute;
    top: 0px;
    width: 210px;
    height: 260px;
    left: 0px;
    border-radius: 0px 0px 0px 0px;
    width: 100%;
    height: 200px;
    top: 0px;
    left: 0px;
}
.photo-border {
 background:#DEDEDE; 
 width:100%; 
 height:20px; 
 border-radius: 0px 0px 0px 0px;
}
#inside {
  padding-top: 0px;
   position: absolute;
  top: 20px;
  left: 10;
  background-color: #E9E9E9;
  height: 451px;
  width: 100%;
  visibility: visible;
  overflow: scroll;
}
#inside img {
  width: 235px;
  padding: 15px;
}
#ontop {
  background-image: url('~@/assets/images/back.jpg');
  background-size:cover;
  position: absolute;
  top: 0px;
  left: 0px;
    width: 100%;
    height: 471px;
  visibility: hidden;
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
}}
@media (min-width: 375px) and (max-width: 424px)  { 
   .title {
  left: 116px;
}
 .photo {
    width: 100%;
    height: 300px;
    top: 0px;
    left: 0px;
}
.photo-border {
 background:#DEDEDE; 
 width:100%; 
 height:20px; 
 border-radius: 0px 0px 0px 0px;
}
#inside {
  padding-top: 0px;
   position: absolute;
  top: 20px;
  left: 10;
  background-color: #E9E9E9;
  height: 534px;
  width: 100%;
  visibility: visible;
  overflow: scroll;
}
#inside img {
  width: 270px;
  padding: 20px;
}
#ontop {
  background-image: url('~@/assets/images/back.jpg');
  background-size:cover;
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 554px;
  visibility: hidden;
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
}}
@media (min-width: 425px) and (max-width: 767px) { 
   .title {
  left: 136px;
}
 .photo {
    width: 100%;
    height: 300px;
    top: 0px;
    left: 0px;
}
.photo-border {
 background:#DEDEDE; 
 width:100%; 
 height:20px; 
 border-radius: 0px 0px 0px 0px;
}
#inside {
  padding-top: 0px;
   position: absolute;
  top: 20px;
  left: 10;
  background-color: #E9E9E9;
  height: 609px;
  width: 100%;
  visibility: visible;
  overflow: scroll;
}
#inside img {
  width: 300px;
  padding: 25px;
}
#ontop {
  background-image: url('~@/assets/images/back.jpg');
  background-size:cover;
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 629px;
  visibility: hidden;
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
}}

@media (min-width: 768px) and (max-width: 999px) {

  .photo {
    background: #E9E9E9;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    border-radius: 0px 0px 0px 0px;
    z-index: 10;
}
.photo-border {
 background:#DEDEDE; 
 width:100%;
 height:20px; 
 border-radius: 0px 0px 0px 0px;
}
  .title {
  position:absolute; 
  left:248px;
  padding-top:1px;
}
.exit-btn {
position:absolute; 
left:254px; 
top: 1090px;
overflow: visible;
} 
.exit-btn img {
width: 90px;
height:90px;
}

#inside {
  padding-top: 100px;
   position: absolute;
  top: 50px;
  left: 10;
  background-color: #E9E9E9;
  height: 913px;
  width: 100%;
 visibility: visible;
}
#inside img {
  width: 280px;
  padding: 8px;
}
#ontop {
  background-image: url('~@/assets/images/back.jpg');
  background-size:cover;
  position: absolute;
  top: 0px;
  left: 0px;
    width: 100%;
    height: 1063px;
  visibility: hidden;

}
}

@media (min-width: 768px) and (max-width: 999px) {
.photo {
    background: #E9E9E9;
    position: absolute;
    width: 100%;
    height: 584px;
    top: 0px;
    left: 0px;
    border-radius: 0px 0px 0px 0px;
    z-index: 10;
}
.photo-border {
 background:#DEDEDE; 
 width:782px;
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
  left:350px;
  padding-top:1px;
}
.title img{
height: 18px;
width: 18px;
}

#inside {
   position: absolute;
  top: 50px;
  left: 10;
  background-color: #E9E9E9;
  height: 554px;
  width: 780px;
 visibility: visible;
}
#inside img {
  width: 218px;
  padding: 8px;
}
#ontop {
  background-image: url('~@/assets/images/back.jpg');
  background-size: 100% 100%;
  position: absolute;
  top: 0px;
  left: 0px;
    width: 782px;
    height: 584px;
  visibility: hidden;

}
#ontop p {
  padding: 100px;

}
.close-btn {
  position:absolute; 
  left:4px; 
  padding-top:4px;
  }
.close-btn img {
width: 50px;
height:50px;
  }
}
</style>
