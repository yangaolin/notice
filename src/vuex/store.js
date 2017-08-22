import Vue from 'vue'
import Vuex from 'vuex'

// 引入 axios
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
  // 定义状态
  state: {
    homeNoticeList: {}
  },
  mutations: {
  	getHomeNotice(state,msg){
  		state.homeNoticeList = msg
  		console.log(msg)
  	}
  },
  actions: {
  	//获取首页公告列表
  	getHomeNotice (context) {
			axios({
				url: 'http://192.168.5.220:20010/config/query?business_code_type=notice_type'
			}).then(function (response) {
				context.commit('getHomeNotice',response)
			})
  	}
  }
})

export default store