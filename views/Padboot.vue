<template>
  <div class="boot">
    <div class="bootdesk">
     <img src="@/assets/images/load.gif" class="bootload"> 
    </div>
    <div>
      <img src="@/assets/images/pad.jpg" class="bootbg">
    </div>
  </div>
</template>

<script>
export default {
  name: 'Boot',
  components: {
  },
// "loading" skärm i 3 sekunder för att imetera uppstart,
// då den läses in för fort, sen redirect till pad-OS'et.
// det här skapar mer "feeling" i produkten!
created() {
 setTimeout(() => {
this.$router.push('/pad')
 },3000);
  }
}
</script>

<style scoped>
.bootdesk {
  width: 705px;
  height: 526px;
  position: absolute;
  margin-left: 97px;
  margin-top: 35px;
  background-image: url('~@/assets/images/bootback.jpg');
  background-size:contain;
  overflow: hidden;
}
.bootbg {
  width: 900px;
}
.bootload {
  width: 35px;
  padding-left: 328px;
  padding-top: 250px;
}
.boot {
  width:900px;
}
.bootbg {
  width: 900px;
}
</style>
