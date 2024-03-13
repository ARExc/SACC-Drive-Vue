const state = {
    token: null,
    isLoggedIn: false,

}
const mutations = {
    setToken(state, token) {
        state.token = token;
        state.isLoggedIn = token !== null;
    },
    logout(state) {
        state.token = null;
        state.isLoggedIn = false;
    },
}
export default {
    namespace: true,//当namespaced设置为true时，当前的Vuex模块就会成为一个命名空间模块。这意味着模块内部的所有getters、actions和mutations都会根据模块的路径被注册在全局命名空间下，这样做可以避免不同模块之间的命名冲突。
    state,
    mutations
}