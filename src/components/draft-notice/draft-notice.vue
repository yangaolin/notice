<template>
  <div class="outer">
  	<div class="searchOuter">
  		<div class="search">
  			<input type="text" placeholder="搜索公告关键字找公告">
  			<span></span>
  		</div>
  	</div>
  	<div class="draftNoticeList" v-if="draftNoticeList">
    	<div class="noticeCon">
    		<ul>
    			<li v-for="(item,index) in draftNoticeList.notice_list">
    				<div class="listHeader">
    					<span>{{item.notice_type}}</span><span>发布部门：{{item.notice_publisher}}</span>
    				</div>
    				<div class="listBody">
    					<div class="noticeTitle">{{item.notice_title}}</div>
    					<div class="noticeCreator">{{item.creator}}&nbsp;&nbsp;&nbsp;{{item.create_date}}</div>
    					<div class="handleThis">
    						<span><router-link :to="{path:'/home',query: {noticeId:item.notice_id}}" class="tab-item">修改</router-link></span>
    						<span>删除</span>
    						<span>发布</span>
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
         :total="draftNoticeList.total_count">
       </el-pagination>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
	export default {
		data() {
			return {
				draftNoticeData:{
	       	page_no: '1',
	       	page_size: '4',
	       	notice_type: '',
	       	notice_state:"'1'",
	       	order_by:'create_date'
  			},
  			pageSizes:[4, 8, 12],
  			currentPage: 1
			}
		},
		watch:{
			draftNoticeData:{
  			handler(val){
  				this.getDraftNoticeList();
  			},
  			deep:true
  		}
		},
		mounted() {
			//获取首页公告列表
  		this.getDraftNoticeList();
		},
		computed: {
			draftNoticeList(){
  			return this.$store.state.draftNoticeList
  			console.log(this.$store.state.draftNoticeList)
  		}
		},
		methods:{
			//获取首页公告列表
			getDraftNoticeList() {
				this.$store.dispatch('getDraftNoticeList',this.draftNoticeData)
			},
			//更改首页每页的显示条数
  		handleSizeChange(val) {
		    this.draftNoticeData.page_size = val
		  },
		  //跳页
		  handleCurrentChange(val) {
		    this.draftNoticeData.page_no = val
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
			.search
				position:relative
				width:708px
				float: left
				overflow:hidden
				input
					width:664px
					height:18px
					line-height:18px
					border-radius: 2px
					background-color: #edeff4
					padding: 9px 30px 9px 14px
					font-size:12px
				span
					display:inline-block
					position: absolute
					width:16px
					height:16px
					right: 14px
					bottom: 10px
					background-image:url('search.png')
		.draftNoticeList
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
									.tab-item
										color:#1a8bfd
</style>