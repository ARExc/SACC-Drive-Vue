const state = {
    isUpload: false,
    fileType: null,

}

const mutations = {
    setUpload(state, isUpload) {
        state.isUpload = isUpload;
    },
    setFileType(state, fileType) {
        state.fileType = fileType;
    }
}

export default {
    namespaced: true,
    state,
    mutations
}