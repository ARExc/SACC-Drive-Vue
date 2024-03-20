const state = {
    progress: 0,
    isStartUpload: false,
}
const mutations = {
    setProgress(state, progress) {
        state.progress = progress;
    },
    setStartUpload(state, isStartUpload) {
        state.isStartUpload = isStartUpload;
    },
}
export default {
    namespaced: true,
    state,
    mutations
}