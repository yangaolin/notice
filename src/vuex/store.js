import Vue from 'vue'
import Vuex from 'vuex'

// 引入 axios
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
  // 定义状态
  state: {
  	url:'http://192.168.5.220:20020',
    homeNoticeType: {},
    homeNoticeList: {},
    draftNoticeList:{},
    notReviewedNoticeList:{},
    hasReviewedNoticeList:{}
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
    },
    getNotReviewedNoticeData(state,data){
      state.notReviewedNoticeList = data.data.data
    },
    getHasReviewedNoticeData(state,data){
      state.hasReviewedNoticeList = data.data.data
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
    getDraftNoticeList (context,draftNoticeData){
      axios({
        method: 'post',
        url: context.state.url+'/notice/search',
        data: draftNoticeData
      }).then(function (response) {
        context.commit('getDraftNoticeList',response)
      })
    },
    //获取待审核页公告列表
    getNotReviewedNoticeList (context,notReviewedNoticeData){
      axios({
        method: 'post',
        url: context.state.url+'/notice/search',
        data: notReviewedNoticeData
      }).then(function (response) {
        context.commit('getNotReviewedNoticeData',response)
      })
    },
    //获取已审核页公告列表
    getHasReviewedNoticeList (context,hasReviewedNoticeData){
      axios({
        method: 'post',
        url: context.state.url+'/notice/search',
        data: hasReviewedNoticeData
      }).then(function (response) {
        context.commit('getHasReviewedNoticeData',response)
      })
    }
  }
})

export default store