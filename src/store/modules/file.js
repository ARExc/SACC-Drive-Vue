const state = {
    isUpload: false,
    file: null,
    fileType: '',
    isNew: false,
}

const mutations = {
    setUpload(state, isUpload) {
        state.isUpload = isUpload;
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