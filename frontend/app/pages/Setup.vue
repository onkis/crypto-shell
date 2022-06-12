<template lang="pug">
#setup-page
  .container-fluid.py-4
    .row
      .col-lg-6
        h4 Payment Setup
        a(href="http://localhost:3000/ecommerce/products/edit-product") like this
    .row.mt-5
      .col-lg-4.mt-lg-0.mt-4
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
      .col-lg-8
        .card
          .card-header.p-0.position-relative.mt-n4.mx-3.z-index-2
            a.d-block.blur-shadow-image
              img.img-fluid.shadow.border-radius-lg(src='https://assets.theoceancleanup.com/app/uploads/2021/08/Tender-Inspection-Flight-24.08.2021-pre-meetings-3-1920x1080.jpg' alt='img-blur-shadow')
            .colored-shadow(style="background-image:url('../../assets/img/products/product-11.jpg');")
          .card-body
            .mt-n6.mx-auto
              button.btn.bg-gradient-success.btn-sm.mb-0.me-2(type='button' name='button')  Edit 
              button.btn.btn-outline-dark.btn-sm.mb-0(type='button' name='button')  Remove 
            h3.font-weight-normal.mt-4 JOIN THE CLEANUP
            p.mt-2
              | Your donation will be made to The Ocean Cleanup North Pacific Foundation, a registered 501(c)(3) foundation
            .oofoof
              .row
                .col-3
                  .d-block
                    #CurrencyDropDown.choices.is-open(role='listbox')
                      .choices__inner
                        select#choices-category.form-control.choices__input(v-model="config.currency" name='choices-category' hidden='' tabindex='-1' data-choice='active')
                        .choices__list.choices__list--single
                          .choices__item.choices__item--selectable USDC
                      .choices__list.choices__list--dropdown(:class="{'is-active':(openCurrencyDropDown)}" style="z-index:10000000;")
                        .choices__list(role='listbox')
                          .choices__item.choices__item--choice.choices__item--selectable(@click="setCurrency('SOL')") SOL
                          .choices__item.choices__item--choice.choices__item--selectable(@click="setCurrency('USDC')") USDC
                .col-3
                  .input-group.input-group-dynamic(:class="{'is-focused':(config.ammount != null)}")
                    label.form-label Price
                    input.form-control.form-control-default(v-model="config.ammount" type='number')
              .row
                .col-6
                  .mt-2
                    p
                      span(style="display: inline-block; width: 100%; text-align: center; color: rgb(255, 255, 255); background: rgb(0, 0, 0); font-weight: 500; font-size: 25px; padding: 2px 10px;border-radius: 5px; cursor: pointer; position: relative;")
                        | Donate With 
                        img(src='http://localhost:3000/images/sp-white-gradient.svg' style='margin-top: -4px;')
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