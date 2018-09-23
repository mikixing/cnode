import Vue from 'vue'
import axios from 'axios'
import router from './routes'
import App from './app.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import './views/test/test.css'

Vue.use(ElementUI);

Vue.prototype.$http = axios

new Vue({
	el: '#app',
    render: h => h(App),
    router
})