<template>
  <div class="home" >
    <div class="search-add">
    	<div class="search">
    		<input type="text" placeholder="搜索公告关键字找公告">
    		<span></span>
    	</div>
    	<div class="add">
    		<span class="icon"></span><span class="font">新公告</span>
    	</div>
    	<div class="checkNotice" v-if="homeNoticeList.data">
    		<span>公告分类</span>
    		<ul>
    			<li v-for="(item,index) in homeNoticeList.data.data.notice_business_code_list">
    				<input type="checkbox">{{item.business_code_value}} 
    			</li> 
    		</ul>
    	</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
	export default {
		data() {
  		return {

  		}
  	},
  	mounted() {
  		this.getHomeNotice();
  	},
  	computed: {
  		homeNoticeList(){
  			return this.$store.state.homeNoticeList
  		}
  	},
  	methods: {
  		getHomeNotice() {
  			this.$store.dispatch('getHomeNotice')
  		}
  	}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import "~common/stylus/variable"
	
	.home
		width:1000px
		padding:20px
		margin:0 auto
		.search-add
			height:36px
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
</style>