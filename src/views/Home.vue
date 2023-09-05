<script>
import { IconHome, IconCloudDownload, IconCloudUpload, IconTransfer, IconMailForward, IconLogout } from '@tabler/icons-vue';

export default {
  name: 'Home',
  components: {
    IconHome,
    IconCloudDownload,
    IconCloudUpload,
    IconTransfer,
    IconMailForward,
    IconLogout,
  },
  data() {
    return {
      activeTab: 'home',
      depositAmount: '',
      withdrawAmount: '',
      transferAmount: '',
      transferEmail: '',
    };
  },
  methods: {
    activateTab(index) {
      this.activeTab = index;
    },
    logout() {
      alert('Logout');
    },
    deposit() {

    },
    withdraw() {

    },
    transfer() {

    },
  },
};

</script>

<template>
  <div class="home min-h-screen w-full">
    <div class="bg-white text-left flex justify-center border-b">
      <h2 class="pl-3 py-3 w-9/12 max-md:flex max-md:justify-center font-semibold text-2xl">ABC Bank</h2>
    </div>
    <nav class="bg-white flex justify-center">
      <div class="flex items-center justify-between flex-wrap w-9/12">
          <button @click="activateTab('home')"
               :class="{ 'border-b-blue-500 text-blue-500': activeTab === 'home' }"
               class="focus:outline-none px-1 py-2 rounded-none rounded-t-lg cursor-pointer hover:border-b-blue-500 hover:text-blue-500 hover:border-transparent flex justify-center items-center">
            <IconHome :size="16" stroke-width="1" class="mr-1" />Home
          </button>
          <button @click="activateTab('deposit')"
               :class="{ 'border-b-blue-500 text-blue-500': activeTab === 'deposit' }"
               class="focus:outline-none px-1 py-2 rounded-none rounded-t-lg cursor-pointer hover:border-b-blue-500 hover:text-blue-500 hover:border-transparent flex justify-center items-center">
            <IconCloudUpload :size="16" stroke-width="1" class="mr-1"  />
            <span>Deposit</span>
          </button>
          <button @click="activateTab('withdraw')"
                  :class="{ 'border-b-blue-500 text-blue-500': activeTab === 'withdraw' }"
                  class="focus:outline-none px-1 py-2 rounded-none rounded-t-lg cursor-pointer hover:border-b-blue-500 hover:text-blue-500 hover:border-transparent flex justify-center items-center">
            <IconCloudDownload :size="16" stroke-width="1" class="mr-1"  />
            <span>Withdraw</span>
          </button>
          <button @click="activateTab('transfer')"
                  :class="{ 'border-b-blue-500 text-blue-500': activeTab === 'transfer' }"
                  class="focus:outline-none px-1 py-2 rounded-none rounded-t-lg cursor-pointer hover:border-b-blue-500 hover:text-blue-500 hover:border-transparent flex justify-center items-center">
            <IconMailForward :size="16" stroke-width="1" class="mr-1" />Transfer
          </button>
          <button @click="activateTab('statement')"
                  :class="{ 'border-b-blue-500 text-blue-500': activeTab === 'statement' }"
                  class="focus:outline-none px-1 py-2 rounded-none rounded-t-lg cursor-pointer hover:border-b-blue-500 hover:text-blue-500 hover:border-transparent flex justify-center items-center">
            <IconTransfer :size="16" stroke-width="1" class="mr-1"  />
            <span>Statement</span>
          </button>
          <button @click="logout()" class="focus:outline-none px-1 py-2 rounded-none rounded-t-lg cursor-pointer hover:border-b-blue-500 hover:text-blue-500 hover:border-transparent flex justify-center items-center">
            <IconLogout :size="16" stroke-width="1" />
            <span>Logout</span>
          </button>
      </div>
    </nav>

    <main>
      <div v-if="activeTab === 'home'" class="mt-4">

        <div class="text-left flex items-center flex-col border-collapse">
          <div class="pl-7 py-4 w-9/12 max-md:flex max-md:justify-center bg-white border border-gray-300 rounded-t-md">
            <h2>Welcome John Doe</h2>
          </div>
          <div class="w-full pl-7 py-3 w-9/12 max-md:flex max-md:justify-center bg-white border-x border-gray-300">
            <div class="inline-block w-1/4"><span class="text-gray-400 text-sm uppercase">Your id</span></div>
            <span>john.doe@gmail.com</span>
          </div>
          <div class="pl-7 py-3 w-9/12 max-md:flex max-md:justify-center bg-white border border-gray-300 rounded-b-md">
            <div class="inline-block w-1/4"><span class="text-gray-400 text-sm uppercase">Your balance</span></div>
            <span>20,000.00 INR</span>
          </div>
        </div>

      </div>
      <div v-if="activeTab === 'deposit'" class="mt-4">

        <div class="text-left flex items-center flex-col border-collapse">
          <div class="pl-7 py-4 w-9/12 max-md:flex max-md:justify-center bg-white border border-gray-300 rounded-t-md">
            <h2>Deposit Money</h2>
          </div>
          <div class="px-7 pt-3 pb-7 w-9/12 max-md:flex max-md:justify-center bg-white border-x border-b border-gray-300 rounded-b-md">
            <form @submit.prevent="deposit">
              <div class="mb-4">
                <label for="deposit-amount" class="block text-gray-700 font-semibold text-left">Amount</label>
                <input
                    v-model="depositAmount"
                    type="number"
                    id="deposit-amount"
                    name="depositAmount"
                    placeholder="Enter amount to deposit"
                    min="0"
                    class="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-400"
                    required
                />
              </div>
              <button
                  type="submit"
                  class="w-full mt-4 bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 focus:outline-none"
              >
                Deposit
              </button>
            </form>
          </div>
        </div>

      </div>
      <div v-if="activeTab === 'withdraw'" class="mt-4">

        <div class="text-left flex items-center flex-col border-collapse">
          <div class="pl-7 py-4 w-9/12 max-md:flex max-md:justify-center bg-white border border-gray-300 rounded-t-md">
            <h2>Withdraw Money</h2>
          </div>
          <div class="px-7 pt-3 pb-7 w-9/12 max-md:flex max-md:justify-center bg-white border-x border-b border-gray-300 rounded-b-md">
            <form @submit.prevent="withdraw">
              <div class="mb-4">
                <label for="withdraw-amount" class="block text-gray-700 font-semibold text-left">Amount</label>
                <input
                    v-model="withdrawAmount"
                    type="number"
                    id="withdraw-amount"
                    name="withdrawAmount"
                    placeholder="Enter amount to withdraw"
                    min="0"
                    class="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-400"
                    required
                />
              </div>
              <button
                  type="submit"
                  class="w-full mt-4 bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 focus:outline-none"
              >
                Withdraw
              </button>
            </form>
          </div>
        </div>

      </div>
      <div v-if="activeTab === 'transfer'" class="mt-4">

        <div class="text-left flex items-center flex-col border-collapse">
          <div class="pl-7 py-4 w-9/12 max-md:flex max-md:justify-center bg-white border border-gray-300 rounded-t-md">
            <h2>Transfer Money</h2>
          </div>
          <div class="px-7 pt-3 pb-7 w-9/12 max-md:flex max-md:justify-center bg-white border-x border-b border-gray-300 rounded-b-md">
            <form @submit.prevent="transfer">
              <div class="mb-4">
                <label for="transfer-email" class="block text-gray-700 font-semibold text-left">Email address</label>
                <input
                    v-model="transferEmail"
                    type="email"
                    id="transfer-email"
                    name="transferEmail"
                    placeholder="Enter email"
                    class="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-400"
                    required
                />
              </div>
              <div class="mb-4">
                <label for="transfer-amount" class="block text-gray-700 font-semibold text-left">Amount</label>
                <input
                    v-model="transferAmount"
                    type="number"
                    id="transfer-amount"
                    name="transferAmount"
                    placeholder="Enter amount to transfer"
                    min="0"
                    class="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-400"
                    required
                />
              </div>
              <button
                  type="submit"
                  class="w-full mt-4 bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 focus:outline-none"
              >
                Transfer
              </button>
            </form>
          </div>
        </div>

      </div>
      <div v-if="activeTab === 'statement'" class="mt-4">

        Statement

      </div>
    </main>

  </div>
</template>