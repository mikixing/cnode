import utils from './utils'

//主题首页
export function getIndex (opt = {}) {
	var page = opt.page || 1
	var limit = opt.limit || 20
	var tab = opt.tab || ''
	return utils.ajax.get('/topics', {page,limit,tab})
}

//获得文章内容
export function getContent (id) {
	var topic = '/topic/' + id
	return utils.ajax.get(topic, {mdrender: true})
}
