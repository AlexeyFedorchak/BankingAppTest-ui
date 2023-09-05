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
      name: '',
      email: '',
      password: ''
    };
  },
  methods: {
    register() {
      errorMessage.value = '';
      axios.post('/auth/signup', {
            email: this.email,
            name: this.name,
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
          this.$router.push({path: '/login'})
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
      <p class="text-1xl mb-4 text-left">Create new account</p>
      <form @submit.prevent="register">
        <div v-if="errorMessage" class="focus:outline-none px-6 py-2 mb-5 rounded text-white bg-red-400 flex justify-between items-center">
          <span>{{ errorMessage }}</span>
          <button @click="errorMessage = ''" class="focus:outline-none text-red-800 hover:text-white border-none">
            <IconSquareRoundedX :size="24" stroke-width="1" />
          </button>
        </div>
        <div class="mb-4">
          <label for="name" class="block text-gray-700 font-semibold text-left">Name</label>
          <input
              v-model="name"
              type="text"
              id="name"
              name="name"
              placeholder="Enter name"
              class="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-400"
              required
          />
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
          <label for="terms" class="flex items-center">
            <input
                type="checkbox"
                id="terms"
                name="terms"
                class="form-checkbox text-blue-500 h-5 w-5"
                required
            />
            <span class="text-gray-700 ml-2">Agree the <router-link class="font-semibold text-blue-600" target='_blank' to="/terms-and-policy">terms and policy</router-link></span>
          </label>
        </div>
        <button
            type="submit"
            class="w-full mt-4 bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Create new account
        </button>
      </form>
    </div>
    <p class="mt-4 text-gray-400">Don't have account yet? <router-link class="font-semibold text-blue-600" to="/login">Sign In</router-link></p>
  </div>
</template>
