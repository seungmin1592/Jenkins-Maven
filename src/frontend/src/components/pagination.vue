<template>
  <div class="pagination-area">
    <button type="button" class="pagination-prev"
            :disabled="page == 1"
            @click="this.searchQuery(page - 1)">이전
    </button>
    <div class="pagination-list">
      <button type="button" class="pagination-item"
              :class="{'page-active': pageNumber == page}"
              v-for="(pageNumber, index) in showPageGroup" :key="index"
              @click="this.searchQuery(pageNumber)"
              :disabled="page == pageNumber"
            >
        {{pageNumber}}
      </button>
    </div>
    <button type="button" class="pagination-next"
            :disabled="page == pages.length || pages.length == 0"
            @click="this.searchQuery(page + 1)">다음
    </button>
  </div>
</template>


<script>
export default {
  props: {
    searchData: {
      type : Object,
      require: true
    },
    pagingInfo: {
      type : Object,
      require: true
    }
  },
  data() {
    return {
      page: 1, // 현재 페이지
      perPage: 10, // 페이지의 데이터 ROW
      pages: [], // 전체 페이지 배열
      pageG : 5, // 화면에 보여질 페이지 갯수
      pageGroup : [],  // pageG로 구분한 배열 ([[1,2,3,4,5],[6,7,8,9,10])
      gIdx : 0, // 전체 페이지 중에서 pageG로 나눈 그룹의 갯수
      lastPage : 0,
      showPageGroup : [], // 현재 페이지에서 보여지는 페이지 배열
      totalItems: 0, // 총 Item 수
      itemsLength : 0,
    }
  },
  watch : {
    searchData(){
      this.paginate(this.searchData)
    },
    pagingInfo(value){
      this.page = value.page
      this.perPage = value.perPage
    }
  },
  methods:{
    paginate(list) {
      // list가 빈 객체이거나 undefined/null일 때 예외 처리
      if (!list || Object.keys(list).length === 0) {
        this.page = 1;
        this.perPage = 10;
        this.totalItems = 0;
        this.itemsLength = 0;
        this.pages = [];
        this.pageGroup = [];
        this.showPageGroup = [];
        return [];
      }

      this.page = list.currentPage;
      this.perPage = list.records;
      this.totalItems = list.totalRecord;
      this.itemsLength = list.rows.length;
      this.pages = [];

      for (let index = 1; index <= list.totalPage; index++) {
        this.pages.push(index);
      }

      this.pageGroup = [];

      this.gIdx = Math.ceil(list.totalPage / this.pageG);
      let startNum = 0;
      for (let i = 0; i < this.gIdx; i++) {

        this.pageGroup.push([])
        for(let j = 0; j < this.pageG; j++){
          if(this.pages[startNum] != null){
            this.pageGroup[i].push(this.pages[startNum])
          }
          startNum ++;
        }

      }
      this.showPage();

      this.$parent.page = this.page;
      this.$parent.perPage = this.perPage;

      return list.rows;
    },
    showPage(){
      let page = 0;
      for(let i=0; i<this.gIdx; i++){
        if(this.pageGroup[i].includes(this.page)){
          page = i;
          break;
        }
      }
      this.showPageGroup = this.pageGroup[page];
    },

    searchQuery(page){
      this.$emit('searchQuery', page);
    }
  },

}
</script>
