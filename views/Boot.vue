<template>
  <div class="boot">
    <div class="bootdesk">
     <img src="@/assets/images/load.gif" class="bootload"> 
    </div>
    <div>
      <img src="@/assets/images/back.png" class="bootbg">
    </div>
  </div>
</template>

<script>
export default {
  name: 'Boot',
  components: {
  
  },
// "loading" skärm i 3 sekunder för att imetera uppstart,
// då den läses in för fort, sen redirect till OS'et.
// det här skapar mer "feeling" i produkten!
created() {
 setTimeout(() => {
this.$router.push('/running')
 },3000);
  }

}
</script>

<style scoped>
.bootdesk {
  width: 898px;
  height: 510px;
  position: absolute;
  margin-left: 51px;
  margin-top: 38px;
  background-image: url('~@/assets/images/bootback.jpg');
}
.bootload {
  width: 40px;
  padding-left: 425px;
  padding-top: 330px;
}
.boot {
  width:1000px;
}
.bootbg {
  width: 1000px;
}
</style>
