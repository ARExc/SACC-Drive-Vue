const state = {
    file: null,
    fileName: '',
    fileSize: 0,
    isCreatesNewFolder: false,
}

const mutations = {
    setFile(state, file) {
        state.file = file;
    },
    setFileName(state, fileName) {
        state.fileName = fileName;
    },
    setFileSize(state, fileSize) {
        state.fileSize = fileSize;
    },
    setIsCreateNewFolder(state, isNew) {
        state.isCreatesNewFolder = isNew;
    }
}

export default {
    namespaced: true,
    state,
    mutations
}