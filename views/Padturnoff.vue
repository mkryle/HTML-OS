<template>
  <div class="boot">
    <div class="bootdesk">
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
// svart skärm 1 sekund för att imetera avstängning,
// sen redirect till avstängd apparat
created() {
 setTimeout(() => {
this.$router.push('/startpad')
 },1000);
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
  background: black;
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
