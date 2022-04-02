export default {
  components: {},
  data() {
    return {
      name: "oof"
    };
  }, 
  mounted() {
    init();
  },
  methods: {
    init(){
      console.log("init");
    }
  }
};