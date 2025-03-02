<template>
  <div class="side-bar-wrap" :class="{ foldActive: foldActive }">
    <div class="logo-wrap">
      <img v-if="foldActive" src="" alt="" class="type-thin"/>
      <img v-else src="" alt="" class="type-wide"/>
    </div>

    <div class="menu-wrap">
      <dl class="menu-list">
        <template v-for="(dep01, idx01) in menuList" :key="idx01">
          <dt class="depth01-title-wrap">
            <button type="button" class="depth01-title" :class="{ active: dep01.foldActive  }" @click="childHiSet(idx01)">
              <span>{{ dep01.depth01.title }}</span>
            </button>
          </dt>
          <dd class="depth02-list-wrap" style="height: 0;">
            <ul class="depth02-list">
              <li class="depth02" v-for="(dep02, idx02) in dep01.depth02" :key="idx02">
                <template v-if="dep02.depth03">
                  <button type="button" @click="dep03Toggle($event, idx01, idx02)" class="depth02-link" :class="{ active: dep02.foldActive  }">
                    <span>{{ dep02.title }}</span>
                    <img src="@/assets/images/icn/icn-arrow-down-white.svg" alt="">
                  </button>
                  <ul class="depth03-list">
                    <li class="depth03" v-for="(dep03, idx03) in dep02.depth03" :key="idx03">
                      <button type="button" @click="tabPush(dep03)" class="depth03-link" :class="{ active:pathChk(dep03.path)}">
                        {{ dep03.title }}
                      </button>
                    </li>
                  </ul>
                </template>
                <template v-else>
                  <button type="button" @click="tabPush(dep02)" class="depth02-link" :class="{ active:pathChk(dep02.path)}">
                    <span>{{ dep02.title }}</span>
                  </button>
                </template>
              </li>
            </ul>
          </dd>
        </template>
      </dl>
    </div>
  </div>
  <div class="header">
    <div class="top-menu-wrap">
      <div class="left-side-option-wrap">
        <button type="button" class="fold-btn" @click="foldActive = !foldActive">
          <img src="../assets/images/icn/side-menu-open-blue.svg" alt="">
        </button>
      </div>

      <ul class="depth01-wrap" >
        <li class="depth01-list" v-for="(dep01, idx01) in menuList" :key="idx01" @mouseover="gnbMouseOver(idx01)" @mouseout="gnbMouseOut(idx01)">
          <button type="button" class="depth01-title" @mouseover="dep03Close()">{{ dep01.depth01.title }}</button>
          <ul class="depth02-wrap">
            <li class="depth02-list" v-for="(dep02, idx02) in dep01.depth02" :key="idx02">
              <template v-if="dep02.depth03">
                <button type="button" class="depth02-link arrow" @mouseover="dep03Oepn($event)">{{ dep02.title }}</button>
                <ul class="depth03-list">
                  <li class="depth03" v-for="(dep03, idx03) in dep02.depth03" :key="idx03">
                    <button type="button" @click="tabPush(dep03)" class="depth03-link" :class="{ active:pathChk(dep03.path)}">
                      {{ dep03.title }}
                    </button>
                  </li>
                </ul>
              </template>
              <template v-else>
                <button type="button" class="depth02-link" @mouseover="dep03Close($event)" @click="tabPush(dep02)">{{ dep02.title }}</button>
              </template>
            </li>
          </ul>
        </li>
      </ul>

      <div class="right-side-wrap">
        <span class="link-txt-box">
          <span>고객지원센터</span>
          <a href="tel:0000-0000">0000-0000</a>
        </span>

        <div class="user-info-box">
          <span class="info-view">
            {{ userId }}님
          </span>
          <button type="button" class="btn type-logout" @click="logout">
            <img src="../assets/images/icn/icn-logout-black.svg" alt="">
          </button>
        </div>
      </div>
    </div>
  </div>

  <div class="tab-link-wrap">
    <button type="button" class="tab-link" v-for="(data, idx) in tabList" :key="idx" :class="{ active:pathChk(data.path) }" @click="tabChange(idx)">
      <span class="title">{{ data.title }}</span>
      <button type="button" class="del-btn" @click.stop="closeTab(idx)" v-if="data.title != 'HOME'" >
        <img src="../assets/images/icn/icn-x-black.svg" alt="">
      </button>
    </button>
  </div>
</template>

<script>

