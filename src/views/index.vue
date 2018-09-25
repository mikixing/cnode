<template>
	<div>
		<div class='navbar'>
			<div class='navbar-left'>
				<!-- <a class='logo' href="">
					<img src="https://static2.cnodejs.org/public/images/cnodejs_light.svg" alt="">
				</a> -->
			</div>
			<div class='navbar-right'>
				<a href="">首页</a>
				<a href="">新手入门</a>
				<a href="">API</a>
				<a href="">关于</a>
				<a href="">注册</a>
				<a href="">登录</a>
			</div>
		</div>
		<div class='content'>
			<div class='sidebar'>
				<div class="des">
					<div class="des-top">CNode: Node.js专业中文社区</div>
					<div class="des-mid">您可以<a href="">登录</a>或<a href="">注册</a>,也可以</div>
					<div class="des-bot">通过 GitHub 登录</div>
				</div>
			</div>
			<div class='main'>
				<div class='main-top'>
					<a href="javascript: void(0)" @click="changeStatus(0)" :class="{active: flag[0]}">全部</a>
					<a href="javascript: void(0)" @click="changeStatus(1)" :class="{active: flag[1]}">精华</a>
					<a href="javascript: void(0)" @click="changeStatus(2)" :class="{active: flag[2]}">分享</a>
					<a href="javascript: void(0)" @click="changeStatus(3)" :class="{active: flag[3]}">问答</a>
					<a href="javascript: void(0)" @click="changeStatus(4)" :class="{active: flag[4]}">招聘</a>
					<a href="javascript: void(0)" @click="changeStatus(5)" :class="{active: flag[5]}">客户端测试</a>
				</div>
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
				flag: [true, false, false, false, false, false],
				list: {},
				total: 100,
				topic: ''
			}
		},
		filters: {
			formatTime: formatTime,
			tab: tab
		},
		methods: {
			manageStatus (status) {
				var arr = new Array(this.flag.length)
				arr.fill(false)
				arr[status] = true
				this.flag = arr
			},
			changeStatus (status) {
				switch (status) {
					case 0:
						this.manageStatus(0)
						this.topic = ''
						this.api.getIndex().then(res => {
							this.list = res.data.data
						});
						break;
					case 1: 
						this.manageStatus(1)
						this.topic = 'good'
						this.api.getIndex({tab: this.topic}).then(res => {
							this.list = res.data.data
						});
						break;
					case 2:
						this.manageStatus(2)
						this.topic = 'share'
						this.api.getIndex({tab: this.topic}).then(res => {
							this.list = res.data.data
						});
						break;
					case 3:
						this.manageStatus(3) 
						this.topic = 'ask'
						this.api.getIndex({tab: this.topic}).then(res => {
							this.list = res.data.data
						});
						break;
					case 4:
						this.manageStatus(4)
						this.topic = 'job'
						this.api.getIndex({tab: this.topic}).then(res => {
							this.list = res.data.data
						});
						break;
					default: 
						this.manageStatus(5);
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
	.navbar {
		background: #444;
		height: 50px;
		padding: 0 50px;
	}
	.logo {
		width: 120px;
		height: 34px;
	}
	.logo > img {
		width: 100%;
		height: 100%;
	}
	.navbar-left {
		margin-right: 50px;
	}
	.navbar-right {
		float: right;
	}
	.navbar-right > a {
		margin: 10px;
		color: #ccc;
		text-decoration: none;
		font-size: 13px;
		line-height: 50px;
	}
	.content {
		margin: 15px 50px;
	}
	.sidebar {
		float: right;
		width: 270px;
		height: 200px;
		padding: 0 10px;
	}
	.des {
		background: #fff;
		padding: 10px;
		font-size: 14px;
	}
	.des-mid {
		margin-top: 15px;
	}
	.des-mid > a {
		color: #666;
	}
	.des-bot {
		margin-top: 5px;
		background: #5bc0de;
		color: #fff;
		padding: 5px;
		width: 150px;
		border-radius: 5px;
	}
	.main {
		margin-right: 300px;
		background: #fff;
		border-radius: 5px;
		padding-bottom: 10px;
	}
	.main-top {
		padding: 10px;
		background: #f6f6f6;
	}
	.main-top > a {
		padding: 3px 5px;
		color: #80bd01;
		font-size: 14px;
		text-decoration: none;
		border-radius: 3px;
	}
	.active {
		color: #fff !important;
		background: #80bd01;
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