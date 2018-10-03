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
					</div>
					<div class="reply_content_text" v-html=item.content></div>
				</div>
			</div>
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
	import 'highlight.js/styles/default.css';

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

<style>
	.wrap {
		width: 80%;
		margin: auto;
		overflow: hidden;
	}
	.title {
		text-align: center;
		padding: 20px 0 10px 0;
		background: #fff;
	}
	#content {
		margin: auto;
		background: #fff;
	}
	.markdown-text {
		padding: 10px 20px;
	}
	blockquote {
		border-left: 5px solid #eee;
		padding: 0 20px;
		margin: 0;
	}
	.des {
		text-align: center;
		color: #888;
		font-size: 12px;
		background: #fff;
	}
	.des > span {
		font-size: 12px;
		position: relative;
		margin-right: 13px;
	}
	.des > span::before{
		position: absolute;
		top: 7px;
		left: -5px;
		margin-right: 10px;
		content: '';
		width: 3px;
		height: 3px;
		background: #888;
		border-radius: 100%;
	}
	img {
		width: 100%;
	}
	.reply_area {
		background: #fff;
		margin-top: 10px;
	}
	.reply_wrap {
		padding:15px 0 ;
		border-bottom: 1px solid #eee;
		padding: 10px;
	}
	.reply_count {
		background: #f6f6f6;
		padding: 10px;
	}
	.reply_wrap:nth-last-child(1){
		border-bottom: 0;
	}
	.reply_portrait {
		width: 30px;
		height: 30px;
		float: left;
	}
	.reply_portrait > img {
		width: 100%;
		height: 100%;
	}
	.reply_content {
		margin-left: 40px;
	}
	.reply_content_des {
		line-height: 20px;
		font-size: 12px;
		color: #08c;
	}
	.reply_content_title {
		color: #666;
	}
</style>