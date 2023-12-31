import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import SignUp from './views/SignUp.vue'
import TermsAndPolicy from './views/TermsAndPolicy.vue'
import NotFound from './views/NotFound.vue'

export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/dashboard',
            component: Home,
        },
        {
            path: '/login',
            component: Login,
            name: 'Login'
        },
        {
            path: '/register',
            component: SignUp,
            name: 'Register'
        },
        {
            path: '/terms-and-policy',
            component: TermsAndPolicy,
            name: 'TermsAndPolicy'
        },
        {
            path: "/:catchAll(.*)",
            component: NotFound,
        },
    ],
})
