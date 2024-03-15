import file from './modules/file';
import user from './modules/user';
import getters from './getters';
import breadcrumb from './modules/breadcrumb';
import {createStore} from 'vuex';
import VuexPersistence from "vuex-persist";

const vuexLocal = new VuexPersistence({
    key: 'vuex',
    storage: window.localStorage,
});

const store = createStore({
    getters,
    modules: {
        file,
        user,
        breadcrumb
    },
    plugins: [vuexLocal.plugin]
})
export default store;
