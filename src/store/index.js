import file from './modules/file';
import user from './modules/user';
import getters from './getters';
import breadcrumb from './modules/breadcrumb';
import {createStore} from 'vuex';

const store = createStore({
    getters,
    modules: {
        file,
        user,
        breadcrumb
    },
})
export default store;
