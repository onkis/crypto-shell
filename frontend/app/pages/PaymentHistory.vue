<template lang="pug">
.row
  .col-12
    .card.mt-4
      .card-header
        h5.mb-0 Payment History
        p.text-sm.mb-0
          | View all the transactions received to payment pages
      .table-responsive
        table#transactions.table.table-flush
          thead.thead-light
            tr
              th Ref Id
              th Created
              th Amount
              th Label
              th Memo
              th Signature
          tbody
            tr(v-for="tx in transactions")
              td 
                a(:href="getExplorerLink(tx.transaction_ref_id)" target="_blank") {{ tx.transaction_ref_id }}
              td {{ tx.created_at }}
              td {{ tx.amount }}
</template>

<script>
import { DataTable } from "simple-datatables";

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
      console.log(data);
      const transactions = [];
      //https://github.com/fiduswriter/Simple-DataTables/blob/main/docs/9-fetch-api/index.html
      //TODO: this Data Table is lgpl...probably needs to be changed...
      that.transactions = [...data];


      const dataTableSearch = new DataTable("#transactions", {
        searchable: true,
        fixedHeight: false,
        perPageSelect: false,
        data: {
          headings: [
            "Ref Id",
            "Created",
            "Amount",
            "Label",
            "Memo",
            "Signature"
          ],
          data: data
        }
      });
    },
    getExplorerLink(reference_id){
      return `https://explorer.solana.com/address/${reference_id}?cluster=${this.cluster}`;
    }
  }
}
</script>

<style scoped>
</style>