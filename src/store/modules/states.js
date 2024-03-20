const state = {
    progress: 0,
    isStartUpload: false,
    isPause: false,
    isCancel:false
}
const mutations = {
    setProgress(state, progress) {
        state.progress = progress;
    },
    setStartUpload(state, isStartUpload) {
        state.isStartUpload = isStartUpload;
    },
    setIsPause(state, isSuspend) {
        state.isPause = isSuspend;
    },
    setIsCancel(state, isCancel) {
        state.isCancel = isCancel;
    }
}
export default {
    namespaced: true,
    state,
    mutations
}