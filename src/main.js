import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import store from './vuex/store'
import router from './router'

Vue.use(Vuex)

import 'common/stylus/index.styl'


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
