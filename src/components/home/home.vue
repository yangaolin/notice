<template>
  <div class="home">
  	<home-not-edit v-if="!preview&&!edit" @transferUser="edit=true"></home-not-edit>
  	<home-edit v-if="!preview&&edit"></home-edit>
  </div>
</template>

<script type="text/ecmascript-6">
	import homeNotEdit from '../home-not-edit/home-not-edit.vue'
	import homeEdit from '../home-edit/home-edit.vue'
	export default {
		data() {
  		return {
  			edit:false,
  			preview:false,
  			reviseNoticeId:''
  		}
  	},
  	components: {
  	  homeNotEdit,
  	  homeEdit
  	},
  	watch:{
  		$route(){
  			if(this.$route.query.noticeId){
  				this.edit = true
  			}
  		}
  	},
  	created(){
  		if(this.$route.query.noticeId){
  				this.edit = true
  			}
  	}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import "~common/stylus/variable"
	
	.home
		width:1000px
		padding-top:20px
		margin:0 auto
</style>