<template>
  <div class="outer">
  	<div class="searchOuter">
  		<search></search>
  	</div>
  	<div class="notReviewedNoticeList" v-if="notReviewedNoticeList">
    	<div class="noticeCon">
    		<ul>
    			<li v-for="(item,index) in notReviewedNoticeList.notice_list">
    				<div class="listHeader">
    					<span>{{item.notice_type}}</span><span>发布部门：{{item.notice_publisher}}</span>
    				</div>
    				<div class="listBody">
    					<div class="noticeTitle">{{item.notice_title}}</div>
    					<div class="noticeCreator">{{item.creator}}&nbsp;&nbsp;&nbsp;{{item.create_date}}</div>
    					<div class="handleThis">
    						<span @click="rejectNotice(item.notice_id)">驳回</span>
    						<span @click="issueNotice(item.notice_id)">发布</span>
    					</div>
    				</div>
    			</li>
    		</ul>
    	</div>
       <el-pagination
         @size-change="handleSizeChange"
         @current-change="handleCurrentChange"
         :current-page="currentPage"
         :page-sizes="pageSizes"
         layout="total, sizes, prev, pager, next, jumper"
         :total="notReviewedNoticeList.total_count">
       </el-pagination>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
	import search from '../search/search.vue'
	export default {
		data() {
			return {
				notReviewedNoticeData:{
	       	page_no: '1',
	       	page_size: '4',
	       	notice_type: '',
	       	notice_state:"'2'",
	       	order_by:'create_date'
  			},
  			pageSizes:[4, 8, 12],
  			currentPage: 1
			}
		},
		components: {
  	  search
  	},
		watch:{
			notReviewedNoticeData:{
  			handler(val){
  				this.getNotReviewedNoticeList();
  			},
  			deep:true
  		},
  		$route(){
  			this.getNotReviewedNoticeList();
  		}
		},
		computed: {
			notReviewedNoticeList(){
  			return this.$store.state.notReviewedNoticeList
  		}
		},
		mounted() {
			//获取首页公告列表
  		this.getNotReviewedNoticeList();
		},
		methods:{
			//获取首页公告列表
			getNotReviewedNoticeList() {
				this.$store.dispatch('getNotReviewedNoticeList',this.notReviewedNoticeData)
			},
			//更改首页每页的显示条数
  		handleSizeChange(val) {
		    this.notReviewedNoticeData.page_size = val
		  },
		  //跳页
		  handleCurrentChange(val) {
		    this.notReviewedNoticeData.page_no = val
		  },
		  //驳回公告
		  rejectNotice(noticeId){
		  	let data = {"notice_id":noticeId,"notice_state":"6"}
		  		this.$http({
		  			method:'post',
		  			url:this.$url+'/notice/release', 
		  			data:data
		  			}).then(res => {
		  				if(res.data.success){
		  					this.getNotReviewedNoticeList();
		  				}else{
		  					alert(res.data.message)
		  				}
		  		}).catch(e => {
						console.log(e)
		  		})
		  },
		  //发布公告
		  issueNotice(noticeId){
		  	let data = {"notice_id":noticeId,"notice_state":"3"}
		  		this.$http({
		  			method:'post',
		  			url:this.$url+'/notice/release', 
		  			data:data
		  			}).then(res => {
		  				if(res.data.success){
		  					this.getNotReviewedNoticeList();
		  				}else{
		  					alert(res.data.message)
		  				}
		  		}).catch(e => {
						console.log(e)
		  		})
		  }
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import "~common/stylus/variable"

	.outer
		width:1000px
		padding-top:20px
		margin:0 auto
		.searchOuter
			height:36px
			margin-bottom:20px
		.notReviewedNoticeList
			.noticeCon
				overflow:hidden
				ul
					li
						float:left
						width:480px
						height:162px
						margin-bottom:20px
						border: solid 1px #e9eff4;
						border-radius:6px
						box-sizing:border-box
						&:nth-of-type(odd)
							margin-right:40px
						.listHeader
							height:42px
							padding:12px 16px
							border-bottom:1px dashed #ebebeb
							box-sizing:border-box
							span
								display:inline-block
								height:17px
								line-height:18px
								font-size:$font-size-small
								&:nth-of-type(1)
									float:left
									color: #323c47
									font-weight:500
								&:nth-of-type(2)
									float:right
									color: #626b76
									font-weight:300
						.listBody
							position:relative
							height:118px
							overflow: hidden
							.noticeTitle
								margin-top:26px
								margin-left:20px
								line-height:24px
								font-size: $font-size-large
								font-weight: 500
								color: #323c47
							.noticeCreator
								margin-left:20px
								margin-top:6px
								color: #5e6772
								font-size: $font-size-small
							.handleThis
								position:absolute
								right:0
								bottom:0
								span
									display:inline-block
									width:24px
									height:17px
									color:#1a8bfd
									margin-right:12px
									cursor:pointer
									font-size:$font-size-small
</style>