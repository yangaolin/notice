import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import ElementUI from 'element-ui'
import  VueQuillEditor from 'vue-quill-editor'
import 'element-ui/lib/theme-default/index.css'
import store from './vuex/store'
import router from './router'

Vue.use(Vuex)
Vue.use(ElementUI)
Vue.use(VueQuillEditor)

import 'common/stylus/index.styl'


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
