<template>
  <div class="wrap default-wrap">

    <Menu></Menu>

    <div class="main-cont-bg" >
      <div class="main-cont-outer-box">
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component" >
            </component>
          </keep-alive>
        </router-view>
      </div>
    </div>

    

  </div>
</template>

<script>
import Menu from "../components/Menu.vue";


export default {
  name: "LayoutDefault",
  components: {
    Menu,
  }
};
</script>
