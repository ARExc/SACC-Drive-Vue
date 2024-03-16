const state = {
    breadcrumb: [],
    breadcrumbVersion: 0, // 新增一个版本号，用于触发面包屑更新
    isPrivate: true,
    isPublic: false
}
const mutations = {
    addBreadcrumb(state, crumb) {
        state.breadcrumb.push(crumb);
        state.breadcrumbVersion++;
    },
    removeBreadcrumb(state, index) {
        state.breadcrumb.splice(index + 1);
        state.breadcrumbVersion++;
    },
    clearBreadcrumb(state) {
        state.breadcrumb = [];
    },
    setIsPrivate(state, isPrivate) {
        state.isPrivate = isPrivate;
    },
    setIsPublic(state, isPublic) {
        state.isPublic = isPublic;
    }

}
export default {
    namespaced: true,
    state,
    mutations
}