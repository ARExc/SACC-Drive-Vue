const state = {

    isUploaded: false,
    file: null,
    fileName: '',
    fileSize: 0,
    isNew: false,
}

const mutations = {

    setUpload(state, isUpload) {
        state.isUploaded = isUpload;
    },
    setFile(state, file) {
        state.file = file;
    },
    setFileName(state, fileName) {
        state.fileName = fileName;
    },
    setFileSize(state, fileSize) {
        state.fileSize = fileSize;
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