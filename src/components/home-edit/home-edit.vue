<template>
    <div class="edit">
    	<div class="newNotice">首页&nbsp;&nbsp;>&nbsp;&nbsp;新公告</div>
    	<div class="noticeName">
    		<span>公告名称：</span>
    		<input type="text" v-model="newNoticeData.notice_title">
    	</div>
    	<div class="noticeType" v-if="homeNoticeType">
    		<span>公告类别：</span>
    		 <select v-model="newNoticeData.notice_type">
	        <option  v-for="(item,index) in homeNoticeType" v-bind:value="item.business_code_key">
	        {{item.business_code_value}}</option>
	    	 </select>
    	</div>
    	<div class="noticeTop">
    		<span>置顶：</span>
    		<input type="checkbox" v-model="isTop">
    		<span>设为置顶</span>
    	</div>
    	<div class="noticeContent">
    		<span>公告内容：</span>
    		<div class="noticeEdit">
    		  <quill-editor ref="myTextEditor" v-model="newNoticeData.notice_content" @change="onEditorChange($event)">
    		  </quill-editor>
    		  <div class="upload">上传文件 <input type="file" @change="getFileUrl($event)"/></div>
    		</div>
    	</div>
    	<div class="uploadFiles" v-if="files">
    		<ul>
    			<li v-for="(item,index) in files">{{item.name}}</li>
    		</ul>
    	</div>
    	<div class="publishDepart">
    		<span>发布部门：</span>
    		 <select v-model="newNoticeData.notice_publisher">
		        <option  v-for="(item,index) in publishDate" v-bind:value="item">
		        {{item}}</option>
	    	 </select>
    	</div>
    	<div class="toWhichMan">
    		<span>公告人群：</span>
    		 <select>
		        <option  v-for="(item,index) in toWhichMan" :value="item">
		        {{item.key}}</option>
	    	 </select>
    	</div>
    	<div class="noticeTime">
    		<div class="isLoneTime">
    			<span>公告有效期：</span>
    			<input type="checkbox" v-model="isLong">
    			<span>长期</span>
    		</div>
    		<div class="timeBegin">
    			<span>开始时间：</span>
    			<el-date-picker
    			 	v-model="newNoticeData.notice_validate_start"
			      type="datetime"
			      format="yyyy-MM-dd HH:mm:ss"
			      placeholder="选择开始时间"
			      @change="toNoticeStartData"
			      :picker-options="pickerOptions">
			    </el-date-picker>
    		</div>
    		<div class="timeEnd">
    			<span>结束时间：</span>
    			<el-date-picker
			      v-model="newNoticeData.notice_validate_end"
			      type="datetime"
			      format="yyyy-MM-dd HH:mm:ss"
			      placeholder="选择结束时间"
			      @change="toNoticeEndData"
			      :picker-options="pickerOptions">
			    </el-date-picker>
    		</div>
    	</div>
    	<div class="saveAndPublish">
    		<div class="saveNotice" @click="saveNotice">保存草稿</div>
    		<div class="publiseNotice" @click="publiseNotice">发布申请</div>
    		<div class="previewNotice">在线预览</div>
    	</div>
    </div>
</template>

