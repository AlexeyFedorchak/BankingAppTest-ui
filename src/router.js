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
        },
        {
            path: '/register',
            component: SignUp,
        },
        {
            path: '/terms-and-policy',
            component: TermsAndPolicy,
        },
        {
            path: "/:catchAll(.*)",
            component: NotFound,
        },
    ],
})
