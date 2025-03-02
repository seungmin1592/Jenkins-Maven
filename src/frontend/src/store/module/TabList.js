export const TabList = {
    namespaced: true,
    state: () => ({
        tabList: [{ title: 'HOME', path: '/Home' }]
    }),
    mutations: {
        setTabList(state, value) {
            state.tabList = value;
        },
        resetTab(state) {
            state.tabList = [{ title: 'HOME', path: '/Home' }]
        }
    },
    getters: {
        getTabList(state) {
            return state.tabList
        }
    },

}