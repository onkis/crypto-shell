<template lang="pug">
#setup-page
  .container-fluid.py-4
    .row
      .col-lg-6
        h4 Payment Setup
        a(href="http://localhost:3000/ecommerce/products/edit-product") like this
    .row.mt-5
      .col-lg-8.mt-lg-0.mt-4
        .card
          .card-body
            h5.font-weight-bolder Configuration
            hr
            .row.mt-4
              .col-12
                .input-group.input-group-static.mb-2
                  label Payment Address
                  input#donationAddress.form-control(v-model="config.address" type='text' placeholder='Donation Address')
              .col-12
                .input-group.input-group-static.mb-2
                  label Label
                  input#label.form-control(v-model="config.label" type='text' placeholder='Label')
              .col-12
                .input-group.input-group-static.mb-2
                  label Redirect Url
                  input#redirectUrl.form-control(v-model="config.redirectUrl" type='text' placeholder='Redirect Url')
              .col-12
            .row.mt-4
              .col-lg-6.text-right.d-flex.flex-column.justify-content-center
              button.btn.bg-gradient-primary.mb-0.ms-lg-auto.me-lg-0.me-auto.mt-lg-0.mt-2(@click="update()" type='button') Save

      .col-lg-4
        .card
          .card-body.text-center
            p.mt-2
              span(style="color: rgb(255, 255, 255);background: rgb(0, 0, 0);font-weight: 500;font-size: 25px;padding: 8px 10px;border-radius: 5px;cursor: pointer;position: relative;")
                | Donate With  
                img(src='http://localhost:3000/images/sp-white-gradient.svg' style='margin-top: -4px;')
            hr
            p.mb-0
              | Preview of your donation button
</template>

<script>
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
      console.log("init!");
      //TODO: there should be only one endpoint to get the logged in users
      //current page
      const response = await this.$http("/api/paymentpage/3");
      
      const { data } = response;

      this.id = data.id;
      this.config = { ...data.config };
      console.log(this.config);
      document.querySelector('pre').innerText = this.getScript(this.id);
    },
    async update(){
      console.log("config", this.config);
      const update = {
        config: { ...this.config }
      };
      //and one to update the logged in user's current page
      const response = await this.$http.put("/api/paymentpage/3", update);
      if(response){
        window.AlertManager({type: "success", "message": "Setup Saved!", hideAfter: 3000 });
      }
    },
    getScript(id){
      const script = "<script>\n" +
      "  (function(d, src){\n" + 
      "    var e = d.createElement('script');e.src = src;\n" + 
      "    d.querySelector('head').appendChild(e);\n" +
      `  })(document, 'http://localhost:3000/x?id='${id});` + 
      "\n<\/script>;";

      return script;
    }
  }
}
</script>

<style scoped>
</style>