export default {
  name: 'Menu',
  data: () => ({
    menuList: [],
    userId: '',
    foldActive: false,
    retryCount: 0,
    maxRetries: 5
  }),

  mounted() {
    this.getUserInfo();
    this.generateMenuList();
  },
  computed: {
    tabList() {
      return this.$store.getters["TabList/getTabList"];
    },
  },

  watch : {
    tabList(value) {
      this.tabList = value;
    },
  },

  methods: {
    generateMenuList() {
      const data = JSON.parse(localStorage.getItem('menuList'));

      const tempMenuList = [];

      if (data) {
        this.retryCount = 0;

        data.forEach(item => {
          let parentMenu = tempMenuList.find(menu => menu.depth01.title === item.depth01Folder);
          if (!parentMenu) {
            parentMenu = {
              depth01: { title: item.depth01Folder },
              depth02: [],
              foldActive: false,
            };
            tempMenuList.push(parentMenu);
          }

          if (item.depth02Folder) {
            let depth02 = parentMenu.depth02.find(d => d.title === item.depth02Folder);
            if (!depth02) {
              depth02 = {
                title: item.depth02Folder,
                depth03: [],
                foldActive: false,
              };
              parentMenu.depth02.push(depth02);
            }
            depth02.depth03.push({
              title: item.depth02Link,
              path: item.depth02Url,
            });
          } else {
            parentMenu.depth02.push({
              title: item.depth02Link,
              path: item.depth02Url,
            });
          }
        });
      } else if (this.retryCount < this.maxRetries) {
        setTimeout(() => {
          this.retryCount++;
          this.generateMenuList();
        }, 500); // Retry every 500 ms
      }

      this.menuList = tempMenuList;
    },

    childHiSet(idx) {

      this.menuList[idx].foldActive = !this.menuList[idx].foldActive

      const setTarget = document.querySelectorAll('.side-bar-wrap .depth02-list-wrap')
      const menuList = this.menuList[idx].depth02.length
      let listHi = 0

      if (this.menuList[idx].foldActive) {
        listHi = menuList * 40
        listHi -= 4

        setTarget.forEach((target,targetIdx) => {
          if (idx == targetIdx) {
            target.setAttribute('style', 'height:'+listHi+'px')
          } else {
            this.menuList[targetIdx].foldActive = false
            target.setAttribute('style', 'height:0px')

            this.menuList[targetIdx].depth02.forEach(dep02 => {
              if (dep02.foldActive) {
                dep02.foldActive = false
              }
            })

            for ( let ele of  target.firstElementChild.children) {
              if(ele.lastElementChild.classList.contains('depth03-list'))
                ele.lastElementChild.setAttribute('style','height:0')
            }
          }
        })
      } else {
        setTarget.forEach((target,targetIdx) => {
          if (idx == targetIdx) {
            target.setAttribute('style', 'height: 0px')
            // child all fold
            this.menuList[targetIdx].depth02.forEach(dep02 => {
              if (dep02.foldActive) {
                dep02.foldActive = false
              }
            })

            for ( let ele of  target.firstElementChild.children) {
              if(ele.lastElementChild.classList.contains('depth03-list'))
                ele.lastElementChild.setAttribute('style','height:0')
            }
          }
        })
      }
    },
    dep03Toggle(event, idx01, idx02) {
      this.menuList[idx01].depth02[idx02].foldActive = !this.menuList[idx01].depth02[idx02].foldActive
      const dep02 = document.querySelectorAll('.side-bar-wrap .depth02-list-wrap')
      const dep02Hi = dep02[idx01].clientHeight
      const dep03Lth = this.menuList[idx01].depth02[idx02].depth03.length
      const dep03Ele = event.target.parentElement.nextElementSibling
      let listHi = (dep03Lth * 40) - 4

      if (this.menuList[idx01].depth02[idx02].foldActive) {
        dep02[idx01].setAttribute('style','height:'+ (dep02Hi + listHi) +'px')
        dep03Ele.setAttribute('style','height:'+listHi+'px')
      } else {
        dep02[idx01].setAttribute('style','height:'+ (dep02Hi - listHi) +'px')
        dep03Ele.setAttribute('style','height: 0px')
      }

    },
    dep03Oepn(e) {
      const nextEle = e.target.nextElementSibling
      const menuList = document.querySelectorAll('.depth02-wrap .depth03-list')

      if (nextEle) {
        menuList.forEach(target => {
          target.classList.remove('active')
        })
        e.target.nextElementSibling.classList.add('active')
      }
    },
    dep03Close() {
      const dep03List = document.querySelectorAll('.depth02-wrap .depth03-list')

      dep03List.forEach(target => {
        target.classList.remove('active')
      })
    },
    gnbMouseOver(idx) {
      const setTarget = document.querySelectorAll('.top-menu-wrap .depth02-wrap')

      setTarget.forEach((target,targetIdx) => {
        if (idx == targetIdx) {
          target.classList.add('active')
        }
      })
    },
    gnbMouseOut(idx) {
      const setTarget = document.querySelectorAll('.top-menu-wrap .depth02-wrap')

      setTarget.forEach((target,targetIdx) => {
        if (idx == targetIdx) {
          target.classList.remove('active')
        }
      })
    },
    tabChange(idx) {
      this.tabList.forEach((target,targetIdx) => {
        if (idx == targetIdx) {
          target.active = true
          this.$router.push(this.tabList[idx].path)
        } else {
          target.active = false
        }
      })
    },
    pathChk(path) {
      if (path === this.$route.fullPath) {
        return true
      } else {
        return false
      }
    },
    tabPush(data) {
      if (!this.tabList.some(list => list.path === data.path)) {

        if (this.tabList.length == 10) {
          // 최대 갯수
          this.tabList.splice(1,1)
        }
        this.tabList.push({
          title: data.title,
          path: data.path
        });

        this.$store.commit('TabList/setTabList', this.tabList);
      }

      this.$router.push(data.path)
    },
    getUserInfo() {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (userInfo) {
        this.userId = userInfo.userName + "(" + userInfo.userId + ")";
      } else {
        console.log("No user info found in localStorage.");
      }
    },
    logout() {
      const token = localStorage.getItem('userToken');
      if (token) {
        // localStorage.clear();
        localStorage.removeItem('userToken');
        localStorage.removeItem('userInfo');
        localStorage.removeItem('menuList');

        this.$router.push("/Login");
      }
    },
    closeTab(idx){
      this.tabList = this.$store.getters["TabList/getTabList"];
      let removeTabInfo = this.tabList[idx];

      this.tabList.splice(idx,1)

      this.$store.commit('TabList/setTabList', this.tabList);

      if(removeTabInfo.path == this.$route.path){
        this.$router.push(this.tabList[this.tabList.length - 1])
      }
    }

  },
}
</script>
