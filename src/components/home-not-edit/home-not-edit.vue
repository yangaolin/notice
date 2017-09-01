<template>
	<div class="notEdit">
    <div class="search-add">
    	<search></search>
    	<div class="add" @click="changeEdit">
    		<span class="icon"></span><span class="font">新公告</span>
    	</div>
    </div>
    <div class="checkNotice" v-if="homeNoticeType">
    	<span>公告分类</span>
    	<ul>
    		 <li v-for="(item,index) in homeNoticeType">   			
    		 	<input type="radio" :value="item.business_code_key" v-model="noticeData.notice_type">
    		 	{{item.business_code_value}}
    		 </li> 
    	</ul>
    </div>   
    <div class="homeNoticeList" v-if="homeNoticeList">
	  	<div class="noticeCon">
	  		<ul>
	  			<li v-for="(item,index) in homeNoticeList.notice_list">
	  				<div class="listHeader">
	  					<span>{{item.notice_type}}</span><span>发布部门：{{item.notice_publisher}}</span>
	  				</div>
	  				<div class="listBody">
	  					<div class="noticeTitle">{{item.notice_title}}</div>
	  					<div class="noticeCreator">{{item.creator}}&nbsp;&nbsp;&nbsp;{{item.create_date}}</div>
	  					<div v-if="item.notice_state=='4'" class="overdue"></div>
	  					<span v-if="item.notice_state=='4'" class="issue" @click="issueNotice(item.notice_id)">发布</span>
	  					<span v-if="item.notice_state=='3'" class="expire" @click="expireNotice(item.notice_id)">到期</span>
	  					<span v-if="item.notice_state=='3'" class="back" @click="backNotice(item.notice_id)">撤回</span> 
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
	      :total="homeNoticeList.total_count">
	    </el-pagination>
   	</div>
  </div>
</template>

<script type="text/ecmascript-6">
	import search from '../search/search.vue'
	export default {
		data () {
			return {
				noticeData:{
	       	page_no: '1',
	       	page_size: '4',
	       	notice_type: '',
	       	notice_state:"'3','4'",
	       	order_by:'create_date'
  			},
  			currentPage: 1,
  			pageSizes:[4, 8, 12]
			}
		},
		components: {
  	  search
  	},
		watch:{
			noticeData:{
  			handler(val){
  				this.getHomeNoticeList();
  			},
  			deep:true
  		},
  		$route(){
  			this.getHomeNoticeList();
  		}
		},
		mounted() {
			//获取首页公告类型
			this.getHomeNoticeType();
			//获取首页公告列表
			this.getHomeNoticeList();
		},
		computed: {
  		homeNoticeType(){
  			return this.$store.state.homeNoticeType
  		},
  		homeNoticeList(){
  			return this.$store.state.homeNoticeList
  		}
  	},
		methods:{
			//获取首页公告类型
			getHomeNoticeType() {
				this.$store.dispatch('getHomeNoticeType')
			},
			//获取首页公告列表
			getHomeNoticeList() {
				this.$store.dispatch('getHomeNoticeList',this.noticeData)
			},
  		//更改首页每页的显示条数
  		handleSizeChange(val) {
		    this.noticeData.page_size = val
		  },
		  //跳页
		  handleCurrentChange(val) {
		    this.noticeData.page_no = val
		  },
		  //将公告置为编辑状态
		  changeEdit(){
		  	this.$emit('transferUser')
		  },
		  //发布公告  将状态置为待审核状态2
		  issueNotice(noticeId){
		  	let data = {"notice_id":noticeId,"notice_state":"2"}
		  		this.$http({
		  			method:'post',
		  			url:this.$url+'/notice/release', 
		  			data:data
		  			}).then(res => {
		  				if(res.data.success){
		  					this.getHomeNoticeList();
		  				}else{
		  					alert(res.data.message)
		  				}
		  		}).catch(e => {
						console.log(e)
		  		})
		  },
		  //撤回公告   撤回状态为5   但是传1    因为撤回到草稿状态1
		  backNotice(noticeId){
		  	let data = {"notice_id":noticeId,"notice_state":"1"}
		  		this.$http({
		  			method:'post',
		  			url:this.$url+'/notice/release', 
		  			data:data
		  			}).then(res => {
		  				if(res.data.success){
		  					this.getHomeNoticeList();
		  				}else{
		  					alert(res.data.message)
		  				}
		  		}).catch(e => {
						console.log(e)
		  		})
		  },
		  //将公告置为到期状态
		  expireNotice(noticeId){
		  	let data = {"notice_id":noticeId,"notice_state":"4"}
		  		this.$http({
		  			method:'post',
		  			url:this.$url+'/notice/release', 
		  			data:data
		  			}).then(res => {
		  				if(res.data.success){
		  					this.getHomeNoticeList();
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
	.notEdit
		.search-add
			height:36px
			margin-bottom:20px
			.add
				width:100px
				height:36px
				float:right
				border-radius:4px
				background-color: #1a8bfd
				font-size:0
				.icon
					display:inline-block
					float:left
					width:22px
					height:36px
					margin:0px 4px 0px 14px
					background:url('edit.png') center center no-repeat
				.font
					display:inline-block
					float:left
					height: 36px;
					line-height: 36px;
					color:$color-background
					font-size:$font-size-medium
					cursor: default
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
		.homeNoticeList
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
							.overdue
								position:absolute
								width:62px
								height:62px
								right:19px
								top:16px
								background-image:url('overdue.png')
							.issue,.expire,.back
								position:absolute
								right:20px
								bottom:11px
								color: #1a8bfd
								font-size:$font-size-small
								cursor:default
							.back
								right:58px
</style>