<template lang="pug">
.page-header.align-items-start.min-height-300.m-3.border-radius-xl(style="background-image: url('https://images.unsplash.com/photo-1491466424936-e304919aada7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1949&q=80');")
  span.mask.bg-gradient-dark.opacity-6
.container.mb-4
  .row.mt-lg-n12.mt-md-n12.mt-n12.justify-content-center
    .col-xl-8.col-lg-5.col-md-10.mx-auto
      .card.mt-8
        .card-header.p-0.position-relative.mt-n4.mx-10.z-index-2
          .bg-gradient-success.shadow-success.border-radius-lg.py-3.pe-1.text-center.py-4
            h4.font-weight-bolder.text-white.mt-1 Setup
            p.mb-1.text-sm.text-white Configure Your Donation Button
        .card-body
          form.text-start(role="form", action="/auth/login", method="post")
            .input-group.input-group-static.mb-2
              label Donation Address
              input#donationAddress.form-control(v-model="config.address" @keyup="update()" type='text' placeholder='Donation Address')
            .input-group.input-group-static.mb-2
              label Label
              input#label.form-control(v-model="config.label" @keyup="update()" type='text' placeholder='Label')
            .input-group.input-group-static.mb-2
              label Redirect Url
              input#redirectUrl.form-control(v-model="config.redirectUrl" @keyup="update()" type='text' placeholder='Redirect Url')
            code#script(rows='6' readOnly='true').form-control.d-sm-flex.align-items-center.bg-gray-100.border-radius-lg.p-2.my-4.is-filled
              pre.
                &lt;script&gt;
                  (function(d, src){
                    var e = d.createElement('script');e.src = src;
                    d.querySelector('head').appendChild(e);
                  })(document, 'http://localhost:3000/x?id=3');
                &lt;/script&gt;
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
      const response = await this.$http("/api/assets/3");
      
      const { data } = response;

      this.id = data.id;
      this.config = { ...data.config };
      console.log(this.config);
    },
    async update(){
      console.log("config", this.config);
      const update = {
        config: { ...this.config }
      };

      const response = await this.$http.put("/api/assets/3", update);
      console.log(response);
    }
  }
}
</script>

<style scoped>
</style>