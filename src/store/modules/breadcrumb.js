const state = {
    breadcrumb: [],
    isPrivate: true,
    isPublic: false
}
const mutations = {
    addBreadcrumb(state, crumb) {
        state.breadcrumb.push(crumb);
    },
    removeBreadcrumb(state, index) {
        state.breadcrumb.splice(index + 1);
    },
    setIsPrivate(state, isPrivate) {
        state.isPrivate = isPrivate;
    },
    setIsPublic(state, isPublic) {
        state.isPublic = isPublic;
    }

}
const actions = {}
export default {
    namespaced: true,
    state,
    mutations
}