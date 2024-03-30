const getters = {
    isLoggedIn: state => state.user.isLoggedIn,
    getToken: state => state.user.token,
    file: state => state.file.file,
    breadcrumb: state => state.breadcrumb.breadcrumb,
    isPrivate: state => state.breadcrumb.isPrivate,
    isPublic: state => state.breadcrumb.isPublic,
    currentFolder: state => state.breadcrumb.breadcrumb[state.breadcrumb.breadcrumb.length - 1],
    filePid: state => state.file.filePid,
}
export default getters;