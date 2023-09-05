import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import axios from "axios";

createApp(App)
    .use(router)
    .mount('#app')

router.beforeEach((to, from) => {
    const isAuthenticated = localStorage.getItem('authToken');
    if (
        !isAuthenticated &&
        to.name !== 'Login'
    ) {
        return { name: 'Login' }
    }
})

axios.interceptors.request.use(config => {
    const token = localStorage.getItem("authToken");
    config.headers["Authorization"] = `Bearer ${token}`;
    return config;
});
