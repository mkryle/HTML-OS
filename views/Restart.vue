<template>
  <div class="boot">
    <div class="bootdesk"> 
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
// svart skärm 1 sekund för att imetera avstängning,
// sen redirect till uppstart av apparat
created() {
 setTimeout(() => {
this.$router.push('/boot')
 },1000);
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
  background: black;
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
