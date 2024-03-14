const getters = {
    isLoggedIn: state => state.user.isLoggedIn,
    getToken: state => state.user.token,
    isUpload: state => state.file.isUpload,
    file:state=>state.file.file,
    breadcrumb: state => state.breadcrumb.breadcrumb,
    isPrivate: state => state.breadcrumb.isPrivate,
    isPublic: state => state.breadcrumb.isPublic,
}
export default getters;