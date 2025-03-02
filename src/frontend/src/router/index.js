import { createWebHistory, createRouter } from "vue-router";
import axios from 'axios';
import routes from './routes';

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { top: 0, left: 0 };
        }
    },
});

// 토큰 유효성 검증 함수

// 로그인 페이지 접근 시 리디렉션 처리 함수

function handleLoginRedirect(to, next) {
    next();
}


export default router;
