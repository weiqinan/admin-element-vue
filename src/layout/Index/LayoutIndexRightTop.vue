<template>
        <div id="indexlayout-right-top" :class="{'enableTopNav': !siteTopNavEnable}">
            <div class="indexlayout-right-top-top">
               <div class="indexlayout-flexible" :class="{'active': isCollapse}" @click="toggleSideBar">
                 <svg-icon icon-class="s-fold" />
               </div>
               <div class="indexlayout-top-menu">
                    <el-input
                        placeholder="搜索"
                        prefix-icon="el-icon-search"
                        v-model="input2" style="width:240px;">
                    </el-input>
                  <!-- <el-scrollbar class="horizontal-scrollbar">
                      <template v-if="siteTopNavEnable">

                          <template v-for="route in permission_routes">
                            <app-link v-if="!route.hidden" :to="route.path" :key="route.path" class="indexlayout-top-menu-li" :class="{'active': getTopMenuActive === route.path}">
                                {{ route.meta.title }}
                            </app-link>
                          </template>

                      </template> 
                      <breadcrumb v-else class="breadcrumb" />   
                  </el-scrollbar> -->
               </div>
               <div class="indexlayout-top-menu-right">
                    <el-dropdown placement="bottom">
                        <span class="el-dropdown-link">
                            <img class="money-ico" src="../../assets/img/ico_money.png" />
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item @click.native="turnToAccount">我的交易账户（0）</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>

                    <!-- <router-link class="index-layout-message" to="/account?mode=mes" title="消息"> -->
                    <el-dropdown placement="bottom">
                        <span class="el-dropdown-link">
                            <!-- <svg-icon icon-class="message" /> -->
                            <img class="money-ico" src="../../assets/img/ico_ring.png" />
                            <!-- <el-badge :value="msgtotal" :max="10" class="index-layout-message-item"></el-badge> -->
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item  @click.native="turnToMes(0)">交易动态 （0）</el-dropdown-item>
                            <el-dropdown-item  @click.native="turnToMes(1)">账户信息 （6）</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <!-- </router-link> -->

                    <span style="color:#364064;">
                        <!-- <span class="el-dropdown-link-text">{{ name }}</span> -->
                        <img class="avartar-ico" src="../../assets/img/user_avartar.png" />
                        <span v-if="logoutShow" class="link-item" style="margin-left:20px;" @click="logout">退出</span>
                        <span v-else class="link-item" style="margin-left:20px;" @click="login">登录</span>
                    </span>

                    <!-- <el-dropdown>
                        <span class="el-dropdown-link" :title="name">
                            <span class="el-dropdown-link-text">{{ name }}</span>
                            <span style="margin-left:20px;" @click.native="logout">退出</span>
                            <i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>个人信息</el-dropdown-item>
                            <el-dropdown-item divided  @click.native="logout">退出</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown> -->
               </div>
            </div>
            <!-- <div class="indexlayout-right-top-bot" v-if="siteTopNavEnable">
                <div class="indexlayout-right-top-bot-home">
                  <i class="el-icon-location-outline" />
                </div>
                <breadcrumb class="breadcrumb" />               
            </div> -->
        </div>
