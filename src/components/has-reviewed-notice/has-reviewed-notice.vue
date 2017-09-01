<template>
  <div class="outer">
  	<div class="searchOuter">
  		<search></search>
  	</div>
  	<div class="checkNotice">
    	<span>公告分类</span>
    	<ul>
    		 <li v-for="(item,index) in noticeType">   			
    		 	<input type="radio" :value="item.notice_state" v-model="hasReviewedNoticeData.notice_state">
    		 	{{item.notice_value}}
    		 </li> 
    	</ul>
    </div> 
  	<div class="hasReviewedNoticeList" v-if="hasReviewedNoticeList">
    	<div class="noticeCon">
    		<ul>
    			<li v-for="(item,index) in hasReviewedNoticeList.notice_list">
    				<div class="listHeader">
    					<span>{{item.notice_type}}</span><span>发布部门：{{item.notice_publisher}}</span>
    				</div>
    				<div class="listBody">
    					<div class="noticeTitle">{{item.notice_title}}</div>
    					<div class="noticeCreator">{{item.creator}}&nbsp;&nbsp;&nbsp;{{item.create_date}}</div>
							<div v-if="item.notice_state=='6'" class="reject"></div>
							<div v-if="item.notice_state=='3'" class="issue"></div>
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
         :total="hasReviewedNoticeList.total_count">
       </el-pagination>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
	import search from '../search/search.vue'
	export default {
		data() {
			return {
				hasReviewedNoticeData:{
	       	page_no: '1',
	       	page_size: '4',
	       	notice_type: '',
	       	notice_state:"'3','6'",
	       	order_by:'create_date'
  			},
  			pageSizes:[4, 8, 12],
  			currentPage: 1,
  			noticeType:[
  				{
  					"notice_state":"'3'",
  					"notice_value":"审核通过"
  				},
  				{
  					"notice_state":"'6'",
  					"notice_value":"审核驳回"
  				}
  			]
			}
		},
		components: {
  	  search
  	},
		watch:{
			hasReviewedNoticeData:{
  			handler(val){
  				this.getHasReviewedNoticeList();
  			},
  			deep:true
  		},
  		$route(){
  			this.getHasReviewedNoticeList();
  		}
		},
		computed: {
			hasReviewedNoticeList(){
  			return this.$store.state.hasReviewedNoticeList
  		}
		},
		mounted() {
			//获取首页公告列表
  		this.getHasReviewedNoticeList();
		},
		methods:{
			//获取首页公告列表
			getHasReviewedNoticeList() {
				this.$store.dispatch('getHasReviewedNoticeList',this.hasReviewedNoticeData)
			},
			//更改首页每页的显示条数
  		handleSizeChange(val) {
		    this.hasReviewedNoticeData.page_size = val
		  },
		  //跳页
		  handleCurrentChange(val) {
		    this.hasReviewedNoticeData.page_no = val
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
		.checkNotice
			height:17px
			overflow:hidden
			font-size:$font-size-small
			margin-bottom: 15px
			span
				display:inline-block
				float:left
				height:17px
				line-height:17px
				color:#323c47
				font-weight: 600
				margin-right:30px
			ul
				display:inline-block
				float:left
				li
					height:17px
					line-height: 17px;
					float:left
					&:not(:last-child)
						margin-right:30px
					input
						float:left
						width:14px
						height:14px
						margin-bottom:1.5px
						margin-right:4px
		.hasReviewedNoticeList
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
							.reject
								position:absolute
								width:62px
								height:62px
								right:19px
								top:16px
								background-image:url('reject.png')
							.issue
								position:absolute
								width:62px
								height:62px
								right:19px
								top:16px
								background-image:url('issue.png')
</style>