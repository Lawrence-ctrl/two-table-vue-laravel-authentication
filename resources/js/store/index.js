import axios from "axios";

const state = {
    adminToken: localStorage.getItem('adminToken') || null,
    admin: JSON.parse(localStorage.getItem('admin')) || null
}

const getters = {
    getAdminToken: state => state.adminToken,
    getAdmin: state => state.admin,
}

const actions = {
    adminLogin(context,payload) {
        return new Promise((resolve,reject) => {
            axios.post(`/api/admin/login`,payload) 
            .then(response => {
                resolve(response)
                context.commit('ADMIN_LOGIN',response.data)
            })
            .catch(error => {
                reject(error)
            })
        })
    },
    adminForgotPassword(context,payload) {
        return new Promise((resolve,reject) => {
            axios.post(`/api/admin/forgotpassword`,payload) 
            .then(response => {
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
        })
    },
    adminFillCode(context,payload) {
        return new Promise((resolve,reject) => {
            axios.post(`/api/admin/fillcode`,payload) 
            .then(response => {
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
        })
    },
    adminResetPassword(context,payload) {
        return new Promise((resolve,reject) => {
            axios.post(`/api/admin/resetpassword`,payload) 
            .then(response => {
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
        }) 
    },
    adminRegister(context,payload) {
        return new Promise((resolve,reject) => {
            axios.post(`/api/admin/register`,payload) 
            .then(response => {
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
        })
    },
    adminVerified(context,payload) {
        return new Promise((resolve,reject) => {
            axios.get(`/api/admin/verified/${payload.email}/${payload.id}`) 
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                reject(error)
            })
        })
    }
}

const mutations = {
    ADMIN_LOGIN(state,payload) {
        state.adminToken = payload.adminToken
        localStorage.setItem('adminToken',payload.adminToken)
        state.admin = payload.admin
        localStorage.setItem('admin',JSON.stringify(payload.admin))
    }
}

export default {
    state,
    getters,
    actions,
    mutations
};