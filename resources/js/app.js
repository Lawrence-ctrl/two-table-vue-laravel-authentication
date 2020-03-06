/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

import Vuex from 'vuex'
import Data from "./store/index"
import { routes } from "./routes"
import VueRouter from 'vue-router'
import vuetify from "./vuetify/main";
import VueI18n from 'vue-i18n';

Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(VueI18n)

//routes
const router = new VueRouter({
    mode: "history",
    routes
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAdminAuth)) {
        if (store.getters.getAdminToken == null) {
            next({
                path: "/admin/login"
            });
        } else {
            next();
        }
    } else {
        next();
    }

    if (to.matched.some(record => record.meta.requiresNoAdminAuth)) {
        if (store.getters.getAdminToken !== null) {
            next({
                path: "/admin/dashboard"
            });
        } else {
            next();
        }
    } else {
        next();
    }
})
/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.component('example-component', require('./components/ExampleComponent.vue').default);
Vue.component('user-view', require('./components/user/UserMasterComponent.vue').default);
Vue.component('admin-view', require('./components/admin/AdminMasterComponent.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */


 //vuex
const store = new Vuex.Store({
    modules: {
        Data
    }
});

const app = new Vue({
    el: '#app',
    router,
    store,
    vuetify
});
