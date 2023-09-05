<script setup>
import { ref } from 'vue';

const perPageOptions = ref([
  { name: '5', code: 5 },
  { name: '10', code: 10 },
  { name: '20', code: 20 },
  { name: '50', code: 50 },
]);
</script>

<script>
import { IconHome, IconCloudDownload, IconCloudUpload, IconTransfer, IconMailForward, IconLogout, IconChevronRight, IconChevronsRight, IconChevronLeft, IconChevronsLeft, IconSquareRoundedX } from '@tabler/icons-vue';
import axios from "axios";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Dropdown from 'primevue/dropdown';

const activePage = ref(1);
const lastPage = ref(1);
const perPage = ref({ name: '5', code: 5 });

const transferError = ref('');
const depositError = ref('');
const withdrawError = ref('');

export default {
  name: 'Home',
  components: {
    IconHome,
    IconCloudDownload,
    IconCloudUpload,
    IconTransfer,
    IconMailForward,
    IconLogout,
    IconChevronRight,
    IconChevronsRight,
    IconChevronLeft,
    IconChevronsLeft,
    IconSquareRoundedX,
    DataTable,
    Column,
    Dropdown
  },
  data() {
    this.activateTab('home')
    return {
      activeTab: 'home',
      id: '',
      balance: '',
      depositAmount: '',
      withdrawAmount: '',
      transferAmount: '',
      transferEmail: '',
      statements: [],
    };
  },
  methods: {
    activateTab(index) {
      this.activeTab = index;
      switch (index) {
        case 'home': this.home(); break;
        case 'statement': this.statement(); break;
      }
    },
    logout() {
      axios.get('/auth/logout',{
        'headers': {
          'Accept': 'application/json'
        }
      }).then((response) => {
        localStorage.removeItem('authToken')
        this.$router.push({path: '/login'})
      })
    },
    home() {
      axios.get('users/me',{
        'headers': {
          'Accept': 'application/json'
        }
      })
          .then((response) => {
            this.id = response.data.data.email;
            this.balance = response.data.data.balance.amount;
      })
    },
    deposit() {
      depositError.value = '';
      axios.post('/money/deposit',{
        'amount': this.depositAmount
      }, {
        'headers': {
          'Accept': 'application/json'
        }
      }).catch(error => {
        if (error?.response?.data?.message) {
          depositError.value = error.response.data.message;
        }
      }).then((response) => {
        if (response) {
          this.activateTab('home')
        }
      })
    },
    withdraw() {
      withdrawError.value = '';
      axios.post('money/withdraw',{
        'amount': this.withdrawAmount
      }, {
        'headers': {
          'Accept': 'application/json'
        }
      }).catch(error => {
        if (error?.response?.data?.message) {
          withdrawError.value = error.response.data.message;
        }
      }).then((response) => {
        if (response) {
          this.activateTab('home')
        }
      })
    },
    transfer() {
      transferError.value = '';
      axios.post('/money/transfer',{
        'amount': this.transferAmount,
        'email': this.transferEmail,
      }, {
        'headers': {
          'Accept': 'application/json'
        }
      }).catch(error => {
        if (error?.response?.data?.message) {
          transferError.value = error.response.data.message;
        }
      }).then((response) => {
        if (response) {
          this.activateTab('home')
        }
      });
    },
    pagination(index) {
      switch (index) {
        case -2: activePage.value = 1; break;
        case -1: activePage.value--; break;
        case 1: activePage.value++; break;
        case 2: activePage.value = lastPage.value; break;
      }
      this.statement()
    },
    statement() {
      axios.get(`/money/statements?per_page=${perPage.value.code}&page=${activePage.value}`,{
        'headers': {
          'Accept': 'application/json'
        }
      })
          .then((response) => {
            activePage.value = response.data.meta.current_page;
            lastPage.value = response.data.meta.last_page;
            this.statements = [];
            response.data.data.forEach(item => {
              this.statements.push({
                'datetime': item.created_at,
                'amount': item.owner.amount,
                'type': item.type,
                'details': item.details,
                'balance': item.balance,
              })
            })
          })
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
          <div class="pl-7 py-3 w-9/12 max-md:flex max-md:justify-center bg-white border-x border-gray-300">
            <div class="inline-block w-1/4"><span class="text-gray-400 text-sm uppercase">Your id</span></div>
            <span>{{ id }}</span>
          </div>
          <div class="pl-7 py-3 w-9/12 max-md:flex max-md:justify-center bg-white border border-gray-300 rounded-b-md">
            <div class="inline-block w-1/4"><span class="text-gray-400 text-sm uppercase">Your balance</span></div>
            <span>{{ balance }}</span>
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

              <div v-if="depositError" class="focus:outline-none px-6 py-2 mb-5 rounded text-white bg-red-400 flex justify-between items-center">
                <span>{{ depositError }}</span>
                <button @click="depositError = ''" class="focus:outline-none text-red-800 hover:text-white border-none">
                  <IconSquareRoundedX :size="24" stroke-width="1" />
                </button>
              </div>

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

              <div v-if="withdrawError" class="focus:outline-none px-6 py-2 mb-5 rounded text-white bg-red-400 flex justify-between items-center">
                <span>{{ withdrawError }}</span>
                <button @click="withdrawError = ''" class="focus:outline-none text-red-800 hover:text-white border-none">
                  <IconSquareRoundedX :size="24" stroke-width="1" />
                </button>
              </div>

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

              <div v-if="transferError" class="focus:outline-none px-6 py-2 mb-5 rounded text-white bg-red-400 flex justify-between items-center">
                <span>{{ transferError }}</span>
                <button @click="transferError = ''" class="focus:outline-none text-red-800 hover:text-white border-none">
                  <IconSquareRoundedX :size="24" stroke-width="1" />
                </button>
              </div>

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

        <div class="text-left flex items-center flex-col border-collapse">
          <div class="pl-7 py-4 w-9/12 max-md:flex max-md:justify-center bg-white border border-gray-300 rounded-t-md">
            <h2>Statement of account</h2>
          </div>
          <div class="px-7 pt-3 pb-7 w-9/12 bg-white border-x border-b border-gray-300 rounded-b-md">
            <DataTable :value="statements">
              <Column field="datetime" header="Date Time" class="w-2/6"></Column>
              <Column field="amount" header="Amount"></Column>
              <Column field="type" header="Type"></Column>
              <Column field="details" header="Details"></Column>
              <Column field="balance" header="Balance"></Column>
            </DataTable>
            <div class="flex justify-between mt-5">
              <div class="flex">
                <button @click="pagination(-2)" :disabled="activePage === 1" class="disabled:opacity-50 focus:outline-none px-1 py-2 round cursor-pointer hover:border-blue-500 hover:text-blue-500 flex justify-center items-center">
                  <IconChevronsLeft :size="24" stroke-width="1" />
                </button>
                <button @click="pagination(-1)" :disabled="activePage === 1" class="disabled:opacity-50 focus:outline-none px-1 py-2 round cursor-pointer hover:border-blue-500 hover:text-blue-500 flex justify-center items-center">
                  <IconChevronLeft :size="24" stroke-width="1" />
                </button>
                <div class="focus:outline-none px-1 py-2 round hover:text-blue-500 flex justify-center items-center">
                  <span class="px-2">{{ activePage }}</span>
                </div>
                <button @click="pagination(1)" :disabled="activePage === lastPage" class="disabled:opacity-50 focus:outline-none px-1 py-2 round cursor-pointer hover:border-blue-500 hover:text-blue-500 flex justify-center items-center">
                  <IconChevronRight :size="24" stroke-width="1" />
                </button>
                <button @click="pagination(2)" :disabled="activePage === lastPage" class="disabled:opacity-50 focus:outline-none px-1 py-2 round cursor-pointer hover:border-blue-500 hover:text-blue-500 flex justify-center items-center">
                  <IconChevronsRight :size="24" stroke-width="1" />
                </button>
              </div>

              <Dropdown v-on:change="pagination(-2)" v-model="perPage" :options="perPageOptions" optionLabel="name" class="w-1/4" />
            </div>

          </div>
        </div>

      </div>
    </main>

  </div>
</template>
