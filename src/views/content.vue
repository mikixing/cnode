<template>
	<div class="wrap">
		<div class="title">{{title}}</div>
		<div class="des">
			<span>发布于{{des.date | formatTime}}</span> <span>作者{{des.name}}</span> <span>浏览{{des.visit_count}}次</span> <span>来自{{des.tab | tab}}</span>
		</div>
		<div id="content" v-html="content"></div>
	</div>
</template>

<script>
	// import showdown from 'showdown'
	import {formatTime, tab} from '../filter'
	import hljs from 'highlight.js'
	import javascript from 'highlight.js/lib/languages/javascript'
	import 'highlight.js/styles/default.css';

	hljs.registerLanguage('javascript', javascript)
	export default {
		data () {
			return {
				content: {},
				title: '',
				des: {}
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
			var url = 'https://cnodejs.org/api/v1/topic/' + id + '?mdrender=true'
			this.$http(url).then( res => {
				var data = res.data.data
			    this.title = data.title
			    this.des = {name: data.author.loginname, date: data.create_at, visit_count: data.visit_count, tab: {tab: data.tab}}
			    this.content = data.content
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
		margin-left: 100px;
		margin-right: 300px;
		background: #fff;
		overflow: hidden;
	}
	.title {
		text-align: center;
		padding: 20px 0 10px 0;
	}
	#content {
		margin: auto;
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
</style>