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
				// var converter = new showdown.Converter()
			    // this.content= converter.makeHtml(res.data.data.content)
			    this.title = data.title
			    this.des = {name: data.author.loginname, date: data.create_at, visit_count: data.visit_count, tab: {tab: data.tab}}
			    this.content = data.content
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
	.des {
		text-align: center;
		color: #888;
		font-size: 12px;
		margin-bottom: 20px;
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
	pre.prettyprint {
		font-size: 14px;
	    border-radius: 0;
	    padding: 0 15px;
	    border: none;
	    margin: 20px -10px;
	    border-width: 1px 0;
	    background: #f7f7f7;
	    -o-tab-size: 4;
	    -moz-tab-size: 4;
	    tab-size: 4;
	}
	code {
		white-space: pre-wrap;
	}
</style>