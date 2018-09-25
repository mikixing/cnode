<template>
	<div>
		 <div v-show="show" class="backtop" @click="back"></div>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				show: false
			}
		},
		methods: {
			back () {
				var dx = document.documentElement.scrollTop
				move.ease([dx, 0], function (v) {
					document.documentElement.scrollTop = v
				})
			}
		},
		mounted () {
			window.onscroll = function test (ev) {
				if (document.documentElement.scrollTop > 100) {
					this.show = true
					console.log(this.show)
				}
			}
		}
	}
</script>

<style>
	.backtop {
		width: 40px;
	    height: 40px;
	    position: fixed;
	    bottom: 30px;
	    border-radius: 5px;
	    border: 1px solid #eee;
	    right: 10px;
	    box-shadow: 0 0 1px #999;
	}
	.backtop::after {
		position: absolute;
		left: 10px;
		top: 15px;
		content: '';
		width: 20px;
		height: 20px;
		border-left: 2px solid #a58888;
		border-top: 2px solid #a58888;
		transform: rotate(45deg);
	}
</style>