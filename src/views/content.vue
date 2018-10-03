<template>
	<div class="wrap">
		<div class="title">{{title}}</div>
		<div class="des">
			<span>发布于{{des.date | formatTime}}</span> <span>作者{{des.name}}</span> <span>浏览{{des.visit_count}}次</span> <span>来自{{des.tab | tab}}</span>
		</div>
		<div id="content" v-html="content"></div>
		<div class="reply_area">
			<div class="reply_count">{{count}}个回复</div>
			<div class="reply_wrap" v-for="item in reply">
				<a class="reply_portrait">
					<img :src=item.author.avatar_url :title=item.author.loginname alt="">
				</a>
				<div class="reply_content">
					<div class="reply_content_des">
						<span class="reply_content_title">{{item.author.loginname}}</span> <span>·</span><span class="reply_content_time">{{item.create_at | formatTime}}</span>
						<!-- <span class="reply_content_icon iconfont icon-lajitong" ></span> -->
						<span class="reply_content_icon iconfont icon-huifu" @click="replyTopic(item.id)"></span>
						<span class="reply_content_icon iconfont icon-zan" ></span>
					</div>
					<div class="reply_content_text" v-html="item.content"></div>
				</div>
			</div>
			<div class="reply_btn">
				<el-button type="text" @click="replyTopic">回复此贴</el-button>
			</div>
			<!-- <el-button type="text" @click="replyTopic">回复此贴</el-button> -->
		</div>
		<div v-loading.fullscreen.lock="fullscreenLoading">
		</div>
	</div>
</template>

<script>
	// import showdown from 'showdown'
	import {formatTime, tab} from '../filter'
	import {getContent} from '../utils'
	import hljs from 'highlight.js'
	import javascript from 'highlight.js/lib/languages/javascript'
	import 'highlight.js/styles/default.css'
	import './style/content.less'

	hljs.registerLanguage('javascript', javascript)
	export default {
		data () {
			return {
				content: {},
				title: '',
				des: {},
				reply: [],
				count: 0,
				fullscreenLoading: true
			}
		},
		filters: {
			formatTime: formatTime,
			tab: tab
		},
		methods: {
			replyTopic (id) {
		        this.$prompt('请输入评论信息', '提示', {
		          	confirmButtonText: '确定',
		          	cancelButtonText: '取消'
		        }).then(({ value }) => {
		        	var opt = {
		        		content: value,
		        		topic_id: this.$route.params.id,
		        		id: id
		        	}
		        	for (var i in opt) {
		        		if (opt[i] === '' || opt[i] === undefined) delete opt[i]
		        	}
		          	this.api.createReply(...opt).then(res => {
		          		if (res.data.success === true) {
			          		this.$message({
				            	type: 'success',
				            	message: '评论成功'
				          	})
		          		} else {
		          			this.$message({
				            	type: 'warning',
				            	message: '接口错误'
				          	})
		          		}
		          	})
		        }).catch(() => {
		          	this.$message({
		            	type: 'info',
		            	message: '取消输入'
		          	})      
		        })
		    }
		},
		created () {
			var id = this.$route.params.id
			var url = 'https://cnodejs.org/api/v1/topic/' + id + '?mdrender=true'
			this.$http(url).then( res => {
				var data = res.data.data
			    this.title = data.title
			    this.des = {name: data.author.loginname, date: data.create_at, visit_count: data.visit_count, tab: {tab: data.tab}}
			    this.content = data.content
			})
		},
		mounted () {
			var id = this.$route.params.id
			this.api.getContent(id).then( res => {
				this.fullscreenLoading = false
				var data = res.data.data
			    this.title = data.title
			    this.des = {name: data.author.loginname, date: data.create_at, visit_count: data.visit_count, tab: {tab: data.tab}}
			    this.content = data.content
			    this.reply = data.replies
			    this.count = data.reply_count
			    this.$nextTick(function () {
				    var arr = [].slice.call(document.getElementsByTagName('code'))
				    for (var i = 0; i < arr.length; i++) {
						hljs.highlightBlock(arr[i])
				    }
			    })
			})
		}
	}
</script>