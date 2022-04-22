import Vue from 'vue'
import Vuex from 'vuex'
import Home from './Home';
import Music from './Music';
import Blogdetail from './Blogdetail';
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        Home,
        Blogdetail,
        Music
    }
})