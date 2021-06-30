<template>
    <div>
        <div id="indexlayout">
            <layout-index-left />
             <!-- :class="{'fiexd-header': siteFiexdHeader}" -->
            <div id="indexlayout-right">
                <layout-index-right-top />
                <div class="indexlayout-right-main" >
                <app-main />
                
                </div>
            </div>  
            <!-- <site-settings />   -->
        </div>
        <layout-index-right-footer />
    </div>
</template>
<script>
/** 
 * Index 框架
 * @author LiQingSong
 */
import { mapGetters } from 'vuex';
import AppMain from '../components/AppMain';
import LayoutIndexLeft from './LayoutIndexLeft';
import LayoutIndexRightTop from './LayoutIndexRightTop';
import LayoutIndexRightFooter from './LayoutIndexRightFooter';
// import SiteSettings from '../components/SiteSettnigs';
export default {
  name: 'LayoutIndex',
  components: {
    AppMain,
    LayoutIndexLeft,
    LayoutIndexRightTop,
    LayoutIndexRightFooter
    // SiteSettings
  },
  computed: {
    ...mapGetters([
      'siteFiexdHeader'
    ])
  },
  mounted() { 
  }
};
</script>
<style lang="scss" scoped>
@import "~@/assets/css/variables.scss";
#indexlayout {
  display: flex;
//   height: 100vh;
//   overflow: hidden;
  background: #F6F8FC;
//   background: #222834;
}
#indexlayout-right {
  position: relative;
  flex: 1;
//   overflow: auto;
  background-color: $mainBgColor;
  &.fiexd-header{
    display: flex;
    flex-direction: column;
    .indexlayout-right-main {
      flex: 1;
      overflow: auto;
    }
  }

}
</style>