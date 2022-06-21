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
            tr

</template>

<script>
import { DataTable } from "simple-datatables";

export default {
  components: {},
  data() {
    return {
      config: {}
    };
  }, 
  mounted() {
    this.init();
  },
  methods: {
    async init(){
      const response = await this.$http("/api/transactions");
      const { data } = response;
      console.log("response", response);
      
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
    }
  }
}
</script>

<style scoped>
</style>