<template>
  <div id="app">
    <tab></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
	import Tab from 'components/tab/tab'
	
	export default {
	  name: 'app',
	  components: {
	      Tab
	    }
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