<script type="text/ecmascript-6">
	export default {
		data(){
			return {
				currentNoticeId:'',
  			currentNoticeState:'',
				newNoticeData:{
					'notice_title':'',
					'notice_type':'',
					'notice_content':'',
					"notice_state":"1",
					'notice_tag':'0',
					'notice_attachments':'{}',
					"creator":"xiaoming",
					'notice_publisher':'',
					'notice_scope':'{"key":"全司"}',
					'notice_validate_start':'',
					'notice_validate_end':''
				},
				isTop:false,
				isLong:false,
				files:[],
				publishDate:[
						'集团总部-人力资源部'
				],
				toWhichMan:[
					{
					"key":"全司"
					}
				],
				pickerOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        }
			}
		},
		watch: {
			isTop(val){
  			if(val==true){
  				this.newNoticeData.notice_tag = 1
  			}else{
  				this.newNoticeData.notice_tag = 2
  			}
  		},
  		isLong(val){
  			if(val==true){
  				this.newNoticeData.notice_validate_start=''
  				this.newNoticeData.notice_validate_end=''
  			}
  		},
  		$route(){
  			this.reviseNotice();
  		}
		},
		mounted(){
			//获取首页公告类型
  		this.getHomeNoticeType()
  		if(this.$route.query.noticeId){
  			this.reviseNotice()
  		}
		},
		computed: {
  		homeNoticeType(){
  			return this.$store.state.homeNoticeType
  		},
  		editor() {
        return this.$refs.myTextEditor.quillEditor
      }
  	},
  	methods:{
  		//获取首页公告类型
  		getHomeNoticeType() {
  			this.$store.dispatch('getHomeNoticeType')
  		},
		  onEditorChange({ editor, html, text }) {
		      this.newNoticeData.notice_content = html		  
		  },
		  //获取文件url
		  getFileUrl(event){
		  	let _this = this;
		  	if(event.target.files.length){
		  		let formData = new FormData()
		  		formData.append("myFile", event.target.files[0])
		  		_this.$http.post(
		  			'http://file-management.zhaopin.com/attachmentClient/uploadImage?systemName=cust', 
		  			formData, 
		  			{
		  		    headers: {
		  		      'Content-Type': 'multipart/form-data'
		  		      },
		  		      responseType:'json'
		  		}).then(res => {
		  				let file = new Object()
	          	file.name = res.data[0].name
	          	file.url = res.data[0].filename
	          	_this.files.push(file)
	          	let attachments = '"'+file.name+'"'+':'+'"'+file.url+'"';
	          	let attachmentsUrl='';
	          	if(_this.newNoticeData.notice_attachments.length == 2){
	          		attachmentsUrl = _this.newNoticeData.notice_attachments.substring(0,_this.newNoticeData.notice_attachments.length-1)+attachments+'}'
	          	}else if(_this.newNoticeData.notice_attachments.length > 2){
	          		attachmentsUrl = _this.newNoticeData.notice_attachments.substring(0,_this.newNoticeData.notice_attachments.length-1)+','+attachments+'}'
	          	}
	          	_this.newNoticeData.notice_attachments = attachmentsUrl
		  		})
		  	}
		  },
		  //将开始时间赋值
		  toNoticeStartData(val){
		  	this.newNoticeData.notice_validate_start = val
		  	if(val){
		  		this.isLong=false
		  	}
		  },
		  //给结束时间赋值
		  toNoticeEndData(val){
		  	this.newNoticeData.notice_validate_end = val
		  	if(val){
		  		this.isLong=false
		  	}
		  },
		  //点击保存公告
		  saveNotice(){
		  	//当前id有值，证明已保存过再再修改保存或者从草稿页面点击修改跳过来
		  	//这里要再次将当前id的公告进行保存
		  	if(this.currentNoticeId){
		  		this.newNoticeData.notice_id = this.currentNoticeId
		  	}
	  		this.$http({
	  			method:'post',
	  			url:this.$url+'/notice/save', 
	  			data:this.newNoticeData
	  			}).then(res => {
						if(res.data.success){
							//当保存后返回的公告ID赋值为当前的ID
		  				this.currentNoticeId = res.data.data.notice_id
		  				//将当前的公告状态置为草稿状态1
		  				this.currentNoticeState = '1'
						}else{
							alert(res.data.message)
						}
	  		}).catch(e => {
					alert(e.data.message)
	  		})
		  },
		  //点击发布申请
		  publiseNotice(){
		  	//如果有当前id，证明已保存过，则将此id直接向后端发送请求置为待审核状态2
		  	if(this.currentNoticeId){
		  		let data = {"notice_id":this.currentNoticeId,"notice_state":"2"}
		  		this.$http({
		  			method:'post',
		  			url:this.$url+'/notice/release', 
		  			data:data
		  			}).then(res => {
		  				//当发布申请后返回的公告ID赋值为当前的ID
		  				this.currentNoticeId = res.data.data.notice_id
		  				//将当前的公告状态置为草稿状态2
		  				this.currentNoticeState = '2'
		  		}).catch(e => {
						console.log(e)
		  		})
		  	}else{
		  		//直接点击发布，将状态置为待审核状态2
		  		this.newNoticeData.notice_state = 2
  		  	this.$http({
  		  			method:'post',
  		  			url:this.$url+'/notice/save', 
  		  			data:this.newNoticeData
  		  			}).then(res => {
  							if(res.data.success){
  								//当保存后返回的公告ID赋值为当前的ID
  			  				this.currentNoticeId = res.data.data.notice_id
  			  				//将当前的公告状态置为待审核状态2
  			  				this.currentNoticeState = '2'
  							}else{
  								alert(res.data.message)
  							}
  		  		}).catch(e => {
  						alert(e.data.message)
  		  		})
		  	}
		  },
		  //router参数改变后,此时为草稿页面点击修改进来，根据草稿页面传进来的id查询此公告内容进行修改
		  reviseNotice(){
		  	if(this.$route.query.noticeId){
		  		//将数据初始化
		  		this.initNewNoticeData()
		  		//根据当前id查询公告内容赋给修改页面
		  		this.$http({
		  			url:this.$url+'/notice/edit?notice_id='+this.$route.query.noticeId
		  			}).then(res => {
		  				console.log(res)
		  				if(res.data.success == true){
		  					//给页面赋值
		  					this.fillData(res.data.data)
		  				}else{
		  					console.log(res.data.message)
		  				}
		  		}).catch(e => {
						console.log(e)
		  		})
		  	}
		  },
		  //修改前初始化数据
		  initNewNoticeData(){
		  	this.currentNoticeId = '';
		  	this.currentNoticeState = '';

		  	this.newNoticeData.notice_title = ''
		  	this.newNoticeData.notice_type = ''
		  	this.newNoticeData.notice_content = ''
		  	this.newNoticeData.notice_state = '1'
		  	this.newNoticeData.notice_tag = '0'
		  	this.newNoticeData.notice_attachments = '{}'
		  	this.newNoticeData.creator = 'xiaoming'
		  	this.newNoticeData.notice_publisher = '{}'
		  	this.newNoticeData.notice_scope = '{"key":"全司"}'
		  	this.newNoticeData.notice_validate_start = ''
		  	this.newNoticeData.notice_validate_end = ''

		  	this.isTop = false
		  	this.isLong = false
		  	this.files = []
		  	this.publishDate = ['集团总部-人力资源部']
		  	this.toWhichMan = [{"key":"全司"}]
		  },
		  //根据修改公告传来的id查询出来的数据赋值
		  fillData(data){
				
	  		this.currentNoticeId = data.notice_id
	  		this.currentNoticeState = data.notice_state

	  		this.newNoticeData.notice_title = data.notice_title
		  	this.newNoticeData.notice_type = data.notice_type
		  	this.newNoticeData.notice_content = data.notice_content
		  	this.newNoticeData.notice_state = data.notice_state
		  	this.newNoticeData.notice_tag = data.notice_tag
		  	this.newNoticeData.notice_attachments = data.notice_attachments
		  	this.newNoticeData.creator = data.creator
		  	this.newNoticeData.notice_publisher = data.notice_publisher
		  	this.newNoticeData.notice_scope = data.notice_scope
		  	this.newNoticeData.notice_validate_start = data.notice_validate_start
		  	this.newNoticeData.notice_validate_end = data.notice_validate_end

		  	this.isTop = data.notice_tag =='1' ? true: false
		  	this.isLong = data.notice_validate_start||data.notice_validate_end ? false :true

		  	if(JSON.parse(data.notice_attachments)){
		  		let attachments = JSON.parse(data.notice_attachments)
		  		for (var key in attachments){
		  			let file = new Object()
	          file.name = key
	          file.url = attachments[key]
	          this.files.push(file)
		  		}
		  	}else{
		  		this.files = []
		  	}
		  	this.publishDate = ['集团总部-人力资源部']
		  	this.toWhichMan = [{"key":"全司"}]
		  }
  	}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import "~common/stylus/variable"
	.edit
		.newNotice
			height:17px
			line-height:18px
			margin-bottom:18px
			font-size:$font-size-small
			color:#989898
		.noticeName
			height:24px
			margin-bottom:12px
			span
				display:inline-block
				width:80px
				height:16px
				line-height:17px
				text-align:right
				font-weight: 600
				font-size:$font-size-small
				color:#323c47
			input
				display:inline-block
				width:372px
				height:17px
				line-height:17px
				padding:3px 6px 2px
				border: solid 1px #edeff4
				border-radius: 2px
		.noticeType
			height:24px
			margin-bottom:12px
			overflow:hidden
			span
				display:inline-block
				float:left
				width:80px
				text-align:right
				height:24px
				line-height:24px
				font-weight: 600
				font-size:$font-size-small
				color:#323c47
			select
				display:inline-block
				float:left
				height:24px
				line-height:24px
				margin-left: 6px
				border: solid 1px #edeff4
				option
					color: #323c47
					font-size:$font-size-small
		.noticeTop
			height:18px
			margin-bottom:9px
			overflow:hidden
			span
				&:nth-of-type(1)
					display:inline-block
					float:left
					width:80px
					height:18px
					text-align:right
					line-height:18px
					font-weight: 600
					font-size:$font-size-small
					color:#323c47
				&:nth-of-type(2)
					margin-left:5px
					height:18px
					line-height:18px
					font-size:$font-size-small
					color:#323c47
			input
				display:inline-block
				float:left
				width:18px
				height:18px
				padding:2px
		.noticeContent
			height:400px
			overflow:hidden
			margin-bottom:12px		
			span
				&:nth-of-type(1)
					display:inline-block
					float:left
					width:80px
					height:15px
					text-align:right
					line-height:16px
					font-weight: 600
					font-size:$font-size-small
					color:#323c47
			.noticeEdit
				position:relative
				.quill-editor
					display:inline-block
					float:left
					width:500px
					height:300px
				.upload
					position: absolute
					width: 100px
					height: 30px
					line-height: 30px
					top: 56px
					left: 130px
					text-align: center
					color: #000
					background-color: #fff
					z-index: 1
					input
						position: absolute
						opacity: 0
						width: 100px
						left: 3px
		.uploadFiles
			overflow:hidden
			margin-bottom:12px
			ul
				li
					float:left
					height:20px
					line-height:20px
					margin-right:20px
					color:#1a8bfd
					text-decoration:underline
		.publishDepart,.toWhichMan
			height:24px
			margin-bottom:12px
			overflow:hidden
			span
				display:inline-block
				float:left
				width:80px
				text-align:right
				height:24px
				line-height:24px
				font-weight: 600
				font-size:$font-size-small
				color:#323c47
			select
				display:inline-block
				float:left
				height:24px
				line-height:24px
				margin-left: 6px
				border: solid 1px #edeff4
				option
					color: #323c47
					font-size:$font-size-small
		.noticeTime
			height:36px
			overflow:hidden
			margin-bottom:55px
			.isLoneTime
				float:left
				height:24px
				margin-top:10px
				overflow:hidden
				span
					&:nth-of-type(1)
						display:inline-block
						float:left
						width:80px
						height:18px
						text-align:right
						line-height:18px
						font-weight: 600
						font-size:$font-size-small
						color:#323c47
					&:nth-of-type(2)
						margin-left:5px
						height:18px
						line-height:18px
						font-size:$font-size-small
						color:#323c47
				input
					display:inline-block
					float:left
					width:18px
					height:18px
					padding:2px
			.timeBegin
				float:left
				margin-left:10px
				font-size:$font-size-small
			.timeEnd
				float:left
				margin-left:10px
				font-size:$font-size-small
		.saveAndPublish
			height:100px
			.saveNotice,.publiseNotice,.previewNotice
				float:left
				width: 100px
				text-align:center
				height: 36px
				line-height:36px
				margin-left:80px
				border-radius: 4px
				color:#fff
				font-size:$font-size-medium
				background-color: #1a8bfd
			.previewNotice
				color:#1a8bfd
				background-color:#fff
</style>