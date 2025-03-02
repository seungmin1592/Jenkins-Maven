<script>
export default {
  components: {},
  props: {
    title: {
      type: String,
      default: "",
    },
    searchBtnShow: {
      type: Boolean,
      default: true,
    },
  },
  data () {
    return {
      customTitle : '',
    }
  },
  mounted() {

    let menuList = JSON.parse(localStorage.getItem("menuList"))
    let menu = menuList.filter(menu => menu.depth02Url == this.$route.fullPath)[0];
    this.customTitle = menu.depth02Link

    this.btnDisplayChk("SearchBtnFn", menu.depth02ViewFn, "flex")
    this.btnDisplayChk("DeleteBtnFn", menu.depth02DeleteFn, "inline-block")
    this.btnDisplayChk("ExcelBtnFn", menu.depth02ExcelFn, "inline-block")
    this.btnDisplayChk("SaveBtnFn", menu.depth02SaveFn, "inline-block")
    this.btnDisplayChk("Remark1BtnFn", menu.depth02Remark1Fn, "inline-block")
    this.btnDisplayChk("Remark2BtnFn", menu.depth02Remark2Fn, "inline-block")
    this.btnDisplayChk("Remark3BtnFn", menu.depth02Remark3Fn, "inline-block")
    this.btnDisplayChk("Remark4BtnFn", menu.depth02Remark4Fn, "inline-block")

  },
  methods : {

    btnDisplayChk(id, yn, style){
      let btnId = document.getElementById(id)

      if (btnId != null) {
        if(yn == 'N'){
          if (btnId != null) {
            btnId.style.display = "none";
          }
        } else {
          btnId.style.display = style;
        }
      }

    },

    closeTab(){
      let tabList = this.$store.getters["TabList/getTabList"];

      for (let i = 0; i < tabList.length; i++) {

        if(tabList[i].path == this.$route.path){
          tabList.splice(i, 1);

          this.$store.commit('TabList/setTabList', tabList);

          if (i - 1 < 0) {
            this.$router.push(tabList[0].path);
          } else {
            this.$router.push(tabList[i -1].path);
          }
        }

      }
    },
    reload(){
      window.location.reload();
    },
    searchQuery(){
      this.$emit('searchQuery');
    }

  }
};
</script>

<template>
  <div class="main-cont-header-wrap">
    <p class="page-title">{{ customTitle }}</p>
    <div class="side-btn-area">
      <button type="button" class="btn" v-if="searchBtnShow" @click="searchQuery" id="SearchBtnFn">
        <img src="@/assets/images/icn/icn-search-white.svg" alt="">
        조회
      </button>
      <button type="button" class="btn" @click="reload">
        <img src="@/assets/images/icn/icn-reset-white.svg" alt="">
        새로고침
      </button>
      <button type="button" class="btn" @click="closeTab">
        <img src="@/assets/images/icn/icn-exit-white.svg" alt="">
        닫기
      </button>
    </div>
  </div>
</template>
