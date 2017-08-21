<template>
  <div class="home">
    <div class="search-add">
    		<input type="text" placeholder="搜索公告关键字找公告">
    		<span></span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	.home
		width:1000px
		padding:20px
		margin:0 auto
		.search-add
			height:36px
			input
				width:708px
				height:18px
				line-height:18px
				border-radius: 2px
				background-color: #edeff4;
				padding: 9px 30px 9px 14px
				font-size:12px
			span
				display:inline-block
				vertical-align:middle
				width:16px
				height:16px
				margin-left:-30px
				background-image:url('search.png')
</style>