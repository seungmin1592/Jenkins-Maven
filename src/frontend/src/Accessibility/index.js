export default {
  install: (Vue) => {
    Vue.config.globalProperties.$typeChk = ''
    // 키보드 접근성 - 모달 열린 후 시점
    Vue.config.globalProperties.$modalOpened = (type) => {
      const btns = document.querySelectorAll('button, a, select, input')
      const modalInnerBtns = document.querySelectorAll('.vfm__overlay + .vfm__container button,.vfm__overlay + .vfm__container a,.vfm__overlay + .vfm__container select,.vfm__overlay + .vfm__container input')

      try {
        // 전체 요소 포커스 제외
        btns.forEach(btns => {
          btns.setAttribute('tabindex','-1')
        })
        modalInnerBtns.forEach( (btns,idx) => {
          // 모달 포함 요소 포커스 가능
          btns.setAttribute('tabindex','0')
          // 모달 내부 포커싱 순환
          if(idx == 0) {
            btns.setAttribute('data-start',true)
          }else if (idx == modalInnerBtns.length-1) {
            btns.setAttribute('data-end',true)
          }
        })
        // 예외 팝업 - 사이드 바코드 팝업 포커스
        document.querySelectorAll('#barcodeArea button').forEach(btns => {
          btns.removeAttribute('tabindex')
        })
        // 모달 열기 액션 버튼 기억
        if(type == 'dateRangeSet') {
          Vue.config.globalProperties.$typeChk = type
        } else {
          document.querySelector('button[data-focus=true]').classList.add('modalOpenBtn')
        }

      } catch {
        return false
      }
    }

    // 키보드 접근성 - 모달 닫히기 전
    Vue.config.globalProperties.$modalBeforeClose = () => {
      const btns = document.querySelectorAll('button, a, select, input')

      try {
        // 모든 요소 포커스 세팅 삭제
        btns.forEach(btns => {
          btns.removeAttribute('tabindex')
          btns.removeAttribute('data-start')
          btns.removeAttribute('data-end')
        })
        // 기존 element로 포커싱 변경 - 외부로 포커싱 빠지는 현상 방지
        if (Vue.config.globalProperties.$typeChk == 'dateRangeSet' && document.querySelectorAll('.date-view-area').length > 0) {
          document.querySelector('.date-view-area').focus()
        } else {
          document.querySelector('.modalOpenBtn').focus()
          document.querySelector('.modalOpenBtn').classList.remove('modalOpenBtn')
        }
        
        Vue.config.globalProperties.$typeChk = ''
        
        btns.removeAttribute('data-focus')
      } catch {
        return false
      }
    }

    // 페이지 이동 시 tabindex 초기화 - 페이지 이동 후 팝업 종료 처리 안될 경우 방지
    Vue.config.globalProperties.$tabIndexReset = () => {
      const btns = document.querySelectorAll('button, a, select, input')

      try {
        btns.forEach(btns => {
          btns.removeAttribute('tabindex')
        })
      } catch {
        return false
      }      
    }

    // 모달 바텀시트 열기 액션 커스텀
    Vue.config.globalProperties.$botSheetOpened = (type) => {
      const botModal = document.querySelectorAll('.bot-modal')

      try {
        botModal.forEach(botModal => {
          botModal.classList.add('active')
        })
        Vue.config.globalProperties.$modalOpened(type)
      } catch {
        return false
      }      
    }

    // 모달 바텀시트 닫기 액션 커스텀
    Vue.config.globalProperties.$botSheetClose = () => {
      const botModal = document.querySelectorAll('.bot-modal')

      try {
        botModal.forEach(botModal => {
          botModal.classList.remove('active')
        })
        Vue.config.globalProperties.$modalBeforeClose()
      } catch {
        return false
      }      
    }

    // v-calendar, v-date-picker 대체 텍스트 적용
    Vue.config.globalProperties.$calendarSet = () => {
      try {
        const leftArrow = document.createElement('span')
        const rightArrow = document.createElement('span')
  
        
        leftArrow.classList.add('text-hide')
        rightArrow.classList.add('text-hide')
  
        leftArrow.append('이전달')
        rightArrow.append('다음달')
  
        document.querySelector('.vc-arrow.is-left').append(leftArrow)
        document.querySelector('.vc-arrow.is-right').append(rightArrow)
      } catch {
        return false
      }
    }

    // 보안키패드 활성화
    Vue.config.globalProperties.$keyPadOn = () => {
      const btns = document.querySelectorAll('button, a, select, input')
      const keyPad = document.querySelectorAll('.security-keypad-wrap .pad')

      try {
        // 키패드 활성화
        document.querySelector('.security-keypad-wrap').classList.add('active')

        // 전체 요소 포커스 제외
        btns.forEach(btns => {
          btns.setAttribute('tabindex','-1')
        })

        // 전체 요소 포커스 제외
        keyPad.forEach( keyPad => {
          keyPad.setAttribute('tabindex','0')
        })

      } catch {
        return false
      }
    }

    // 보안키패드 비활성화
    Vue.config.globalProperties.$keyPadOff = () => {
      const btns = document.querySelectorAll('button, a, select, input')

      try {
       // 키패드 활성화
       document.querySelector('.security-keypad-wrap').classList.remove('active')

       // 전체 요소 tabindex 삭제
       btns.forEach(btns => {
         btns.removeAttribute('tabindex')
       })

      } catch {
        return false
      }
    }
  }
}