</template>
<script>
import { mapGetters } from 'vuex';
// import Breadcrumb from '@/components/Breadcrumb';
// import AppLink from '@/components/Link';
import { getBelongTopMenuPath } from '@/utlis/permission';
export default {
  name: 'LayoutIndexRightTop',
  components: {
    // Breadcrumb
    // AppLink
  },
  data() {
      return {
          input2: '',
          logoutShow: false
      };
  },
  computed: {
    ...mapGetters([
      'permission_routes',
      'siteTopNavEnable',
      'sidebarOpened',
      'name',
      'msgtotal'
    ]),
    isCollapse() {
      return !this.sidebarOpened;
    },
    getTopMenuActive() {
      let route = this.$route;
      return getBelongTopMenuPath(route);
    }
  },
  created() {
      const userId = localStorage.getItem('webUserId') || '';
      if (userId) {
          this.logoutShow = true;
      } else {
          this.logoutShow = false;
      }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar');
    },
    login() {
        this.$router.push({ path: '/login' });
    },
    turnToMes(index) {
        this.$router.push({ path: `/account?mode=mes&current=${index}` });
    },
    turnToAccount() {
        this.$router.push({ path: '/account?currentMenu=manage' });
    },
    async logout() {
        localStorage.setItem('webUserId', '');
        this.$message({
          message: '退出成功',
          type: 'success'
        });
        this.logoutShow = false;
        location.reload();
        // this.$router.push('');
    //   try {
    //       const { isExternal, siteLoginRouter } = await this.$store.dispatch('user/logout');
    //       if (!isExternal){
    //         this.$router.push(siteLoginRouter + "?redirect=" + this.$route.fullPath);
    //       }
    //   } catch (error) {
    //       this.$message.error(error || 'Has Error');
    //   }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@/assets/css/variables.scss";
.link-item{
    cursor: pointer;
}
.money-ico{
    display: inline-block;
    height: 14px;
}
.el-dropdown{
    margin-right: 20px;
    line-height: 20px;
}
.el-dropdown-menu{
    background-color: #F6F8FC;
}
.el-dropdown-menu--small .el-dropdown-menu__item{
    padding: 8px 20px;
}
.el-dropdown-menu__item:not(.is-disabled):hover, .el-dropdown-menu__item:focus {
    background-color: #fff;
    color: #6E4FF4;
}
.el-popper .popper__arrow:after {
    border-top-color: #F6F8FC;
}
.avartar-ico{
    display: inline-block;
    height: 30px;
    margin-bottom: -8px;
}
#indexlayout-right-top {
    width: 100%;
    // height: ($headerHeight+$headerBreadcrumbHeight);
    height: $headerHeight;
    box-shadow: 0 1px 4px rgba(0,21,41,.08);
    z-index: 9;
    .indexlayout-right-top-top{
      display: flex;
      width: 100%;
      height: $headerHeight;
      background-color: $leftBgColor;
      color: $topMenuFontColor;
      .indexlayout-flexible,
      .indexlayout-top-menu-right,
      .indexlayout-top-menu{
        height: $headerHeight;
        line-height: $headerHeight;
      }
      .indexlayout-flexible{
        width: $headerHeight;
        text-align: center;
        color: #424242;
        cursor: pointer;
        &:hover{
        //   background-color: $topMenuHoverBgColor;
        //   color: $topMenuHoverFontColor;
        color: #3BA8ED;
        }
        &.active{
            svg {
                transform: rotate(180deg);
            }
        }
      }
      .indexlayout-top-menu-right{
        width: 200px;
        .index-layout-message{
          display: inline-block;
          margin-right: 10px;
          color: #424242;
          .index-layout-message-item {
              /deep/ .el-badge__content{
                  border: none;
              }
          }
        }
        .el-dropdown-link {
            display: inline-block;
            cursor: pointer;
            color: #424242;
            .el-dropdown-link-text{
                display: block;
                max-width: 56px;
                height: $headerHeight;
                overflow: hidden;
                float: left;
                white-space: nowrap;
                text-overflow: ellipsis;
                word-break: break-all;
            }
        }
      }
      .indexlayout-top-menu{
        flex: 1;
        display: flex;
        overflow: hidden;
        /* overflow-x: auto; */
        .indexlayout-top-menu-li{
          display: inline-block;
          padding: 0 15px;
          height: ($headerHeight)-3;
          text-decoration: none;
          color: $topMenuFontColor;
          font-size: 15px;
          border-bottom: solid 3px transparent;
          &:hover,
          &.active{
            background-color: $topMenuHoverBgColor;
            color: $topMenuHoverFontColor;
            border-bottom-color: $leftMenuActiveBgColor;
          }
          &.active{
            background-color: $topMenuActiveBgColor;
          }
        }
        .breadcrumb{
          line-height: $headerHeight;
          margin-left: 10px;
          .el-breadcrumb__item{
            display: inline-block;
            float: none;
          }
        }
      }
    }
    .indexlayout-right-top-bot{
      display: flex;
      width: 100%;
      height: $headerBreadcrumbHeight;
      background-color: $mainBgColor;
      .indexlayout-right-top-bot-home {
        margin-right: 5px;
        width: $headerBreadcrumbHeight;
        height: $headerBreadcrumbHeight;
        line-height: $headerBreadcrumbHeight;
        text-align: center;
      }
      .breadcrumb{
        line-height: $headerBreadcrumbHeight;
      }
    }
    &.enableTopNav {
      height: $headerHeight;
      .indexlayout-right-top-top {
         background-color: $BreadcrumbBgColor;
         color: $BreadcrumbFontColor;

          .indexlayout-flexible{
            &:hover{
              background-color: $mainBgColor;
              color: $BreadcrumbFontColor;
            }
            
          }

      }
      .indexlayout-top-menu-right{
        .index-layout-message{
            color: $BreadcrumbFontColor;
        }
        .el-dropdown-link {
            color: $BreadcrumbFontColor;
        }
      }
    }
}
</style>