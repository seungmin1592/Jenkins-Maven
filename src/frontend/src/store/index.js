import { createStore } from "vuex";
import createPersistedState from 'vuex-persistedstate';

import { TabList } from "@/store/module/TabList";

const store = new createStore({
    modules: { TabList },
    plugins: [createPersistedState({
        paths: ["TabList"]
    })],
});

export default store
