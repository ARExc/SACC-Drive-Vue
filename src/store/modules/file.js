const state = {
    isUpload: false,
    file: null,
    fileType: '',
}

const mutations = {
    setUpload(state, isUpload) {
        state.isUpload = isUpload;
    },
    setFile(state, file) {
        state.file = file;
    },
    setFileType(state, fileType) {
        state.fileType = fileType;
    },
}

export default {
    namespaced: true,
    state,
    mutations
}