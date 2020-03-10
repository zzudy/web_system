import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import FullCalendar from "vue-full-calendar";
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';
import { ValidationProvider, extend, ValidationObserver } from "vee-validate";
import { required } from "vee-validate/dist/rules";
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';
import axios from 'axios'
import Vuetify from 'vuetify'
import DaySpanVuetify from 'dayspan-vuetify'
import 'vuetify/dist/vuetify.min.css'
import vuetify from './plugins/vuetify';
Vue.prototype.$http = axios

Vue.use(Vuetify);
Vue.use(DaySpanVuetify, {
    methods: {
      getDefaultEventColor: () => '#1976d2',
      getDefaultEventDetails: () => {
        console.log("DDD");
        //"{data:{title:'dd',color: '#3F51B5'},schedule: {weekspanOfMonth: '[0]', dayOfWeek: '[Weekday.FRIDAY]', duration: '3', durationUnit: 'days'}"
      }
    },
  });
extend("required", required);
Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);
Vue.use(FullCalendar);
Vue.use(BootstrapVue);
Vue.component('VueCtkDateTimePicker', VueCtkDateTimePicker);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
