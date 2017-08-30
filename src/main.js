import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import ElementUI from 'element-ui'
import axios from 'axios'
import  VueQuillEditor from 'vue-quill-editor'
import 'element-ui/lib/theme-default/index.css'
import store from './vuex/store'
import router from './router'

Vue.use(Vuex)
Vue.use(ElementUI)
Vue.use(VueQuillEditor)

Vue.prototype.$http = axios
Vue.prototype.$url = 'http://192.168.5.220:20010'
import 'common/stylus/index.styl'


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
