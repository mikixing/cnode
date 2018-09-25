<template>
	<div>
		<div class="top">
			<!-- <div class="wrap-top">
				<a href="javascript: void(0)" @click="changeStatus(0)" :class="{active: flag[0]}">全部</a>
				<a href="javascript: void(0)" @click="changeStatus(1)" :class="{active: flag[1]}">精华</a>
				<a href="javascript: void(0)" @click="changeStatus(2)" :class="{active: flag[2]}">分享</a>
				<a href="javascript: void(0)" @click="changeStatus(3)" :class="{active: flag[3]}">问答</a>
				<a href="javascript: void(0)" @click="changeStatus(4)" :class="{active: flag[4]}">招聘</a>
			</div> -->
			<div class="wrap-top">
				<el-tabs v-model="activeTab" type="border-card" @tab-click="changeStatus">
				    <el-tab-pane label="全部" name="first">全部</el-tab-pane>
				    <el-tab-pane label="精华" name="second">精华</el-tab-pane>
				    <el-tab-pane label="分享" name="third">分享</el-tab-pane>
				    <el-tab-pane label="问答" name="fourth">问答</el-tab-pane>
				    <el-tab-pane label="招聘" name="fifth">招聘</el-tab-pane>
				</el-tabs>
			</div>
		</div>
		<div class='content'>
			<!-- <div class='sidebar'>
				<div class="des">
					<div class="des-top">CNode: Node.js专业中文社区</div>
					<div class="des-mid">您可以<a href="">登录</a>或<a href="">注册</a>,也可以</div>
					<div class="des-bot">通过 GitHub 登录</div>
				</div>
			</div> -->
			<div class='main'>
				<div class="main-content">
					<div class="content-wrap" v-for="item in list">
						<!-- <a class="portrait" :title=item.author.loginname>
							<img :data-url=item.author.avatar_url  class="lazyload" alt="">
						</a> -->
						<a class="portrait" :title=item.author.loginname>
							<img :src=item.author.avatar_url  alt="">
						</a>
						<span class="content-time">{{item.create_at | formatTime}}</span>
						<span class="content-title">
							<span class="num-reply">{{item.reply_count}}</span><span class="num-symbol">/</span><span class="num-click">{{item.visit_count}}</span>
							<span class="tab" :class="{noactive: !item.good && !item.top}">{{item | tab}}</span>
							<router-link :to="{name: 'content', params: {id: item.id}}">{{item.title}}</router-link>
						</span>
					</div>
				</div>
				<el-pagination
				  	background
				  	layout="prev, pager, next"
				  	:total="1000"
				  	@current-change='changePage'>
				</el-pagination>
			</div>
		</div>
	</div>
</template>
<script>
	import {formatTime, tab} from '../filter'
	import utils from '../utils'
	export default {
		data () {
			return {
				list: {},
				total: 100,
				topic: '',
				activeTab: 'first'
			}
		},
		filters: {
			formatTime: formatTime,
			tab: tab
		},
		methods: {
			changeStatus (opt) {
				switch (+opt.index) {
					case 0:
						this.topic = ''
						this.api.getIndex().then(res => {
							this.list = res.data.data
						});
						break;
					case 1: 
						this.topic = 'good'
						this.api.getIndex({tab: this.topic}).then(res => {
							this.list = res.data.data
						});
						break;
					case 2:
						this.topic = 'share'
						this.api.getIndex({tab: this.topic}).then(res => {
							this.list = res.data.data
						});
						break;
					case 3:
						this.topic = 'ask'
						this.api.getIndex({tab: this.topic}).then(res => {
							this.list = res.data.data
						});
						break;
					case 4:
						this.topic = 'job'
						this.api.getIndex({tab: this.topic}).then(res => {
							this.list = res.data.data
						});
						break;
					default: 
						this.topic = '';
				}
			},
			changePage(n) {
				this.api.getIndex({page: n, tab: this.topic}).then(res => {
					this.list = res.data.data
				})
			}
		},
		created () {
			this.api.getIndex().then(res => {
				this.list = res.data.data
				// this.$nextTick( _ => {
				// 	utils.lazyLoad()	
				// })
			})
		}
	}
</script>

<style>
	.top {
		background: #f6f6f6;
		position: fixed;
		width: 100%;
		z-index: 10;
	}
	.wrap-top {
		width: 80%;
		margin: auto;
	}
	/*.wrap-top > a {
		padding: 20px;
		color: #333;
		font-size: 14px;
		text-decoration: none;
		border-radius: 3px;
	}*/
	.active {
		color: #80bd01 !important;
		/*background: #80bd01;*/
	}
	.content {
		width: 80%;
		margin: auto;
		padding-top: 100px;
	}
	.main {
		background: #fff;
		border-radius: 5px;
		padding-bottom: 10px;
	}
	.noactive {
		color: #999 !important;
		background: #e5e5e5 !important;
		border-radius: 3px;
		padding: 1px 4px;
		font-size: 12px;
	}
	.main-content {
		padding-bottom: 10px;
	}
	.content-wrap {
		border-bottom: 1px solid #f0f0f0;
		padding: 10px;
		height: 30px;
		line-height: 30px;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}
	.content-wrap:nth-last-child(1) {
		border-bottom: 0;
	}
	.portrait {
		width: 30px;
		height: 30px;
		position: relative;
	}
	.portrait > img {
		width: 30px;
		height: 30px;
		border-radius: 5px;
		position: absolute;
	}
	.content-title {
		/*float: left;*/
		margin-left: 35px;
	}
	.content-num {
		font-size: 14px;
	}
	.content-title > a {
		text-decoration: none;
		font-size: 16px;
		color: #333;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;

	}
	.num-reply {
		color: #9e78c0;
		font-size: 14px;
	}
	.num-symbol {
		color: #9e78c0;
		font-size: 12px;
	}
	.num-click {
		font-size: 12px;
	}
	.tab {
		width: 35px;
		font-size: 12px;
		color: #fff;
		background: #80bd01;
		padding: 1px 4px;
		border-radius: 3px;
	}
	.content-time {
		float: right;
		margin-right: 10px;
		margin-left: 10px;
		font-size: 14px;
		color: #778087;
	}
</style>