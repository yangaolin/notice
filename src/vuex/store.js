import Vue from 'vue'
import Vuex from 'vuex'

// 引入 axios
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
  // 定义状态
  state: {
  	url:'http://192.168.5.220:20010',
    homeNoticeType: {},
    homeNoticeList: {},
    draftNoticeList:{}
  },
  mutations: {
  	getHomeNoticeType(state,data){
  		state.homeNoticeType = data.data.data.notice_business_code_list
  	},
  	getHomeNoticeList(state,data){
  		state.homeNoticeList = data.data.data
  	},
    getDraftNoticeList(state,data){
      state.draftNoticeList = data.data.data
    }
  },
  actions: {
  	//获取首页公告类型
  	getHomeNoticeType (context) {
			axios({
				url: context.state.url+'/config/query?business_code_type=notice_type'
			}).then(function (response) {
				context.commit('getHomeNoticeType',response)
			})
  	},
  	//获取首页公告列表
  	getHomeNoticeList (context,noticeData) {
  		axios({
  			method: 'post',
				url: context.state.url+'/notice/search',
				data: noticeData
			}).then(function (response) {
				context.commit('getHomeNoticeList',response)
			})
  	},
    //获取草稿页公告列表
    getDraftNoticeList (context,draftNoticeList){
      axios({
        method: 'post',
        url: context.state.url+'/notice/search',
        data: draftNoticeList
      }).then(function (response) {
        context.commit('getDraftNoticeList',response)
      })
    }
  }
})

export default store