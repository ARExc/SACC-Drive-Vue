import file from './modules/file';
import user from './modules/user';
import getters from './getters';
import { createStore } from 'vuex';

const store=createStore({
    modules: {
        file,
        user
    },
    getters
})
export default store;
