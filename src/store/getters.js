
const getters = {
    isLoggedIn: state => state.isLoggedIn,
    getToken: state => state.token,
    isUpload: state => state.isUpload,
    fileType: state => state.fileType,
}
export default getters;