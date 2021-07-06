<template>
  <div id="app" style="overflow-x:hidden">    
    <router-view/>
  </div>
</template>
<script>
export default {
  name: 'App'
};
</script>
<style>
@import "./assets/css/style.css";
#app{
  max-width: 1400px;
  margin: 0 auto;
}
</style>
