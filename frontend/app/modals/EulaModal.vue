<template lang="pug">
transition(name="modal-animation")
  .modal-backdrop(v-show="modalActive")
    .modal.show
      transition(name="modal-animation-inner")
        .modal-inner.modal-dialog.modal-dialog-centered(v-show="modalActive" role='document')
          .modal-content
            .modal-header
              h5.modal-title.font-weight-normal End User Agreement
            .modal-body
              .eula-content
                p.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisi quis eleifend quam adipiscing vitae proin sagittis nisl. Viverra ipsum nunc aliquet bibendum enim facilisis gravida. Sed viverra ipsum nunc aliquet bibendum enim facilisis. Leo in vitae turpis massa sed elementum. Nisi scelerisque eu ultrices vitae. Mauris in aliquam sem fringilla ut morbi tincidunt. Facilisi etiam dignissim diam quis. Egestas erat imperdiet sed euismod nisi porta. Cras sed felis eget velit aliquet sagittis id consectetur purus. In tellus integer feugiat scelerisque varius morbi enim nunc faucibus. Orci ac auctor augue mauris augue neque gravida in. Consequat nisl vel pretium lectus. Sit amet volutpat consequat mauris nunc. Eu non diam phasellus vestibulum lorem sed risus ultricies. Vestibulum sed arcu non odio. A arcu cursus vitae congue mauris rhoncus.
                p.
                  Amet purus gravida quis blandit turpis cursus. Porttitor leo a diam sollicitudin tempor id. Cursus euismod quis viverra nibh cras pulvinar mattis nunc sed. Pellentesque pulvinar pellentesque habitant morbi. Metus aliquam eleifend mi in. Duis convallis convallis tellus id. Arcu cursus euismod quis viverra nibh cras. Mus mauris vitae ultricies leo integer malesuada. Ipsum dolor sit amet consectetur adipiscing elit ut. Mauris in aliquam sem fringilla ut morbi tincidunt augue interdum. Nec sagittis aliquam malesuada bibendum arcu vitae. Scelerisque in dictum non consectetur a erat nam. Iaculis urna id volutpat lacus. A condimentum vitae sapien pellentesque. Id donec ultrices tincidunt arcu non. At tempor commodo ullamcorper a lacus vestibulum sed arcu non. Nunc non blandit massa enim nec. Ac turpis egestas sed tempus. Eget dolor morbi non arcu risus quis varius.
                p.
                  Rhoncus aenean vel elit scelerisque mauris pellentesque pulvinar. Habitant morbi tristique senectus et netus. Nullam ac tortor vitae purus faucibus ornare suspendisse sed nisi. Est lorem ipsum dolor sit amet consectetur. Amet commodo nulla facilisi nullam vehicula ipsum a. Leo in vitae turpis massa sed. Tellus integer feugiat scelerisque varius morbi enim nunc faucibus. Purus viverra accumsan in nisl nisi scelerisque. Faucibus nisl tincidunt eget nullam non. Integer quis auctor elit sed vulputate mi sit amet mauris. Pellentesque adipiscing commodo elit at imperdiet dui accumsan sit. Consequat mauris nunc congue nisi. Vel turpis nunc eget lorem dolor sed viverra ipsum. Velit laoreet id donec ultrices tincidunt arcu non. Lectus nulla at volutpat diam.
                p.
                  Facilisis leo vel fringilla est ullamcorper eget nulla. Imperdiet sed euismod nisi porta lorem mollis. Amet cursus sit amet dictum sit. Iaculis at erat pellentesque adipiscing commodo elit at imperdiet. Vestibulum sed arcu non odio euismod lacinia at. Euismod elementum nisi quis eleifend quam adipiscing. Suspendisse in est ante in nibh mauris cursus mattis. Pellentesque elit eget gravida cum sociis natoque. Mattis molestie a iaculis at erat pellentesque adipiscing commodo. Iaculis eu non diam phasellus vestibulum. Est pellentesque elit ullamcorper dignissim cras tincidunt lobortis. Feugiat nisl pretium fusce id velit. Feugiat scelerisque varius morbi enim. Nullam ac tortor vitae purus faucibus ornare suspendisse.
                p.
                  Aliquam etiam erat velit scelerisque in dictum non consectetur a. Ultrices tincidunt arcu non sodales. Lobortis feugiat vivamus at augue eget. Condimentum id venenatis a condimentum vitae sapien pellentesque habitant morbi. Dui faucibus in ornare quam viverra orci. Vel pretium lectus quam id leo in. Pretium vulputate sapien nec sagittis. Feugiat in fermentum posuere urna nec tincidunt praesent semper. Arcu dictum varius duis at consectetur lorem donec massa sapien. Eu feugiat pretium nibh ipsum consequat nisl vel pretium lectus. Non blandit massa enim nec dui nunc. Facilisis mauris sit amet massa vitae. A condimentum vitae sapien pellentesque habitant. Id diam maecenas ultricies mi. Sit amet consectetur adipiscing elit. Fames ac turpis egestas integer eget. Malesuada nunc vel risus commodo viverra maecenas accumsan. Faucibus et molestie ac feugiat sed lectus. Interdum velit euismod in pellentesque massa placerat. Molestie nunc non blandit massa enim nec dui.
            .modal-footer
              button.btn.bg-gradient-secondary(@click="handleCancel()" type='button') Cancel
              button.btn.bg-gradient-primary(@click="handleValidate()" type='button') Agree
</template>

<script>
export default {
  props: ['modalActive'],
  components: {},
  data() {
    return {
      email: ''
    };
  }, 
  methods: {
    handleCancel(){
      this.close({ eventType: "cancel" });
    },
    handleValidate(){
      this.close({ eventType: "agreed" });
    },
    close(props){
      this.$emit('close', props);
    }
  }
}
</script>

<style scoped>
.modal-animation-enter-active,
.modal-animation-leave-active {
  transition: opacity .3s cubic-bezier(0.52,0.02,0.19,1.02);
}

.modal-animation-enter-from,
.modal-animation-leave-to {
  opacity: 0;
}

.modal-animation-enter-to {
  opacity: 1;
}

.modal-animation-inner-enter-active {
  transition: all .4s cubic-bezier(0.52,0.02,0.19,1.02);
  transition-delay: .1s;
}

.modal-animation-inner-leave-active {
  transition: all .4s cubic-bezier(0.52,0.02,0.19,1.02);
}

.modal-animation-inner-enter-from {
  opacity: 0;
  transform: translateY(-55px) !important;
}

.modal-animation-inner-leave-to {
  transform: translateY(-55px) !important;
}

.modal-backdrop{
  background-color: rgba(0,0,0,0.45);
  z-index: 1000000;
}

.modal.show {
  display: block;
  z-index: 1000;
}

.eula-content{
  max-height: 45vh;
  overflow-y: scroll;
}
</style>