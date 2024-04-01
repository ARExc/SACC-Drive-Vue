import request from "@/utility/api/request";
const state = {
    file: null,
    fileName: '',
    fileSize: 0,
    isCreatesNewFolder: false,
    filePid: '',
    fileMd5: ''
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
    },
    setFilePid(state, filePid) {
        state.filePid = filePid;
    },
    setFileMd5(state, fileMd5) {
        state.fileMd5 = fileMd5;
    }
}
const actions = {
    startUpload(_, file) {
        return request()
    },
    upload({ commit }, file) {
        commit('setFile', file);
    },
    finishUpload({ commit }, file) {
        commit('setFile', null);
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}