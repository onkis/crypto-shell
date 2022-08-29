<template lang="pug">
div.px-4(class='sm:px-6 lg:px-8')
  div(class='sm:flex sm:items-center')
    div(class='sm:flex-auto')
      h1.text-xl.font-semibold.text-gray-900 Payment History
      p.mt-2.text-sm.text-gray-700
        |  View all the transactions received to payment pages
    .mt-4(class='sm:mt-0 sm:ml-16 sm:flex-none')
  .mt-8.flex.flex-col
    .-my-2.-mx-4.overflow-x-auto(class='sm:-mx-6 lg:-mx-8')
      .inline-block.min-w-full.py-2.align-middle(class='md:px-6 lg:px-8')
        .overflow-hidden.shadow.ring-1.ring-black.ring-opacity-5(class='md:rounded-lg')
          table.min-w-full.divide-y.divide-gray-300
            thead.bg-gray-50
              tr
                th.pl-4.pr-3.text-left.text-sm.font-semibold.text-gray-900(scope='col', class='py-3.5 sm:pl-6') Signature
                th.px-3.text-left.text-sm.font-semibold.text-gray-900(scope='col', class='py-3.5') Amount
                th.px-3.text-left.text-sm.font-semibold.text-gray-900(scope='col', class='py-3.5') Date
            tbody.bg-white
              tr(v-for="tx in transactions", :class="tx.id % 2 === 0 ? undefined : 'bg-gray-50'")
                td.whitespace-nowrap.py-4.pl-4.pr-3.text-sm.font-medium.text-gray-900(class='sm:pl-6')
                  a(:href="getExplorerLink(tx.signature)" target="_blank") {{ tx.transaction_ref_id }}
                td.whitespace-nowrap.px-3.py-4.text-sm.text-gray-500 {{ tx.amount }}
                td.whitespace-nowrap.px-3.py-4.text-sm.text-gray-500 {{ tx.created_at }}
</template>

<script>

export default {
  components: {},
  data() {
    return {
      cluster: "testnet",
      config: {},
      transactions: []
    };
  }, 
  mounted() {
    this.init();
  },
  methods: {
    async init(){
      const that = this;
      const response = await this.$http("/api/transactions");
      const { data } = response;
      that.transactions = [...data];
    },
    getExplorerLink(signature){
      return `https://explorer.solana.com/tx/${signature}?cluster=${this.cluster}`;
    }
  }
}
</script>

<style scoped>
  #transactions td {
    padding: .3rem 1.5rem;
  }
</style>