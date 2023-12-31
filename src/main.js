import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import axios from "axios";
import PrimeVue from "primevue/config";
import CustomTailwind from "./primeVueTailwind";

createApp(App)
    .use(router)
    .use(PrimeVue, { unstyled: true, pt: CustomTailwind })
    .mount('#app')

router.beforeEach((to, from) => {
    const isAuthenticated = localStorage.getItem('authToken');
    if (
        !isAuthenticated
        && to.name !== 'Login'
        && to.name !== 'Register'
        && to.name !== 'TermsAndPolicy'
    ) {
        return { name: 'Login' }
    }
})

axios.interceptors.request.use(config => {
    const token = localStorage.getItem("authToken");
    config.headers["Authorization"] = `Bearer ${token}`;
    return config;
});

axios.defaults.baseURL = import.meta.env.VITE_API_URL + '/api';

axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response?.status === 401) {
            this.$router.push({name: 'Login'})
        }

        return Promise.reject(error);
    }
);
