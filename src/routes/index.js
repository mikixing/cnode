import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

export default new VueRouter({
	routes: [ {
		path: '/',
		name: 'index',
		component: resolve => require(['../views/index.vue'], resolve)
	}, {
		path: '/content/:id',
		name: 'content',
		component: resolve => require(['../views/content.vue'], resolve)
	}]
})