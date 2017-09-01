<template>
	<div class="search">
		<input type="text" placeholder="搜索公告关键字找公告">
		<span></span>
	</div>
</template>

<script type="text/ecmascript-6">
	
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
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
</style>