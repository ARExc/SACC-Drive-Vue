const getters = {
    isLoggedIn: state => state.user.isLoggedIn,
    getToken: state => state.user.token,
    isUpload: state => state.file.isUploaded,
    file: state => state.file.file,
    breadcrumb: state => state.breadcrumb.breadcrumb,
    isPrivate: state => state.breadcrumb.isPrivate,
    isPublic: state => state.breadcrumb.isPublic,
    currentFolder: state => state.breadcrumb.breadcrumb[state.breadcrumb.breadcrumb.length - 1],
}
export default getters;