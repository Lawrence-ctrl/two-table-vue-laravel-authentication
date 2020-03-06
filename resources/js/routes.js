import AdminDashboard from './components/admin/AdminDashboardComponent.vue'
import AdminLogin from './components/admin/AdminLoginComponent.vue'
import AdminForgot from './components/admin/AdminForgotComponent.vue'
import AdminFillCode from './components/admin/AdminCodeFillComponent.vue'
import AdminResetPassword from './components/admin/AdminResetPasswordComponent.vue'
import AdminRegister from './components/admin/AdminRegister.vue'
import AdminVerified from './components/admin/AdminVerified.vue'
import AdminVerify from './components/admin/AdminNotVerify.vue'
export const routes = [
    {
        path: '/admin/login',
        name: 'admin-login',
        component: AdminLogin,
        meta: {
            requiresNoAdminAuth: true
        }
    },
    {
        path: '/admin/register',
        name: 'admin-register',
        component: AdminRegister,
        meta: {
            requiresNoAdminAuth: true
        }
    },
    {
        path: '/admin/verify',
        name: 'admin-verify',
        component: AdminVerify,
        meta: {
            requiresNoAdminAuth: true
        }
    },
    {
        path: '/admin/verified',
        name: 'admin-verified',
        component: AdminVerified,
        props: (route) => ({ query: route.query.email } && { query: route.query.id }),
        meta: {
            requiresNoAdminAuth: true
        }
    },
    {
        path: '/admin/forgot',
        name: 'admin-forgot',
        component: AdminForgot,
        meta: {
            requiresNoAdminAuth: true
        }
    },
    {
        path: '/admin/fillcode',
        name: 'admin-fillcode',
        component: AdminFillCode,
        meta: {
            requiresNoAdminAuth: true
        }
    },
    {
        path: '/admin/resetform',
        name: 'admin-resetform',
        component: AdminResetPassword,
        props: (route) => ({ query: route.query.token }),
        meta: {
            requiresNoAdminAuth: true
        }
    },
    {
        path: '/admin/dashboard',
        name: 'admin-dashboard',
        component: AdminDashboard,
        meta: {
            requiresAdminAuth: true
        }
    },
    
]