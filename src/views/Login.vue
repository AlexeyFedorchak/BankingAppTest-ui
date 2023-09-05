<script setup>
import { ref } from 'vue';
</script>

<script>
import axios from "axios";
import { IconSquareRoundedX } from '@tabler/icons-vue';

const errorMessage = ref('');

export default {
  components: {
    IconSquareRoundedX
  },
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    login() {
      errorMessage.value = '';
      axios.post('/auth/login', {
            email: this.email,
            password: this.password,
          },
          {
            'headers': {
              'Accept': 'application/json'
            }
          }
      ).catch(error => {
        if (error?.response?.data?.message) {
          errorMessage.value = error.response.data.message;
        }
      }).then((response) => {
        if (response) {
          localStorage.setItem('authToken', response.data.access_token)
          this.$router.push({path: '/dashboard'})
        }
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
        <div v-if="errorMessage" class="focus:outline-none px-6 py-2 mb-5 rounded text-white bg-red-400 flex justify-between items-center">
          <span>{{ errorMessage }}</span>
          <button @click="errorMessage = ''" class="focus:outline-none text-red-800 hover:text-white border-none">
            <IconSquareRoundedX :size="24" stroke-width="1" />
          </button>
        </div>
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
