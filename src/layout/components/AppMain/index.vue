<template>  
    <router-view :key="key"/>
</template>
<script>
/** 
 * 公用 主窗口
 * @author LiQingSong
 */
export default {
  name: 'AppMain',
  computed: {
    key() {
        console.log('gegeg');
      return this.$route.fullPath;
    }
  }
};
</script>