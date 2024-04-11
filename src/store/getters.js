const getters = {
    isLoggedIn: state => state.user.isLoggedIn,
    getToken: state => state.user.token,
    file: state => state.file.file,
    breadcrumb: state => state.breadcrumb.breadcrumb,
    isPrivate: state => state.breadcrumb.isPrivate,
    isPublic: state => state.breadcrumb.isPublic,
    //有可能数组中没有元素
    currentFolder: state => state.breadcrumb.breadcrumb.length - 1 > 0 ? state.breadcrumb.breadcrumb[state.breadcrumb.breadcrumb.length - 1] : null,
}
export default getters;