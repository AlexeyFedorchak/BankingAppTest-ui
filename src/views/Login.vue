<script>
import axios from "axios";

export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    login() {
      axios.post(import.meta.env.VITE_API_URL + '/api/auth/login', {
            email: this.email,
            password: this.password,
          },
          {
            'headers': {
              'Accept': 'application/json'
            }
          }
      ).then((response) => {
        localStorage.setItem('authToken', response.data.access_token)
        this.$router.push({path: '/dashboard'})
      })
    }
  }
};
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-100">
    <h1 class="text-2xl font-semibold mb-6">ABC Bank</h1>
    <div class="bg-white p-8 rounded shadow-md w-96">
      <p class="text-1xl mb-4 text-left">Login to your account</p>
      <form @submit.prevent="login">
        <div class="mb-4">
          <label for="email" class="block text-gray-700 font-semibold text-left">Email address</label>
          <input
              v-model="email"
              type="email"
              id="email"
              name="email"
              placeholder="Enter email"
              class="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-400"
              required
          />
        </div>
        <div class="mb-6">
          <label for="password" class="block text-gray-700 font-semibold text-left">Password</label>
          <input
              v-model="password"
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              class="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-400"
              required
          />
        </div>
        <div class="mb-4">
          <label for="remember" class="flex items-center">
            <input
                type="checkbox"
                id="remember"
                name="remember"
                class="form-checkbox text-blue-500 h-5 w-5"
            />
            <span class="text-gray-700 ml-2">Remember me</span>
          </label>
        </div>
        <button
            type="submit"
            class="w-full mt-4 bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Sign in
        </button>
      </form>
    </div>
    <p class="mt-4 text-gray-400">Don't have account yet? <router-link class="font-semibold text-blue-600" to="/register">Sign Up</router-link></p>
  </div>
</template>
