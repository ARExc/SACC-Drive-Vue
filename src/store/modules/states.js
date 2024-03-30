const state = {
    progress: 0,
    isStartUpload: false,
    isStartMove: false,
    isPause: false,
    isCancel:false,
}
const mutations = {
    setProgress(state, progress) {
        state.progress = progress;
    },
    setStartUpload(state, isStartUpload) {
        state.isStartUpload = isStartUpload;
    },
    setStartMove(state, isStartMove) {
        state.isStartMove = isStartMove;
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