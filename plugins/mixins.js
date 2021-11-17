import Vue from "vue";
import request from "~/mixins/request";
import datatable from "~/mixins/datatable";
import app from "~/mixins/app";
Vue.mixin(app);
Vue.mixin(request);
Vue.mixin(datatable);
