const state = {
    isStartUpload: false,
    isUploaded: false,
    file: null,
    fileType: '',
    isNew: false,
}

const mutations = {
    setStartUpload(state, isStartUpload) {
        state.isStartUpload = isStartUpload;
    },
    setUpload(state, isUpload) {
        state.isUploaded = isUpload;
    },
    setFile(state, file) {
        state.file = file;
    },
    setIsNew(state, isNew) {
        state.isNew = isNew;
    }
}

export default {
    namespaced: true,
    state,
    mutations
}