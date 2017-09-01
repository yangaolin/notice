<template>
	<div class="header">
		<div class="headeContent">
			<div class="logo" @click="reload"></div>
			<div class="tab">
			  <router-link tag="div" class="tab-item" to="/home">
			    <span class="tab-link">我的首页</span>
			  </router-link>
			  <router-link tag="div" class="tab-item" to="/draft-notice">
			    <span class="tab-link">公告草稿</span>
			  </router-link>
			  <router-link tag="div" class="tab-item" to="/not-reviewed-notice">
			    <span class="tab-link">待审核公告</span>
			  </router-link>
			  <router-link tag="div" class="tab-item" to="/has-reviewed-notice">
			    <span class="tab-link">已审核公告</span>
			  </router-link>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
  export default {
  	methods:{
      reload(){
        window.location.reload()
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .header
  	height:60px
  	border-bottom: solid 1px #e5e3e4
  	.headeContent
  		display:flex
  		align-items:center
  		width:1000px
  		height:60px
  		margin:0 auto
  		.logo
  			width:70px
  			height:30px
  			background-image:url('logo.png')
  		.tab
  			display: flex
  			width:456px
  			height:60px
  			font-size: $font-size-medium
  			.tab-item
  				flex:1
  				text-align:center
  				.tab-link
  					display:inline-block
	  				height:55px
	  				line-height:55px
	  				color: $color-text-l
	  			&.router-link-active
	  				.tab-link
	  					color: $color-theme
	  					border-bottom: 2px solid $color-theme
</style>