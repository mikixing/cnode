<template>
	<div class="wrap">
		<div class="title">{{title}}</div>
		<div class="des">
			<span>发布于{{des.date | formatTime}}</span><span>作者{{des.name}}</span><span>浏览{{des.visit_count}}次</span><span>来自{{des.tab | tab}}</span>
		</div>
		<div id="content"></div>
	</div>
</template>

<script>
	import showdown from 'showdown'
	import {formatTime, tab} from '../filter'
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
			debugger
			var id = this.$route.params.id
			var url = 'https://cnodejs.org/api/v1/topic/' + id + '?mdrender=true'
			this.$http(url).then( res => {
				var data = res.data.data
				var converter = new showdown.Converter()
			    // this.content= converter.makeHtml(res.data.data.content)
			    this.title = data.title
			    this.des = {name: data.author.loginname, date: data.create_at, visit_count: data.visit_count, tab: {tab: data.tab}}
			    console.log(this.des.tab)
			    debugger
			    document.getElementById('content').innerHTML = data.content
			})
		}
	}
</script>

<style>
	.wrap {
		margin-left: 100px;
		margin-right: 300px;
		background: #fff;
	}
	.title {
		text-align: center;
		padding: 20px 0;
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
</style>